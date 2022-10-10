import e, { Express, Request, Response } from "express";
import { queryData } from "./services/influxDB/read_data";
import { writeDataToInflux } from "./services/influxDB/write_data";
import Mqtt from './services/mqtt/mqtt.services';
import { Accident } from './models/accident.models'
import { Car } from './models/car.models'

declare global {
    var speed: number; 
}
globalThis.speed = 0; 

export default function (app: Express) {
    app.get('/getLocation', async (req: Request, res: Response) => {
        const data = await queryData('1');
        // console.log(data);
        return res.status(200).json({
            data: data
        });
    })

    app.post('/postLocation', (req: Request, res: Response) => {
        return res.send(writeDataToInflux(req.body));
    })

    app.get('/mqtt', async (req: Request, res: Response) => {
        try {
            let msg = req.body.msg
            msg = msg.replace('\\', "")
            console.log(msg);
            
            Mqtt.publish("@msg/connect", msg)
            return res.status(200).json({
                success: true,
                data: msg
            })
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                success: false
            })
        }
    })

    app.get('/speedUp', async (req: Request, res: Response) => {
        try {
            let isSpeedUp: boolean = false; 
            if (speed <= 1000 && speed + 250 <= 1000) {
                let msg = `{"cmd": "forward", "speed": ${speed + 250}, "acc": 1000}`;
                Mqtt.publish('@msg/connect', msg);
                speed += 250; 
                console.log(`⚡️[mqtt]: Speed: ${speed}`);
                isSpeedUp = true; 
            }
            else {
                isSpeedUp = false;
            }
            return res.status(200).json({
                success: isSpeedUp,
                speed: speed
            })
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                success: false
            })
        }
    })

    app.get('/speedDown', async (req: Request, res: Response) => {
        try {
            let isSpeedDown: boolean = false; 
            if (speed >= 0 && speed - 250 >= 0) {
                let msg = `{"cmd": "backward", "speed": ${speed - 250}, "acc": 1000}`;
                Mqtt.publish('@msg/connect', msg);
                speed -= 250; 
                console.log(`⚡️[mqtt]: Speed: ${speed}`);
                isSpeedDown = true; 
            } else {
                isSpeedDown = false; 
            }
            return res.status(200).json({
                success: isSpeedDown, 
                speed: speed
            })
        }catch (err) {
            console.log(err);
            return res.status(400).json({
                success: false
            })
        }
    })

    app.get('/turnLeft', async (req: Request, res: Response) => {
        try {
            let msg = `{"cmd": "left", "speed": ${speed}, "acc": 1000}`;
            Mqtt.publish('@msg/connect', msg);
            console.log(`⚡️[mqtt]: Turn: left`);
            return res.status(200).json({
                success: true, 
                speed: speed, 
                turn: "left"
            })
        }catch (err) {
            console.log(err);
            return res.status(400).json({
                success: false
            })
        }
    })

    app.get('/turnRight', async (req: Request, res: Response) => {
        try {
            let msg = `{"cmd": "right", "speed": ${speed}, "acc": 1000}`;
            Mqtt.publish('@msg/connect', msg);
            console.log(`⚡️[mqtt]: Turn: right`);
            return res.status(200).json({
                success: true, 
                speed: speed
            })
        }catch (err) {
            console.log(err);
            return res.status(400).json({
                success: false
            })
        }
    })

    app.get('/Car/info/:id', async (req: Request, res: Response) => {
        try {
            const car_registration = req.params.id;
            const data = await Car.findOne({ 'car_registration': car_registration })
            return res.status(200).json({
                success: true, 
                data: data
            })
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                success: false,
                error: err
            })
        }
    })

    app.post('/Car', async (req: Request, res: Response) => {
        try {
            const car = req.body;
            const MAC_ID = car.MacId; 
            let deviceId: string; 
            if (MAC_ID === "ED:9A:B3:A0:20:74") {
                deviceId = "1e30fad7-ccc5-4523-85ad-1dfe966c3c29"
                const car_object = {
                    MacId: MAC_ID, 
                    DeviceId: deviceId,
                    Model: car.Model,
                }
                const data = await Car.create(car_object);
                console.log(`⚡️[database]: Save to database with DeviceId: ${deviceId}`);
                return res.status(200).json({
                    success: true, 
                    data: data
                })
            } else if (MAC_ID === "D6:93:EB:A8:C1:5D") {
                deviceId = "a6b15e5b-4cd3-4e22-b7cf-2ae8d2872cda"
                const car_object = {
                    MacId: MAC_ID, 
                    DeviceID: deviceId,
                    Model: car.Model,
                }
                const data = await Car.create(car_object); 
                console.log(`⚡️[database]: Save to database with DeviceId: ${deviceId}`);
                return res.status(200).json({
                    success: true, 
                    data: data
                })
            } else {
                const data = await Car.create(car);
                console.log(`⚡️[database]: Save to database with DeviceId: ${data.DeviceId}`);
                return res.status(200).json({
                    success: true, 
                    data: data
                })
            }
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                success: false, 
                err: err
            })
        }
    })

    app.delete('/Car/:id', async (req: Request, res: Response) => {
        try {
            const macId = req.params.id; 
            const car = await Car.findOne({ MacId: macId });

            if (!car) {
                return res.status(404).json({
                    success: false, 
                    msg: 'not found'
                })
            }
            await car?.remove(); 
            return res.status(200).json({
                success: true, 
                data: car
            })
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                success: false,
                err: err
            })
        }
    })

    app.post('/Car/status', async (req: Request, res: Response) => {
        try {
            let body = req.body.body;
            console.log(`Request: ${body}`);
            body = body.slice(11, -1);
            // console.log(`Request sub: ${body}`);
            body = cutBackSlash(body);
            // console.log(`Request sub 2: ${body}`);
            body = JSON.parse(body);
            console.log(body)
            // console.log(body_json);
            const deviceId = body.Device;
            const status = body.Status; 
            // console.log(status);
            const car = await Car.findOneAndUpdate({ DeviceId: deviceId }, { Status: status }, {
                new: true
            });
            if (!car) {
                // console.log("no car");
                let macId = "D6:93:EB:A8:C1:5D"; 
                if (deviceId === "1e30fad7-ccc5-4523-85ad-1dfe966c3c29") {
                    macId = "ED:9A:B3:A0:20:74"
                } else if (deviceId === "a6b15e5b-4cd3-4e22-b7cf-2ae8d2872cda") {
                    macId = "D6:93:EB:A8:C1:5D"
                }
                const car_obj = {
                    MacId: macId, 
                    DeviceId: deviceId,
                    Status: status
                }
                // console.log(car_obj);
                const data = await Car.create(car_obj)
                console.log(`⚡️[database]: Car ${data.MacId}'s status is set to ${data.Status}`);
                return res.status(200).json({
                    success: true, 
                    car: data
                })
            }
            console.log(`⚡️[database]: Car ${car.MacId}'s status is set to ${car.Status}`);
            return res.status(200).json({
                success: true, 
                // car: car
            })            
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                success: false
            })
        }
    })
}

function cutBackSlash(str: string) { 
    var index=str.indexOf("\\");
    while(index >= 0){
        str=str.replace("\\","");
        index=str.indexOf("\\");
    }
    return str;
}
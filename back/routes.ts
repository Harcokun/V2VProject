import { Express, Request, Response } from "express";
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
        res.status(200).json({
            data: data
        });
    })

    app.post('/postLocation', (req: Request, res: Response) => {
        res.send(writeDataToInflux(req.body));
    })

    app.get('/mqtt', async (req: Request, res: Response) => {
        try {
            let msg = req.body.msg
            msg = msg.replace('\\', "")
            console.log(msg);
            
            Mqtt.publish("@msg/connect", msg)
            res.status(200).json({
                success: true,
                data: msg
            })
        } catch (err) {
            console.log(err);
            res.status(400).json({
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
            res.status(200).json({
                success: isSpeedUp,
                speed: speed
            })
        } catch (err) {
            console.log(err);
            res.status(400).json({
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
            res.status(200).json({
                success: isSpeedDown, 
                speed: speed
            })
        }catch (err) {
            console.log(err);
            res.status(400).json({
                success: false
            })
        }
    })

    app.get('/turnLeft', async (req: Request, res: Response) => {
        try {
            let msg = `{"cmd": "left", "speed": ${speed}, "acc": 1000}`;
            Mqtt.publish('@msg/connect', msg);
            console.log(`⚡️[mqtt]: Turn: left`);
            res.status(200).json({
                success: true, 
                speed: speed, 
                turn: "left"
            })
        }catch (err) {
            console.log(err);
            res.status(400).json({
                success: false
            })
        }
    })

    app.get('/turnRight', async (req: Request, res: Response) => {
        try {
            let msg = `{"cmd": "right", "speed": ${speed}, "acc": 1000}`;
            Mqtt.publish('@msg/connect', msg);
            console.log(`⚡️[mqtt]: Turn: right`);
            res.status(200).json({
                success: true, 
                speed: speed
            })
        }catch (err) {
            console.log(err);
            res.status(400).json({
                success: false
            })
        }
    })

    app.get('/Car/info/:id', async (req: Request, res: Response) => {
        try {
            const car_registration = req.params.id;
            const data = await Car.findOne({ 'car_registration': car_registration })
            res.status(200).json({
                success: true, 
                data: data
            })
        } catch (err) {
            console.log(err);
            res.status(400).json({
                success: false,
                error: err
            })
        }
    })

    app.post('/Car', async (req: Request, res: Response) => {
        try {
            const car = req.body; 
            const data = await Car.create(car); 
            res.status(200).json({
                success: true, 
                data: data
            })
        } catch (err) {
            console.log(err);
            res.status(400).json({
                success: false, 
                err: err
            })
        }
    })

    app.delete('/Car/:id', async (req: Request, res: Response) => {
        try {
            const car_registration = req.params.id; 
            const car = await Car.findOne({ car_registration: car_registration });

            if (!car) {
                res.status(404).json({
                    success: false, 
                    msg: 'not found'
                })
            }
            await car?.remove(); 
            res.status(200).json({
                success: true, 
                data: car
            })
        } catch (err) {
            console.log(err);
            res.status(400).json({
                success: false,
                err: err
            })
        }
    })
}
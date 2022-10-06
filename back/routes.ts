import { Express, Request, Response } from "express";
import { queryData } from "./services/influxDB/read_data";
import { writeDataToInflux } from "./services/influxDB/write_data";
import { getCarInfo } from "./services/mariaDB/car.services";
import Mqtt  from './services/mqtt/mqtt.services';

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

    // app.get('/carInfo', async (req: Request, res: Response) => {
    //     const car_registration = req.body.car_registration; 
    //     res.status(200).json({
    //         data: getCarInfo(car_registration)
    //     });
    // })

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

    app.get('/speedUp', (res: Response) => {
        try {
            if (speed <= 1000 && speed + 250 <= 1000) {
                let msg = `{"cmd": "forward", "speed": ${speed + 250}, "acc": 1000}`;
                Mqtt.publish('@msg/connect', msg);
                res.status(200).json({
                    success: true, 
                    speed: speed
                })
            }
        } catch (err) {
            console.log(err);
            res.status(400).json({
                success: false
            })
        }
    })

    app.get('/speedDown', (res: Response) => {
        try {
            if (speed >= 0 && speed - 250 >= 0) {
                let msg = `{"cmd": "backward", "speed": ${speed - 250}, "acc": 1000}`;
                Mqtt.publish('@msg/connect', msg);
                res.status(200).json({
                    success: true, 
                    speed: speed
                })
            }
        }catch (err) {
            console.log(err);
            res.status(400).json({
                success: false
            })
        }
    })

    app.get('/turnLeft', (res: Response) => {
        try {
            let msg = `{"cmd": "left", "speed": ${speed}, "acc": 1000}`;
            Mqtt.publish('@msg/connect', msg);
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

    app.get('/turnRight', (res: Response) => {
        try {
            let msg = `{"cmd": "right", "speed": ${speed}, "acc": 1000}`;
            Mqtt.publish('@msg/connect', msg);
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
}
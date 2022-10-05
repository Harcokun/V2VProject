import { Express, Request, Response } from "express";
import { queryData } from "./services/influxDB/read_data";
import { writeDataToInflux } from "./services/influxDB/write_data";

export default function (app: Express) {
    app.get('/getLocation', async (req: Request, res: Response) => {
        const data = await queryData('1');
        // console.log(data);
        res.status(200).json({
            data: data
        });
    })

    app.post('/postLocation', (req: Request, res: Response) => {
        const data: string = '{"Device": "1", "Piece": "1", "Location": "1", "Clockwise": "true", "Velocity": "0.0"}';
        res.send(writeDataToInflux(data));
    })
}
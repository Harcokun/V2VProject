import { Express, Request, Response } from "express";
import { queryData } from "./services/read_data";
import { writeDataToInflux } from "./services/write_data";
import { deleteData } from "./services/delete_data";

export default function (app: Express) {
    app.get('/getLocation', (req: Request, res: Response) => {
        res.send(queryData());
    })

    app.post('/postLocation', (req: Request, res: Response) => {
        const data: string = '{"Device": "1", "Piece": "1", "Location": "1", "clockwise": "true"}';
        res.send(writeDataToInflux(data));
    })

    app.delete('/deleteLocation', (req: Request, res: Response) => {
        res.send(deleteData().then(() => console.log('Delete SUCCESS')).catch((error) => {
            console.error(error)
            console.log('Delete ERROR')
        }))
    })
}
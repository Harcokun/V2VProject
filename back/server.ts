import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import post from './services/post'

dotenv.config({
    path: "./config/config.env"
});

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/post', (req: Request, res: Response) => {
  
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  console.log(`${process.env.INFLUX_URL} ${process.env.INFLUX_ORG}`);
});
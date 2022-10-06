import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import bodyParser from 'body-parser';

dotenv.config({
    path: "./config/config.env"
});

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  routes(app);
});

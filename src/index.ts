import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { logger } from './utils';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  logger.info('⚡️ [server]: Environment is set to %s', process.env.NODE_ENV);
  logger.info(`⚡️ [server]: Server is running at https://localhost:${port}`);
});

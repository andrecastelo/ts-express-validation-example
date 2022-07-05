import express, { Express, Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import { logger } from './utils';
import { routes } from './routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();
const port = process.env.PORT;

const app: Express = express();
const router: Router = express.Router();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

routes(app, router);
app.use('/', router);

app.use(express.json());
app.use(errorHandler);

app.listen(port, () => {
  logger.info('⚡️ [server]: Environment is set to %s', process.env.NODE_ENV);
  logger.info(`⚡️ [server]: Server is running at https://localhost:${port}`);
});

import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import sequelize from './db/db';
import UserRoutes from './routes/userRoutes';
import cors from 'cors';
import bodyParser from 'body-parser';
import { SyncDBModels } from './helpers/db';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.use(bodyParser.json());
app.use('/users', UserRoutes);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    SyncDBModels();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  console.log(`[server]: Server is running at http://localhost:${port}`);
});

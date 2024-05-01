import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import sequelize from './db/db';
import UserRoutes from './routes/userRoutes';
import AuthRoutes from './routes/authRoutes';
import NotesRoutes from './routes/notesRoute';
import TestRoutes from './routes/testRoute';
import cors from 'cors';
import bodyParser from 'body-parser';
import { SyncDBModels } from './helpers/db';
import Note from './models/Note';
import User from './models/User';
import { errorHandler } from './middleware/errorHandling';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/test', TestRoutes);
app.use('/users', UserRoutes);
app.use('/notes', NotesRoutes);
app.use('/auth', AuthRoutes);
app.use(errorHandler);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    SyncDBModels();

    // TODO: find a better place for relation
    Note.belongsTo(User, { foreignKey: 'userId' });
    User.hasMany(Note);

    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  console.log(`[server]: Server is running at http://localhost:${port}`);
});

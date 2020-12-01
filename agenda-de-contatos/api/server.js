import express from 'express';
import cors from 'cors';
import scheduleRouter from './routes/schedule.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/schedule', scheduleRouter);

export default app;

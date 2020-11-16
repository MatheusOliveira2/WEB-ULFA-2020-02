import express from 'express';
import scheduleRouter from './routes/schedule.js';

const app = express();
app.use(express.json());
app.use('/schedule', scheduleRouter);

app.listen(3000, () => console.log('Started!'));

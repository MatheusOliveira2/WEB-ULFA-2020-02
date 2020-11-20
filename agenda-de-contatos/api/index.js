import express from 'express';
<<<<<<< HEAD
import cors from 'cors';
=======
>>>>>>> 1e487a1d84daf8ada1a52b6322746007ca6ac01e
import scheduleRouter from './routes/schedule.js';

const app = express();
app.use(express.json());
<<<<<<< HEAD
app.use(cors());
=======
>>>>>>> 1e487a1d84daf8ada1a52b6322746007ca6ac01e
app.use('/schedule', scheduleRouter);

app.listen(3000, () => console.log('Started!'));

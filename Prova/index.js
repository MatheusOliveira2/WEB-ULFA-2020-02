import express from 'express';
import cors from 'cors';
import studentsRouter from './routes/studentsRouter';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/students', studentsRouter);

app.listen(3333, () => console.log('Started!'));

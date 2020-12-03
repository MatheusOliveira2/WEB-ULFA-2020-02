import express from 'express';
import { insert, getAll } from '../database/index.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, age, school } = req.body;
    const student = await insert({ name, age, school });

    if (student) res.status(200).send({ id: student.id, name, age, school });
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro ao inserir no banco!');
  }
});

router.get('/', async (req, res) => {
  try {
    const students = await getAll();
    if (students) res.status(200).send(students);
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro ao listar alunos do banco!');
  }
});

export default router;

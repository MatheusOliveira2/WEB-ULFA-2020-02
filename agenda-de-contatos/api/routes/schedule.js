import express from 'express';
import scheduleService from '../services/scheduleService.js';
import db from '../db/db.js';

const router = express.Router();

router.post('/', (req, res) => {
  const onSuccess = (result) => {
    res.status(200).send(result);
  };

  scheduleService.create(req, onSuccess);
});

router.get('/', (_req, res) => {
  const onSuccess = (rows) => {
    res.status(200).send(rows);
  };
  scheduleService.get(onSuccess);
});

router.delete('/:id', (req, res) => {
  const onSuccess = (result) => {
    res.status(200).send(result);
  };
  scheduleService.delete(req.params.id, onSuccess);
});

router.get('/:name', (req, res) => {
  const onSuccess = (result) => {
    res.status(200).send(result);
  };
  scheduleService.geyByName(req, onSuccess);
});

router.put('/:id', (req, res) => {
  const onSuccess = (result) => {
    res.status(200).send(result);
  };
  scheduleService.update(req, onSuccess);
});

export default router;

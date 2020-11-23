import express from 'express';
import db from '../db/db.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { name, number, uf, localidade, bairro, logradouro } = req.body;
  db.run(
    `INSERT INTO schedule_info(name,number, uf, city, street, neighborhood) VALUES(?, ?, ?, ?, ?, ?)`,
    [name, number, uf, localidade, logradouro, bairro],
    function (err) {
      if (err) {
        return console.log(err.message);
      } else {
        const user = {
          id: this.lastID,
          name,
          number,
          uf,
          city: localidade,
          street: logradouro,
          neighborhood: bairro,
        };
        res.send(user);
      }
    }
  );
});

router.get('/', (_req, res) => {
  db.all(`SELECT * FROM schedule_info`, [], (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    res.status(200).send(rows);
  });
});

router.delete('/:id', (req, res) => {
  db.run(
    `DELETE FROM schedule_info WHERE id==?`,
    [req.params.id],
    function (err) {
      if (err) {
        console.error(err.message);
      } else {
        if (this.changes === 0) res.status(400).send('Não encontrado');
        else res.status(200).send('Removido');
      }
    }
  );
});

router.get('/:name', (req, res) => {
  db.all(
    'SELECT * FROM schedule_info WHERE name=?',
    req.params.name,
    function (err, row) {
      if (err) {
        console.error(err.message);
      } else {
        res.send(row);
      }
    }
  );
});

router.put('/:id', (req, res) => {
  db.run(
    `UPDATE schedule_info SET number=? WHERE id=?`,
    [req.body.number, req.params.id],
    function (err) {
      if (err) {
        console.error(err.message);
      } else {
        if (this.changes == 0) res.send('Não encontrado');
        else {
          res.send('Usuário alterado');
        }
      }
    }
  );
});

export default router;

import db from '../db/db.js';

const scheduleService = {
  get: (callback) => {
    db.all(`SELECT * FROM schedule_info`, [], (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      callback(rows);
    });
  },

  delete: (id, callback) => {
    db.run(`DELETE FROM schedule_info WHERE id==?`, [id], function (err) {
      if (err) {
        console.error(err.message);
      } else {
        if (this.changes === 0) callback('Não encontrado');
        else callback('Removido');
      }
    });
  },

  create: (req, callback) => {
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
          callback(user);
        }
      }
    );
  },

  update: (req, callback) => {
    db.run(
      `UPDATE schedule_info SET number=? WHERE id=?`,
      [req.body.number, req.params.id],
      function (err) {
        if (err) {
          console.error(err.message);
        } else {
          if (this.changes == 0) callback('Não encontrado');
          else {
            callback('Usuário alterado');
          }
        }
      }
    );
  },

  geyByName: (req, callback) => {
    db.all(
      'SELECT * FROM schedule_info WHERE name=?',
      req.params.name,
      function (err, row) {
        if (err) {
          console.error(err.message);
        } else {
          callback(row);
        }
      }
    );
  },
};

export default scheduleService;

import sqlite from 'sqlite3';
sqlite.verbose();
const db = new sqlite.Database('schedule.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected!');
});

db.run(
  `CREATE TABLE if not exists schedule_info (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, number TEXT NOT NULL, uf TEXT NOT NULL,
      city TEXT NOT NULL,  street TEXT NOT NULL,  neighborhood TEXT NOT NULL )`
);
//db.run('DROP TABLE if exists schedule_info');

export default db;

// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/students.sqlite3',
    },
    useNullAssDefault: true,
    migrations: {
      directory: './database/migrations',
    },
  },
};

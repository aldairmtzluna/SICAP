const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'sicap',
    },
    migrations: {
        directory: path.join(__dirname, '../database/migrations'),
        tableName: 'knex_migrations',
    },
    seeds: {
      directory: './src/database/seeds',
    },
  },
  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: './src/database/migrations',
      tableName: 'knex_migrations',
    },
  },
};
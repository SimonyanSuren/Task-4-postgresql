const { Client, Pool } = require('pg');

const credentials = {
  user: 'postgres',
  host: 'localhost',
  database: 'user_db',
  password: '1q2w3e4r5t6y',
  port: 5432,
};

module.exports = new Client(credentials);

// Connection to the database

const { Pool } = require('pg');
require('dotenv').config();
const config = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
};

const pool = new Pool(config);

function getConnection() {
  return pool.connect();
}

module.exports = { getConnection };

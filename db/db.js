const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DATABASE,
  host: process.env.POSTGRESQL_HOST,
  port: process.env.POSTGRESQL_PORT
});

pool.connect();
module.exports = pool;

require('dotenv').config({ path: '../.env' })

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: process.env.POSTGRESQL_HOST,
      user: process.env.POSTGRESQL_USER,
      password: process.env.POSTGRESQL_PASSWORD,
      database: process.env.POSTGRESQL_DATABASE,
      charset: 'uft8'
    },
    migrations: {
      directory: './knex/migrations'
    },
    seeds: {
      directory: './knex/seeds'
    }
  }
};

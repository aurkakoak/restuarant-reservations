// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    seed:{
      directory: './seeds/dev'
    }
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },



  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  }

};

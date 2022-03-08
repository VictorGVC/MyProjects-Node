//const { db } = require('./.env')

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

// Informations to do the connection with database

const db = {
	host : process.env.HOST_SECRET,
	port: 5432,
	database: process.env.DATABASE_SECRET,
	user: process.env.USER_SECRET,
	password: process.env.PASSWORD_SECRET,
	ssl: { rejectUnauthorized: false }
}  

module.exports = {
		
	client: 'postgresql',
	connection: db,
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	}
};

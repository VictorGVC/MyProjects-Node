const { db } = require('./.env')

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

// Informations to do the connection with database
console.log(db)
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

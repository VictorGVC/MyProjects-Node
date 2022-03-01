const { db } = require('./db.env')

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

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

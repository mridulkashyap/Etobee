var connectionString = process.env.OPENSHIFT_POSTGRESQL_DB_URL || 'postgres://postgres:postgre@localhost:5432/etobee';  //postgres://YOURUSER:YOURPASSWORD@localhost/dev
var dbName = "etobee";
//var connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgre@localhost:5432/todo';  //postgres://YOURUSER:YOURPASSWORD@localhost/dev

var pg = require('pg');

// pg.connect(connectionString, function(err, client, done) { // connect to postgres db
    // if (err)
        // console.log('Error while connecting: ' + err); 
    // client.query('CREATE DATABASE ' + dbName, function(err) { // create user's db
        // if (err) {
			//do nothing, ignore if the db is there
		// }
        // client.end(); // close the connection
    // });
// });
	
// create a new connection to the new db to start creating tables
pg.connect(connectionString, function(err, client, done) {
	// create the table
	var query = client.query(
						'CREATE TABLE IF NOT EXISTS items( ' +
							'id SERIAL PRIMARY KEY, ' +
							'text VARCHAR(40) not null, ' +
							'complete BOOLEAN' +
							')'
						);
	query.on('end', function() { 
		done();
		client.end(); 
	});
});

module.exports = connectionString;
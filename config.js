var pg = require('pg');
var dbName = "etobee";
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var pgConfig = process.env.OPENSHIFT_POSTGRESQL_DB_URL || 'postgres://postgres:postgre@localhost:5432';
var tableName = process.env.OPENSHIFT_APP_NAME || 'etobee';
var connectionString = "";
//check if postgre cartridge is set up
if(process.env.OPENSHIFT_POSTGRESQL_DB_URL){
	connectionString = pgConfig + "/" + dbName;
}
else{
	connectionString = pgConfig + "/postgres";
}

pg.connect(connectionString, function(err, client, done) { // connect to postgres db
		if (err)
			console.log('Error while connecting: ' + err); 
		client.query('CREATE DATABASE ' + dbName, function(err) { // create user's db
			if (err) {
				console.log("couldn't create database:" + err);
			}
			connectionString = connectionString = pgConfig + "/" + dbName;
			client.end(); // close the connection
		});
	});
	
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

module.exports = {
	port:port,
	ip:ip,
	connectionString:connectionString
}
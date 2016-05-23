var pg = require('pg');
var dbName = "etobee";
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000;
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var pgConfig = process.env.OPENSHIFT_POSTGRESQL_DB_URL || process.env.POSTGRES_URL;
var tableName = process.env.OPENSHIFT_APP_NAME || 'etobee';
var connectionString = pgConfig + "/" + dbName;

console.log(connectionString);
//check if postgre cartridge is set up
// if(process.env.OPENSHIFT_POSTGRESQL_DB_URL){
	//postgre cartridge is set up. 
	// connectionString = pgConfig + "/" + dbName;
// }
//hmm..maybe we're working on local?
// else if(process.env.POSTGRES_URL){
	// connectionString = pgConfig + "/postgres";
// }

function createTablesCB(){
	//console.log("creating tables now");
	// create a new connection to the new db to start creating tables
	pg.connect(connectionString, function(err, client, done) {
		if(err){
			//error occured in connecting to the actual db. terminate program
			console.log("error connecting db to create tables:" + err);
			client.end();
			return;
		}
		// create the table
		var query = client.query(
							'CREATE TABLE IF NOT EXISTS expenses( ' +
								'id SERIAL PRIMARY KEY, ' +
								'amount money not null, ' +
								'name VARCHAR(40) not null, ' +
								'date_expense date not null' +
								')'
							);
		query.on('end', function(err) { 
			if(err)
				console.log("err while creating tables: " + err);
			done();
			console.log("tables created");
			client.end(); 
		});
	});
}
function noDBCallback(err) {
	// will try to connect with postgre db
	pg.connect(pgConfig + "postgres", function(err, clientp, done) { // create database using postgres database in the connString				
		if(err){
			//error occured in connection. nothing can be done.
			console.log("Couldn't connect to postgres db either"); //terminate program.
			//clientp.end();
			return;
		}
		// no error in connection, create database.
		clientp.query('CREATE DATABASE ' + dbName, function(err) { // create actual db using postgres
			if(err){
				console.log("couldn't create db even with postgres in ConnectionString.", err);
				// nothing can be done. terminate program
				clientp.end();
				return;
			}
			// database created with no error, proceed to create tables.
			console.log("db created");
			createTablesCB();
		});
	});
}
function createDB(){
	pg.connect(connectionString, noDBCallback, createTablesCB, function(err, client, done) {	// connect to postgres db
		//try to connect with generic connString
		if(err){
			// failed, switch to connString with postgres db
			client.end();
			return noDBCallback(err);;
		}
		client.end(); // close the connection
		createTablesCB();
	});
}
createDB();

module.exports = {
	port:port,
	ip:ip,
	connectionString:connectionString
}
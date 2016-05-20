var express = require('express');
var pg = require('pg');
var path = require('path');

var connectionString = require(path.join(__dirname, '../', '../', 'config'));

var client = new pg.Client(connectionString);
client.connect();


module.exports = {
	createTodoTable : function(){
		var query = client.query(
							'CREATE TABLE IF NOT EXISTS items( ' +
								'id SERIAL PRIMARY KEY, ' +
								'text VARCHAR(40) not null, ' +
								'complete BOOLEAN' +
								')'
							);
		query.on('end', function() { client.end(); });
	}
}

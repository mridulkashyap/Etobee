var express = require('express');
var pg = require('pg');
var path = require('path');

var connectionString = require(path.join(__dirname, '../', '../', 'config'));

module.exports = {
	getAllItems : function(callback){
		var rows = [];
		var results = {
				err : null,
				data : null
			};
		// Get a Postgres client from the connection pool
		pg.connect(connectionString, function(err, client, done) {
			// Handle connection errors
			if(err) {
			  done();
			  console.log(err);
			  results.err = err;//res.status(500).json({ success: false, data: err});
			  callback(results);
			}
			// SQL Query > Select Data
			var query = client.query("SELECT * FROM items ORDER BY id ASC;");

			// Stream results back one row at a time
			query.on('row', function(row) {
				rows.push(row);
			});
			// After all data is returned, close connection and return results
			query.on('end', function() {
				done();
				results.data = rows;//res.json(results);
				//console.log("data =" + results.data);
				callback(results);
			});
		});
	},
	
	postNewItem : function(input, callback){
		var rows = [];
		var results = {
				err : null,
				data : null
			};

		// Get a Postgres client from the connection pool
		pg.connect(connectionString, function(err, client, done) {
			// Handle connection errors
			if(err) {
			  done();
			  console.log(err);
			  results.err = err;//res.status(500).json({ success: false, data: err});
			  callback(results);
			}

			// SQL Query > Insert Data
			client.query("INSERT INTO items(text, complete) values($1, $2)", [input.text, input.complete]);

			// SQL Query > Select Data
			var query = client.query("SELECT * FROM items ORDER BY id ASC");

			// Stream results back one row at a time
			query.on('row', function(row) {
				rows.push(row);
			});

			// After all data is returned, close connection and return results
			query.on('end', function() {
				done();
				results.data = rows;
				callback(results);
			});
		});
	},
	
	updateItem : function(input, callback){
		var rows = [];
		var results = {
				err : null,
				data : null
			};

		// Get a Postgres client from the connection pool
		pg.connect(connectionString, function(err, client, done) {
			// Handle connection errors
			if(err) {
			  done();
			  console.log(err);
			  results.err = err;//res.status(500).json({ success: false, data: err});
			  callback(results);
			}

			// SQL Query > Update Data
			client.query("UPDATE items SET text=($1), complete=($2) WHERE id=($3)", [input.text, input.complete, input.ID]);

			// SQL Query > Select Data
			var query = client.query("SELECT * FROM items ORDER BY id ASC");

			// Stream results back one row at a time
			query.on('row', function(row) {
				rows.push(row);
			});

			// After all data is returned, close connection and return results
			query.on('end', function() {
				done();
				results.data = rows;//res.json(results);
				//console.log("data =" + results.data);
				callback(results);
			});
		});
	},
	
	deleteItem : function(ID, callback){
		var rows = [];
		var results = {
				err : null,
				data : null
			};

		// Get a Postgres client from the connection pool
		pg.connect(connectionString, function(err, client, done) {
			// Handle connection errors
			if(err) {
			  done();
			  console.log(err);
			  results.err = err;//res.status(500).json({ success: false, data: err});
			  callback(results);
			}

			// SQL Query > Delete Data
			client.query("DELETE FROM items WHERE id=($1)", [ID]);

			// SQL Query > Select Data
			var query = client.query("SELECT * FROM items ORDER BY id ASC");

			// Stream results back one row at a time
			query.on('row', function(row) {
				rows.push(row);
			});

			// After all data is returned, close connection and return results
			query.on('end', function() {
				done();
				results.data = rows;//res.json(results);
				//console.log("data =" + results.data);
				callback(results);
			});
		});
	}
}

var express = require('express');
var pg = require('pg');
var path = require('path');
var dateFormat = require('dateformat');
var config = require(path.join(__dirname, '../', '../', 'config'));

var connectionString = config.connectionString;

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
			var query = client.query("SELECT * FROM expenses ORDER BY id ASC;");

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
			//expDate = dateFormat(input.date_expense, "");

			// SQL Query > Insert Data
			client.query("INSERT INTO expenses(amount, name, date_expense) values($1, $2, (to_date($3, 'DD-MM-YYYY')))", [input.amount, input.name, input.date_expense]);

			// SQL Query > Select Data)
			var query = client.query("SELECT * FROM expenses ORDER BY id ASC");

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
			client.query("UPDATE expenses SET amount=($1), name=($2), date_expense=($3) WHERE id=($4)", [input.amount, input.name, input.date_expense, input.id]);

			// SQL Query > Select Data
			var query = client.query("SELECT * FROM expenses ORDER BY id ASC");

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
			client.query("DELETE FROM expenses WHERE id=($1)", [ID]);

			// SQL Query > Select Data
			var query = client.query("SELECT * FROM expenses ORDER BY id ASC");

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

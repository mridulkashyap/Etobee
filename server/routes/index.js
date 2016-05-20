var express = require('express');
var pg = require('pg');
var path = require('path');
var router = express.Router();
var todoModel = require('../models/todoModel');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../', '../', 'client', 'views', 'index.html'));
});

router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

router.get('/api/v1/todos', function(req, res) {
	
	todoModel.getAllItems(function(data){
		if(data.err != null){
			return res.status(500).json({ success: false, data: data.err});
		}else{
			return res.json(data.data);
		}
	});
});

router.post('/api/v1/todos', function(req, res) {
	var input = {text: req.body.text, complete: false};
	todoModel.postNewItem(input, function(data){
		if(data.err != null){
			return res.status(500).json({ success: false, data: data.err});
		}else{
			return res.json(data.data);
		}
	});
});

router.put('/api/v1/todos/:todo_id', function(req, res) {
	// Grab data from the URL parameters
	var id = req.params.todo_id;
	
	// Grab data from http request
	var input = {ID: id, text: req.body.text, complete: req.body.complete};
    todoModel.updateItem(input, function(data){
		if(data.err != null){
			return res.status(500).json({ success: false, data: data.err});
		}else{
			return res.json(data.data);
		}
	});
});

router.delete('/api/v1/todos/:todo_id', function(req, res) {
	// Grab data from the URL parameters
	var id = req.params.todo_id;
	
    todoModel.deleteItem(id, function(data){
		if(data.err != null){
			return res.status(500).json({ success: false, data: data.err});
		}else{
			return res.json(data.data);
		}
	});
    

});

module.exports = router;




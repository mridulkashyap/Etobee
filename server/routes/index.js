var express = require('express');
var pg = require('pg');
var path = require('path');
var router = express.Router();
var expenseModel = require('../models/expenseModel');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../', '../', 'client', 'views', 'index.html'));
});

router.get('/api/v1/expenses', function(req, res) {
	
	expenseModel.getAllItems(function(data){
		if(data.err != null){
			return res.status(500).json({ success: false, data: data.err});
		}else{
			return res.json(data.data);
		}
	});
});

router.post('/api/v1/expenses', function(req, res) {
	var input = {amount: req.body.amount, name: req.body.name, date_expense:req.body.date_expense};
	expenseModel.postNewItem(input, function(data){
		if(data.err != null){
			return res.status(500).json({ success: false, data: data.err});
		}else{
			return res.json(data.data);
		}
	});
});

router.put('/api/v1/expenses/:expense_id', function(req, res) {
	// Grab data from the URL parameters
	var id = req.params.expense_id;
	console.log('reached router');
	// Grab data from http request
	var input = {id:id, amount: req.body.amount, name: req.body.name, date_expense:req.body.date_expense};
    expenseModel.updateItem(input, function(data){
		if(data.err != null){
			return res.status(500).json({ success: false, data: data.err});
		}else{
			return res.json(data.data);
		}
	});
});

router.delete('/api/v1/expenses/:expense_id', function(req, res) {
	// Grab data from the URL parameters
	var id = req.params.expense_id;
	
    expenseModel.deleteItem(id, function(data){
		if(data.err != null){
			return res.status(500).json({ success: false, data: data.err});
		}else{
			return res.json(data.data);
		}
	});
    

});

module.exports = router;




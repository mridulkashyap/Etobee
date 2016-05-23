var express = require('express');
var expenseModel = require('../models/expenseModel');
var PDF = require('pdfkit');            //including the pdfkit module

var router = express.Router();
var fs = require('fs');
var filename = 'expenses';

function loadCompiledHtml(){}
	
function createPdf(){
    var content= loadCompiledHtml();
	
    doc.y = 320; // this set the document horizontal position
    doc.text(content,100,100);   
    doc.write(path.resolve(".")+'/PDF/'+filename+'.pdf'); // it create a file that write the document
    doc.end(); // document end by the end method
}
router.get('/', function(req, res, next) {
	createPdf();
	res.download(path.resolve(".")+'/PDF/'+filename+'.pdf'); // it download this file
});

module.exports = router;
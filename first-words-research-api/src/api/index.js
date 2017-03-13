
var express = require('express');
var app = express();

var categoryRepository = require('../storage/category-repository');
var addCategory = require('../domain/add-category')(categoryRepository);

app.post('/api/categories', function(req, res) {
	addCategory(req.body.category, function(error) {
		res.send(error);
	});
});
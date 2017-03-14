var express = require('express');
var router = express.Router();
var categoryRepository = require('../storage/category-repository');
var addCategory = require('../domain/add-category')(categoryRepository);
var getAllCategories = require('../domain/get-all-categories')(categoryRepository);

router.post('/', function(req, res) {
	addCategory(req.body, function(error) {
		res.send(error);
	});
});

router.get('/', function(req, res) {
	getAllCategories(function(error, categories) {
		if (error) {
			res.status(500).send('Something went wrong');
		}

		res.send(categories);
	})
});

module.exports = router;
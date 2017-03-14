var express = require('express');
var router = express.Router();
var categoryRepository = require('../storage/category-repository');
var addCategory = require('../domain/add-category')(categoryRepository);
var getAllCategories = require('../domain/get-all-categories')(categoryRepository);
var addWord = require('../domain/add-word')(categoryRepository);

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

router.post('/:language/:category/words', function(req, res) {
	addWord(req.params.language, req.params.category, req.body.word, function(error) {
		console.log(error);
		res.send(error);
	});
});

module.exports = router;
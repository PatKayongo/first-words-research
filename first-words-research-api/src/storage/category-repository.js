var MongoClient = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017/first-words-research';

function insertCategory(category, db, callback) {
	var collection = db.collection('categories');
	collection.insert(category, callback);
}

function findCategory(query, db, callback) {
	var collection = db.collection('categories');
	collection.findOne(query, callback);
}

function findAllCategories(db, callback) {
	var collection = db.collection('categories');
	collection.find().toArray(callback);
}

module.exports = {
	insertCategory: function(category, callback) {
		MongoClient.connect(url, function(error, db) {
			insertCategory(category, db, callback);
		});
	},

	findCategory: function(lanugage, name, callback) {
		MongoClient.connect(url, function(error, db) {
			findCategory({ language: lanugage, name: name }, db, callback);
		});
	},

	findAllCategories: function(callback) {
		MongoClient.connect(url, function(error, db) {
			findAllCategories(db, callback);
		});
	}
};
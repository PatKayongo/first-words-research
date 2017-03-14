var _ = require('lodash');

module.exports = function(categoryRepository) {
	return function(callback) {
		categoryRepository.findAllCategories(function(error, categories) {
			if (error) {
				return callback(error);
			}

			categories = _.map(categories, function(item) {
				delete item._id;
				item.words = item.words || [];
				return item;
			});

			return callback(null, categories);
		});
	}
}
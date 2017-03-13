var boom = require('boom');

module.exports = function(categoryRepository) {
	return function(category, callback) {
		categoryRepository.findCategory(category.language, category.name, function(error, foundCategory) {
			if (foundCategory) {
				return callback(boom.badRequest('Category already exists'));
			}

			categoryRepository.insertCategory(category, callback);
		});
		
	}
}

module.exports = function(categoryRepository) {
	return function(language, categoryName, word, callback) {
		categoryRepository.findCategory(language, categoryName, function(error, category) {
			if (error) {
				return callback(error);
			}

			category.words = category.words || [];
			category.words.push(word);

			return categoryRepository.updateCategory(category, callback);
		});
	}
}
var getAllCategoriesFactory = require('../../src/domain/get-all-categories');
var categoryRepository = require('../../src/storage/category-repository');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

describe('Get All Categories', function() {
	var findCategoriesStub = sinon.stub(categoryRepository, 'findAllCategories');
	findCategoriesStub.yields();
	var getAllCategories;

	beforeEach(function() {
		getAllCategories = getAllCategoriesFactory(categoryRepository);
	});

	it('should return all categories returned by the repository', function(done) {
		var categories = [{ language: 'isiXhosa', name: 'Places' }, { language: 'Setswana', name: 'animals' }];
		findCategoriesStub.yields(null, categories);

		getAllCategories(function(error, returnedCategories) {
			expect(returnedCategories.length).to.equal(2);
			expect(returnedCategories[0].name).to.equal('Places');
			expect(returnedCategories[1].name).to.equal('animals');
			done();
		});
	});

	it('should add an empty array if words not present', function(done) {
		var categories = [{ language: 'isiXhosa', name: 'Places' }];
		findCategoriesStub.yields(null, categories);

		getAllCategories(function(error, returnedCategories) {
			expect(returnedCategories.length).to.equal(1);
			expect(returnedCategories[0].words.constructor).to.equal(Array);
			expect(returnedCategories[0].words.length).to.equal(0);
			done();
		});
	});

	it('should remove the id from the returned categories', function(done) {
		var categories = [{ _id: '01234', language: 'isiXhosa', name: 'Places' }];
		findCategoriesStub.yields(null, categories);

		getAllCategories(function(error, returnedCategories) {
			expect(returnedCategories[0]._id).to.be.undefined;
			done();
		});
	});
});
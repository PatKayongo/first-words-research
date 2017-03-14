var addWordFactory = require('../../src/domain/add-word');
var categoryRepository = require('../../src/storage/category-repository');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

describe('Add Words', function() {
	var addWord;
	var findCategoryStub;
	var updateCategoryStub;

	before(function() {
		findCategoryStub = sinon.stub(categoryRepository, 'findCategory');
		updateCategoryStub = sinon.stub(categoryRepository, 'updateCategory');
		updateCategoryStub.yields();
	});

	after(function() {
		findCategoryStub.restore();
		updateCategoryStub.restore();
	});

	beforeEach(function() {
		updateCategoryStub.reset();
		addWord = addWordFactory(categoryRepository);
	});

	it('should add the word to the specified category', function(done) {
		findCategoryStub.withArgs('isiXhosa', 'places').yields(null, { language: 'isiXhosa', name: 'places' });

		addWord('isiXhosa', 'places', 'bathroom', function() {
			expect(updateCategoryStub.calledOnce).to.be.true;
			expect(updateCategoryStub.calledWith({ language: 'isiXhosa', name: 'places', words: ['bathroom'] })).to.be.true;
			done();
		});
	});
});
var addCategoryFactory = require('../../src/domain/add-category');
var categoryRepository = require('../../src/storage/category-repository');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

describe('Add Category', function() {
	var insertCategoryStub;
	var findCategoryStub;
	var addCategory;

	before(function() {
		insertCategoryStub = sinon.stub(categoryRepository, 'insertCategory');
		insertCategoryStub.yields();

		findCategoryStub = sinon.stub(categoryRepository, 'findCategory');
		findCategoryStub.yields();
	});

	after(function() {
		findCategoryStub.restore();
		insertCategoryStub.restore();
	});

	beforeEach(function() {
		insertCategoryStub.reset();
		findCategoryStub.reset();
		addCategory = addCategoryFactory(categoryRepository);
	});

	it('should save the new category in the database', function(done) {
		addCategory({ name: 'Places', language: 'isiXhosa' }, function() {
			expect(insertCategoryStub.callCount).to.equal(1);
			expect(insertCategoryStub.calledWith({ name: 'Places', language: 'isiXhosa' })).to.be.true;
			done();
		});
	});

	describe('if the category already exists', function() {
		beforeEach(function() {
			findCategoryStub.withArgs('isiXhosa', 'Places').yields(null, { name: 'Places', language: 'isiXhosa' });
		});

		it('should save the new category in the database', function(done) {
			addCategory({ name: 'Places', language: 'isiXhosa' }, function() {
				expect(insertCategoryStub.callCount).to.equal(0);
				done();
			});
		});

		it('should return a bad request error', function(done) {
			addCategory({ name: 'Places', language: 'isiXhosa' }, function(error) {
				expect(error.output.statusCode).to.equal(400);
				expect(error.output.payload.message).to.equal('Category already exists');
				done();
			});
		});
	});
});
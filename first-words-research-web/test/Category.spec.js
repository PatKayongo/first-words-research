import React from 'react';
import Category from '../src/Category.jsx';

import { shallow } from 'enzyme';
import sinon from 'sinon';
import 'sinon-as-promised';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import categoryBuilder from './builders/category-builder';

chai.use(chaiAsPromised);

describe('Category Component', function() {
	let wrapper;

	function createCategoryWrapper(category = new categoryBuilder().build(), onAddNewWord = sinon.stub()) {
		return shallow(<Category category={category} onAddNewWord={onAddNewWord} />);
	}

	const inputNewWord = (wrapper, text) => wrapper.find('input').simulate('change', { target: { value: text } });
	const pressAddButton = wrapper => wrapper.find('button').simulate('click', { preventDefault: sinon.stub() });

	it('should display the category name', () => {
		const wrapper = createCategoryWrapper(new categoryBuilder().withName('places').build());
		expect(wrapper.containsMatchingElement(<div>places</div>)).to.be.true;
	});

	it('should render the category words', () => {
		const wrapper = createCategoryWrapper(new categoryBuilder().withWords('khaya', 'kraal').build());
		expect(wrapper.containsMatchingElement(<span>khaya</span>)).to.be.true;
		expect(wrapper.containsMatchingElement(<span>kraal</span>)).to.be.true;
	});

	describe('when the add button is pressed', () => {
		const category = new categoryBuilder().build();
		const onAddNewWord = sinon.stub().resolves();
		let wrapper;

		beforeEach(() => {
			onAddNewWord.reset();
			wrapper = createCategoryWrapper(category, onAddNewWord);
		});

		it('should call the onAddNewWord function with the new word and category', () => {			
			inputNewWord(wrapper, 'iziko');
			pressAddButton(wrapper);
			expect(onAddNewWord.calledWith('iziko', category)).to.be.true;
		});

		it('should not call the onAddNewWord function if the new word is an empty string', () => {
			inputNewWord(wrapper, ' ');
			pressAddButton(wrapper);
			expect(onAddNewWord.notCalled).to.be.true;
		});
	});
});
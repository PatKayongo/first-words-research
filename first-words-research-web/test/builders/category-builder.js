
export default function categoryBuilder() {
	const defaultCategory = {
		name: 'places',
		lanugage: 'xho',
		words: []
	}

	this.withName = name => {
		defaultCategory.name = name;
		return this;
	}

	this.withLanguage = language => {
		defaultCategory.lanugage = lanugage;
		return this;
	}

	this.withWords = (...words) => {
		defaultCategory.words = words;
		return this;
	}

	this.build = () => {
		return defaultCategory;
	}
}
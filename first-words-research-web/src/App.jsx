import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CategoryList from './CategoryList.jsx';

const defaultCategories = [
        { name: 'Places', language: 'isiXhosa', words: [] },
        { name: 'Food', language: 'isiXhosa', words: [] },
        { name: 'People', language: 'Sesotho', words: [] }
      ];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedLanguage: '',
      newCategoryName: '',
      categories: defaultCategories.slice()
    };

    this.handleLanguageChanged = this.handleLanguageChanged.bind(this);
    this.handleCategoryAdd = this.handleCategoryAdd.bind(this);
    this.handleAddNewWord = this.handleAddNewWord.bind(this);
  }

  handleLanguageChanged(event) {
    this.setState({
      selectedLanguage: event.target.value
    });
  }

  handleCategoryAdd(newCategory) {
    const categories = this.state.categories.slice();
    if (categories.find(c => c.name === newCategory.name)) {
      return;
    }

    categories.push(newCategory);
    this.setState({
      categories
    });
  }

  handleAddNewWord(word, category) {
    const categories = this.state.categories.slice();
    const categoryToUpdate = categories.find(c => c.name === category.name && c.language === category.language);
    categoryToUpdate.words = categoryToUpdate.words || [];
    if (categoryToUpdate.words.find(w => w === word)) {
      return;
    }

    categoryToUpdate.words.push(word);

    this.setState({
      categories
    });
  }

  render() {
    const categoriesForLanguage = this.state.categories.filter(c => c.language === this.state.selectedLanguage);
    return (
      <div className="App">

        <div className="col-xs-12 col-md-8 col-md-offset-2">
          <form>
            <div className="form-group">
              <label htmlFor="languageSelect">Language</label>
              <select className="form-control" value={this.state.value} onChange={this.handleLanguageChanged}>
                <option></option>
                <option>isiZulu</option>
                <option>isiXhosa</option>
                <option>Afrikaans</option>
                <option>English</option>
                <option>Sepedi</option>
                <option>Setswana</option>
                <option>Sesotho</option>
                <option>Xitsonga</option>
                <option>siSwati</option>
                <option>Tshivenḓa</option>
                <option>isiNdebele</option>
              </select>
            </div>
          </form>
        </div>
        <CategoryList categories={categoriesForLanguage} language={this.state.selectedLanguage} onCategoryAdd={this.handleCategoryAdd} onAddNewWord={this.handleAddNewWord} />
      </div>
    );
  }
}

export default App;

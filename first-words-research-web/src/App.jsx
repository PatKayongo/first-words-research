import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CategoryList from './CategoryList.jsx';

const defaultCategories = [
        { name: 'Places', language: 'isiXhosa' },
        { name: 'Food', language: 'isiXhosa' },
        { name: 'People', language: 'Sesotho' }
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
  }

  handleLanguageChanged(event) {
    this.setState({
      selectedLanguage: event.target.value
    });
  }

  handleCategoryAdd(newCategory) {
    const categories = this.state.categories.slice();
    categories.push(newCategory);
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
              <label htmlFor="nameInput">Name</label>
              <input type="text" className="form-control" id="nameInput" placeholder="Name" />
            </div>
            <div className="form-group">
              <label htmlFor="inputEmail">Email address</label>
              <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
            </div>
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
        <CategoryList categories={categoriesForLanguage} language={this.state.selectedLanguage} onCategoryAdd={this.handleCategoryAdd} />
      </div>
    );
  }
}

export default App;

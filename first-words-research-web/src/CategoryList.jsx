import React, { Component } from 'react';
import Category from './Category.jsx';

export default class CategoryList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newCategoryName: '',
			categories: props.categories,
			language: props.language
		}
		
		this.handleNewCategoryTextChange = this.handleNewCategoryTextChange.bind(this);
		this.handleCategoryAdd = this.handleCategoryAdd.bind(this);
		this.onCategoryAdd = props.onCategoryAdd;
		this.onAddNewWord = props.onAddNewWord;

	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			categories: nextProps.categories,
			language: nextProps.language
		});
	}

	handleNewCategoryTextChange(event) {
		this.setState({
			newCategoryName: event.target.value
		});
	}

	handleCategoryAdd(event) {
		this.onCategoryAdd({ name: this.state.newCategoryName, language: this.state.language });
		event.preventDefault();
	}

	render() {
		return (
			<div className="col-xs-12 col-md-8 col-md-offset-2">
				<div className="panel panel-primary">
					<div className="panel-heading">
					<h3 className="panel-title">Categories</h3>
					</div>
					<div className="panel-body">
					{
						this.state.categories.map(c => {
						return (<Category key={c.name} category={c} onAddNewWord={this.onAddNewWord} />)
						})
					}
					{
						this.state.categories.length === 0 && 
						<p>There are no categories for the selected language. You can add one below.</p>
					}
					</div>
					<div className="panel-footer">
					<form className="form-inline">
						<div className="form-group">
						<input type="text" className="form-control" id="newCategoryInput" placeholder="New Category" onChange={this.handleNewCategoryTextChange} />
						</div>
						<button type="submit" className="btn btn-success" onClick={this.handleCategoryAdd} aria-label="Add">
							<span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
						</button>
					</form>
					</div>
				</div>
			</div>
		);
	}
}
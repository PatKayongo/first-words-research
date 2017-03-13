import React, { Component } from 'react';
import './Category.css';

export default class Category extends Component {
	constructor(props) {
		super(props);
		this.state = {
			category: props.category,
			newWord: ''
		}

		this.handleNewWordTextChanged = this.handleNewWordTextChanged.bind(this);
		this.onAddNewWord = props.onAddNewWord;
		this.handleAddNewWord = this.handleAddNewWord.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			category: nextProps.category
		});
	}

	handleNewWordTextChanged(event) {
		this.setState({
			newWord: event.target.value
		});
	}

	handleAddNewWord(event) {
		event.preventDefault();
		this.setState({
			newWord: ''
		});

		this.onAddNewWord(this.state.newWord, this.state.category);	
	}

	render() {
		const words = this.state.category.words || [];
		words.sort();
		return (
			<div className="col-xs-12 col-md-4">
				<div className="panel panel-default">
					<div className="panel-heading">{this.state.category.name}</div>
					<div className="panel-body">
						{
							words.map(word => <span key={word} className="label label-info word">{word}</span>)
						}
					</div>
					<div className="panel-footer">
						<form className="form-inline">
							<div className="form-group">
								<input type="text" className="form-control" placeholder="New Word" onChange={this.handleNewWordTextChanged} />
							</div>
							<button type="submit" className="btn btn-success" onClick={this.handleAddNewWord} aria-label="Add">
								<span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
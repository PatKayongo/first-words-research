import React, { Component } from 'react';

export default class Category extends Component {
	constructor(props) {
		super(props);
		this.panelName = props.category.name;
	}

	render() {
		return (
			<div className="col-xs-12 col-md-4">
				<div className="panel panel-default">
					<div className="panel-heading">{this.panelName}</div>
					<div className="panel-body">
						Basic panel example
					</div>
				</div>
			</div>
		);
	}
}
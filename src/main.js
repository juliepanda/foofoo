/* jshint esnext: true */
var React = require('react');
var ReactDOM = require('react-dom');
var Test = require('./Test');
var LinkedList = require('./LinkedList');

var App = React.createClass({
	render: function() {
		var data = 'cool';
		return (
			<div>
				<h1>HI</h1>
				<Test data={data} />
				<LinkedList />
			</div>
		)
	}
});

ReactDOM.render(<App />, document.getElementById('app'));

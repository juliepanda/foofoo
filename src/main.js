var React = require('react');
var ReactDOM = require('react-dom');
var Test = require('./Test');

var App = React.createClass({
	render: function() {
		return (
			<div>
				<h1>HI</h1>
				<Test />
			</div>
		)
	}
});

ReactDOM.render(<App />, document.getElementById('app'));

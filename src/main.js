/* jshint esnext: true */
let React = require('react'),
	ReactDOM = require('react-dom'),
	Test = require('./Test'),
	injectTapEventPlugin = require("react-tap-event-plugin");

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

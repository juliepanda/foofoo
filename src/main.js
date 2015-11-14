let React = require('react'),
	ReactDOM = require('react-dom'),
	Test = require('./Test'),
	LinkedList = require('./LinkedList'),
	injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

var App = React.createClass({
	render: function() {
		return (
			<div>
				<h1>HI</h1>
				<Test />
				<LinkedList />
			</div>
		)
	}
});

ReactDOM.render(<App />, document.getElementById('app'));

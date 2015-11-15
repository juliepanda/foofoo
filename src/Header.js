/* jshint esnext:true */
let React = require('react');

let Header = React.createClass({
	render: function() {
		return (
			<div className="row header">
				<span className="big-title">FooFoo Space</span>
				<span className="subtitle">Marketplace to trade your campus meal swipes!</span>
			</div>
		)
	}
});

module.exports = Header;

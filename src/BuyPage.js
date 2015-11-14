/* jshint esnext:true */
let React = require('react');
let request = require('superagent');

let BuyPage = React.createClass({
	componentWillMount: function() {
		request
		.get('http://127.0.0.1:5000/api/users')
		.accept('application/json')
		.end( function(err, res){
			if (res.status === 200) {
				console.log(res.text);
			}
		});

	},
	render: function() {
		return (
			<div>
			<h1>BuyPage</h1>
			</div>
		)
	}
});

module.exports = BuyPage;

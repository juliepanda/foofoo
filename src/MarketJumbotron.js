/* jshint esnext:true */
let React = require('react');
let request = require('superagent');

let MarketJumbotron = React.createClass({
	getInitialState: function() {
		return {
			'recentPrice': 0	
		};
	},
	componentWillMount: function() {
		request
		.get('http://127.0.0.1:5000/api/sell_posts')
		.accept('application/json')
		.end( function(err, res){
			if (res.status === 200) {
				console.log(res.text);
			}
		});
	},
	render: function() {
		return (
			<div className="row">
				<div>
					<p>Last meal bought at: <span>{this.state.recentPrice}</span></p>
				</div>
				<div>
					<button onClick={this.props._handleBuy}>Buy a Meal</button>
					<button onClick={this.props._handleSell}>Sell a Meal</button>
				</div>
			</div>
		)
	}
});

module.exports = MarketJumbotron;

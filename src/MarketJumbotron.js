/* jshint esnext:true */
let React = require('react');
let request = require('superagent');

let MarketJumbotron = React.createClass({
	getInitialState: function() {
		return {
			'recentPrice': 0	
		};
	},
	// componentWillMount: function() {
	// 	request
	// 	.get('http://127.0.0.1:5000/api/sell_posts')
	// 	.accept('application/json')
	// 	.end( function(err, res){
	// 		if (res.status === 200) {
	// 			console.log(res.text);
	// 		}
	// 	});
	// },
	render: function() {
		return (
			<div>
				<div>
					<div>
						<p>Last meal bought at: <span>{this.state.recentPrice}</span></p>
					</div>
					<div>
						<button className="button" onClick={this.props._handleSale}>Buy/Sell a Meal</button>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = MarketJumbotron;

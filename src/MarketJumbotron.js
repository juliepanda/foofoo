/* jshint esnext:true */
let React = require('react');
let request = require('superagent');

let MarketJumbotron = React.createClass({
	getInitialState: function() {
		return {
			'recentPrice': 0	
		};
	},
	render: function() {
		return (
			<div>
				<div>
					<div>
						<button className="button" onClick={this.props._handleSale}>Buy/Sell a Meal</button>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = MarketJumbotron;

/* jshint esnext: true */
let React = require('react'),
	ReactDOM = require('react-dom'),
	Header = require('./Header'),
	MarketJumbotron = require('./MarketJumbotron'),
	BuyPage = require('./BuyPage'),
	SellPage = require('./SellPage');

var App = React.createClass({
	getInitialState: function() {
		return {
			buyIntent: false,
			sellIntent: false
		};
	},
	_handleBuy: function() {
		console.log('switch to buy view');
		this.setState({
			buyIntent: true
		});
	},
	_handleSell: function() {
		console.log('switch to sell view');
		this.setState({
			sellIntent: true
		});
	},
	render: function() {
		let jumbotron = ((!this.state.buyIntent && !this.state.sellIntent) ? <MarketJumbotron _handleSell={this._handleSell} _handleBuy={this._handleBuy} /> : (this.state.buyIntent) ? <BuyPage /> : <SellPage />)
		return (
			<div className="main-container center">
				<Header />
				{jumbotron}
			</div>
		)
	}
});

ReactDOM.render(<App />, document.getElementById('app'));

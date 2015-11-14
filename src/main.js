/* jshint esnext: true */
let React = require('react'),
	ReactDOM = require('react-dom'),
	Test = require('./Test'),
	Header = require('./Header'),
	MarketJumbotron = require('./MarketJumbotron'),
	BuyPage = require('./BuyPage'),
	SellPage = require('./SellPage'),
	injectTapEventPlugin = require("react-tap-event-plugin");

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
			<div>
				<h1>FooFoo Space</h1>
				<Header />
				<Test />
				{jumbotron}

			</div>
		)
	}
});

ReactDOM.render(<App />, document.getElementById('app'));

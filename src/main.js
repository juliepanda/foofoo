/* jshint esnext: true */
let React = require('react'),
	ReactDOM = require('react-dom'),
	Header = require('./Header'),
	MarketJumbotron = require('./MarketJumbotron'),
	SalePage = require('./SalePage'),
	LoginPage = require('./LoginPage');

var App = React.createClass({
	getInitialState: function() {
		return {
			saleIntent: false
		};
	},
	_handleSale: function() {
		this.setState({
			saleIntent: true
		});
	},
	_handleLogin: function() {
		this.setState({
			loginIntent: true
		});
	},
	render: function() {
		let jumbotron = ((!this.state.saleIntent && !this.state.loginIntent) ? <MarketJumbotron _handleLogin={this._handleLogin} _handleSale={this._handleSale} /> : (this.state.saleIntent) ? <SalePage /> : <LoginPage />)
		return (
			<div className="row">
				<Header />
				<div className="jumbotron center">
					{jumbotron}
				</div>
			</div>
		)
	}
});

ReactDOM.render(<App />, document.getElementById('app'));

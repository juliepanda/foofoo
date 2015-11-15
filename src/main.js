/* jshint esnext: true */
let React = require('react'),
	ReactDOM = require('react-dom'),
	Header = require('./Header'),
	MarketJumbotron = require('./MarketJumbotron'),
	SalePage = require('./SalePage'),
	LoginPage = require('./LoginPage'),
	request = require('superagent');

var App = React.createClass({
	getInitialState: function() {
		let logged = localStorage.getItem('foofoologged');

		return {
			saleIntent: false,
			loginIntent: false,
			loggedIn: logged,
			userData: {},
			failedLogin: false,
			showSells: false,
			showBuys: false
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
	_handleLoginClick: function(netid, password) {
		request
		.post('http://127.0.0.1:5000/api/login')
		.send({'netid': netid, 'password': password })
		.end( function(err, res){
			if (res.status === 200) {
				let _id = JSON.parse(res.text)['_id']['$oid'];
				localStorage.setItem('foofoologged', true);
				localStorage.setItem('_id', _id);
				location.reload();
			} else {
				this.setState({
					failedLogin: true
				});
			}
		});
	},
	_findGoodBuy: function(post_id) {
		request
		.get('http://127.0.0.1:5000/api/sell_posts/nearest/' + post_id)
		.end( function(err, res){
			if (res.status === 200) {
				console.log(res.text);
			}
		});

	},
	_findGoodSell: function(post_id) {
		request
		.get('http://127.0.0.1:5000/api/buy_posts/nearest/' + post_id)
		.end( function(err, res){
			if (res.status === 200) {
				console.log(res.text);
			}
		});
	},
	render: function() {
		let jumbotron = ((!this.state.saleIntent && !this.state.loginIntent) ? <MarketJumbotron _handleLogin={this._handleLogin} _handleSale={this._handleSale} /> : (this.state.saleIntent) ? <SalePage _findGoodBuy={this._findGoodBuy} _findGoodSell={this._findGoodSell} /> : <LoginPage _handleLoginClick={this._handleLoginClick} />)
		return (
			<div className="row">
				<Header _handleLogin={this._handleLogin} />
				<div className="jumbotron center">
					{jumbotron}
				</div>
			</div>
		)
	}
});

ReactDOM.render(<App />, document.getElementById('app'));

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
				let js = JSON.parse(res.text)['data'];
				localStorage.setItem('foofoologged', true);
				location.reload();
			} else {
				this.setState({
					failedLogin: true
				});
			}
		});

	},
	render: function() {
		let jumbotron = ((!this.state.saleIntent && !this.state.loginIntent) ? <MarketJumbotron _handleLogin={this._handleLogin} _handleSale={this._handleSale} /> : (this.state.saleIntent) ? <SalePage /> : <LoginPage _handleLoginClick={this._handleLoginClick} />)
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

/* jshint esnext:true */
let React = require('react');
let LoginPage = require('./LoginPage');

let Header = React.createClass({
	getInitialState: function() {
		let logged = localStorage.getItem('foofoologged');
		return {
			logged: logged
		};
	},
	_onLogout: function() {
		localStorage.removeItem('foofoologged');
		location.reload();
	},
	componentWillMount: function() {
		let logged = localStorage.getItem('foofoologged');
		this.setState({logged: logged});
	},
	render: function() {
		let logBtn = null;
		console.log(this.state.logged);
		if (this.state.logged) {
			logBtn = (
				<div className="logout">
					<button className="button" onClick={this._onLogout}>Logout</button>
				</div>
			);
		} else {
		  	logBtn = (
				<div className="logout">
					<button className="button" onClick={this.props._handleLogin}>Login</button>
				</div>
			)
		}
		return (
			<div className="header">
				<span className="big-title">FooFoo Space</span>
				<span className="subtitle">Marketplace to trade your campus meal swipes!</span>
				{logBtn}
				<div className="logout">
					<button className="button" onClick={this.props._showTickers}>Tickers</button>
				</div>
			</div>
		)
	}
});

module.exports = Header;

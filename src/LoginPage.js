/* jshint esnext:true */
let React = require('react');
let request = require('superagent');

let LoginPage = React.createClass({
	getInitialState: function() {
		return {
			netid: '',
			password: ''
		};
	},
	_handleNetIdChange: function(e) {
		e.preventDefault();
		let str = e.target.value;
		if (str.length > 8) console.log(false);
		else this.setState({netid: str});
	},
	_handlePasswordChange: function(e) {
	
	},
	componentWillMount: function() {
		request
		.get('http://127.0.0.1:5000/api/people')
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
				<h1>LoginPage</h1>
					<div className="first-set-inputs">
						<div className="inputset">
						<label>NetId</label><input type="text" onChange={this._handleNetIdChange} />
						</div>
						<div className="inputset">
						<label>Password</label><input type="password" onChange={this._handlePasswordChange} />
						</div>
					</div>
					<button className="button">Submit</button>
			</div>
		)
	}
});

module.exports = LoginPage;



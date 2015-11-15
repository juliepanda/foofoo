/* jshint esnext:true */
let React = require('react');
let request = require('superagent');

let BuyPage = React.createClass({
	getInitialState: function() {
		let logged = localStorage.getItem('foofoologged');
		return {
			price: 0,
			nNumber: '',
			netId: '',
			name: '',
			logged: logged
		};
	},
	_handlePriceOnChange: function(e) {
		e.preventDefault();
		let val = parseFloat(e.target.value).toFixed(2);
		if (isNaN(val)) {
			console.log(false);
		} else {
			this.setState({price: val});
		}
	},
	_handleNNumberOnChange: function(e) {
		e.preventDefault();
		let str = e.target.value;
		let val = parseInt(str.slice(1, str.length));
		let n = str.slice(0, 1);
		if (n === 'N' & val.length <= 8) this.setState({ nNumer: val});
		else console.log(false);
	},
	_handleNetIdChange: function(e) {
		e.preventDefault();
		let str = e.target.value;
		if (str.length > 8) console.log(false);
		else this.setState({netid: str});
	},
	componentWillMount: function() {
		let logged = localStorage.getItem('foofoologged');
		console.log(logged);
		this.setState({logged: logged});
		// request
		// .get('http://127.0.0.1:5000/api/people')
		// .accept('application/json')
		// .end( function(err, res){
		// 	if (res.status === 200) {
		// 		console.log(res.text);
		// 	}
		// });

	},
	render: function() {
		let extraQ = null;
		if (this.state.logged) {
			extraQ = null;
		} else {
			extraQ = (
				<div className="second-set-inputs">
					<div className="inputset">
						<label>N-number: </label><input type="text" onChange={this._handleNNumberOnChange} />
					</div>
					<div className="inputset">
						<label>net id: </label><input type="text" onChange={this._handleNetIdChange}/>
					</div>
					<div className="inputset">
						<label>Name: </label><input type="text" onChange={this._handleNameChange}/>
					</div>
				</div>
			);
		}
		return (
			<div>
				<label>Buy</label>
				<form>
					<div>
						<div className="first-set-inputs">
							<div className="inputset">
								<label>Buy Price: </label><input type="text" onChange={this._handlePriceOnChange} />
							</div>
							<div className="inputset">
								<label>Quantity: </label><input type="number" min="1" max="5" />
							</div>
						</div>
						{extraQ}
						<br />
					</div>
					<button className="button">Submit</button>
				</form>
			</div>
		)
	}
});

module.exports = BuyPage;

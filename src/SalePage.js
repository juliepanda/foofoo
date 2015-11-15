/* jshint esnext:true */
let React = require('react');
let request = require('superagent');

let BuyPage = React.createClass({
	getInitialState: function() {
		let logged = localStorage.getItem('foofoologged');
		let _id = localStorage.getItem('_id');

		return {
			_id: _id,
			diningList: ['WEINSTEIN', 'KIMMEL', 'HAYDEN', 'RUBIN', 'PALLADIUM', 'THIRD-NORTH', 'U-HALL'],
			diningChecked: {},
			price: 0,
			nNumber: '',
			netId: '',
			name: '',
			logged: logged,
			expire_in: 0,
			qty: 0
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
	_handleExpiration: function(e) {
		e.preventDefault();
		this.setState({ expire_in: parseInt(e.target.value)});
	},
	_handleQuantity: function (e) {
		e.preventDefault();
		this.setState({ qty: parseInt(e.target.value)});
	
	},
	_handleBuy: function() {
		let locations = this.state.diningList.filter( (hall) => {
			return (this.state.diningChecked[hall]['checked']) ? true: false;
		});
		let json = {
			data: {
				type: "buy_posts",
				attributes: {
					price: this.state.price,
					locations: locations,
					days_until_expiration: this.state.expire_in,
					quantity: this.state.qty
				}
			},
			links: {
				buyer: {
					type: "people",
					_id: this.state._id
				},
				seller: {}
			}
		};
		request
		.post('http://127.0.0.1:5000/api/buy_posts')
		.send(json)
		.end( function(err, res){
			if (res.status === 200) {
				console.log(res.text);
			}
		});

	},
	_handleSell: function() {
		let locations = this.state.diningList.filter( (hall) => {
			return (this.state.diningChecked[hall]['checked']) ? true: false;
		});
		let json = {
			data: {
				type: "sell_posts",
				attributes: {
					price: this.state.price,
					locations: locations,
					days_until_expiration: this.state.expire_in,
					quantity: this.state.qty
				}
			},
			links: {
				seller: {
					type: "people",
					_id: this.state._id
				},
				buyer: {}
			}
		};
		request
		.post('http://127.0.0.1:5000/api/sell_posts')
		.send(json)
		.end( function(err, res){
			if (res.status === 200) {
				console.log(res.text);
			}
		});


	},
	_toggleCheckbox: function(i) {
		let hall = this.state.diningList[i];
		let upd = this.state.diningChecked;
		upd[hall]['checked'] = (upd[hall]['checked']) ? false: true;
		this.setState({
			diningChecked: upd
		});
	},
	componentWillMount: function() {
		let logged = localStorage.getItem('foofoologged');
		this.setState({logged: logged});
		this.state.diningList.map((hall) => {
			this.state.diningChecked[hall] =  {
				checked: false,
				value: hall
			};
		});
	},
	render: function() {
		let diningSet = this.state.diningList.map( (hall, i) => {
			let checker = this.state.diningChecked[hall]['checked'];
			return (
				<div>
					<input type="checkbox" key={i} checked={checker} value={hall} onChange={this._toggleCheckbox.bind(this, i)} /><span>{hall}</span>
				</div>
			)
		});

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
				<div>
				<div className="first-set-inputs">
					<div className="inputset">
						<label>Buy Price: </label><input type="text" onChange={this._handlePriceOnChange} />
					</div>
					<div className="inputset">
						<label>Quantity: </label><input type="number" min="1" max="5" onChange={this._handleQuantity} />
					</div>
					<div className="inputset">
						<label>Offer expire in (days): </label><input type="number" min="1" max="10" onChange={this._handleExpiration} />
					</div>
				</div>
				<div>
					<div className="inputset">
						<label>Dining Halls (1 or many): </label>
						<fieldset>
						{diningSet}
						</fieldset>
					</div>
				</div>
				{extraQ}
				<br />
				</div>
				<button className="button" onClick={this._handleBuy}>Buy</button>
				<button className="button" onClick={this._handleSell}>Sell</button>
			</div>
		)
	}
});

module.exports = BuyPage;

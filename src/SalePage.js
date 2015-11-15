/* jshint esnext:true */
let React = require('react');
let request = require('superagent');

let BuyPage = React.createClass({
	getInitialState: function() {
		let logged = localStorage.getItem('foofoologged');

		return {
			diningList: ['WEINSTEIN', 'KIMMEL', 'HAYDEN', 'RUBIN', 'PALLADIUM', 'THIRD-NORTH', 'U-HALL'],
			diningChecked: {},
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
	_handleBuy: function() {
		let json = {
			data: {
				type: "sell_posts",
				attributes: {
					price: 5.00,
					locations: [
						"WEINSTEIN",
						"RUBIN",
						"KIMMEL"
					],
					days_until_expiration: 10
				}
			},
			links: {
				seller: {
					type: "people",
					_id: "5647beede78cd5931a01d917"
				},
				buyer: {}
			}
		};
		request
		.post('http://127.0.0.1:5000/api/buy_posts')
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
	_handleSell: function() {

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
				<form>
					<div>
					<div className="first-set-inputs">
						<div className="inputset">
							<label>Buy Price: </label><input type="text" onChange={this._handlePriceOnChange} />
						</div>
						<div className="inputset">
							<label>Quantity: </label><input type="number" min="1" max="5" />
						</div>
						<div className="inputset">
							<label>Offer expire in (days): </label><input type="number" min="1" max="10" />
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
				</form>
			</div>
		)
	}
});

module.exports = BuyPage;

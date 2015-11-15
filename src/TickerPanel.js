/* jshint esnext:true */
let React = require('react');
let request = require('superagent');

let TickerPanel = React.createClass({
	getInitialState: function() {
		return {
			diningList: ['WEINSTEIN', 'KIMMEL', 'HAYDEN', 'RUBIN', 'PALLADIUM', 'THIRD-NORTH', 'U-HALL'],
			diningChecked: {},
			logged: false,
			allBuys: [],
			allSells: [],
			_id: ''
		};
	},
	componentWillMount: function() {
		let logged = localStorage.getItem('foofoologged');
		let _id = localStorage.getItem('_id');
		this.setState({logged: logged, _id: _id});
		this.state.diningList.map((hall) => {
			this.state.diningChecked[hall] =  {
				checked: false,
				value: hall,
			};
		});

	},
	componentDidMount: function() {
		request
		.get('http://127.0.0.1:5000/api/sell_posts')
		.end( (err, res) => {
			if (res.status === 200) {
				let js = JSON.parse(res.text);
				this.setState({allSells: js});
			}
		});
	
		request
		.get('http://127.0.0.1:5000/api/buy_posts')
		.end( (err, res) => {
			if (res.status === 200) {
				let js = JSON.parse(res.text);
				this.setState({allBuys: js});
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
	_handleBuyConnect: function(post_id) {

	
	},
	_handleSellConnect: function(post_id) {
	
	},
	render: function() {
		let diningSet = this.state.diningList.map( (hall, i) => {
			let checker = this.state.diningChecked[hall]['checked'];
			return (
				<div className="ticker-checkbox-set">
					<input type="checkbox" key={i} checked={checker} value={hall} onChange={this._toggleCheckbox.bind(this, i)} /><span>{hall}</span>
				</div>
			)
		})
		;
		let clickedDining = [];
		 for (let i = 0; i < this.state.diningList.length; i++) {
			 let hall = this.state.diningList[i];
			if (this.state.diningChecked[hall]['checked'] === true) clickedDining.push(hall);
		 }

		 let finalBuys = [];
		 if (this.state.allBuys.length > 0) {
		 	finalBuys = this.state.allBuys.filter((buy) => {
				let locations = buy['data']['attributes']['locations'];
				for (let i = 0; i < locations.length; i++) {
					if (this.state.diningChecked[locations[i]]['checked'] === true && this.state._id != buy['links']['buyer']['_id']) return true;
				}
			});
		 }
		 let finalSells = [];
		 if (this.state.allSells.length > 0) {
		 	finalSells = this.state.allSells.filter((sell) => {
				let locations = sell['data']['attributes']['locations'];
				for (let i = 0; i < locations.length; i++) {
					if (this.state.diningChecked[locations[i]]['checked'] === true && this.state._id != sell['links']['seller']['_id']) return true;
				}
			});
		 }

		 let buyrows = null;
		 if (finalBuys.length > 0) {
		 	buyrows = finalBuys.map((buy) => {
				return (
					<tr>
						<td>{Date(buy['data']['attributes']['expired_by']['$date'])}</td>
						<td>{buy['data']['attributes']['price']}</td>
						<td><button key={buy['_id']} onClick={this._handleBuyConnect.bind(this, buy['_id'])}>Connect</button></td>
					</tr>
				);
			});
		 }
		 
		 let sellrows = null;
		 if (finalSells.length > 0) {
		 	sellrows = finalSells.map((sell) => {
				return (
					<tr>
						<td>{Date(sell['data']['attributes']['expired_by']['$date'])}</td>
						<td>{sell['data']['attributes']['price']}</td>
						<td><button key={sell['_id']} onClick={this._handleSellConnect.bind(this, sell['_id'])}>Connect</button></td>
					</tr>
				);
			});
		 }

		 
		return (
			<div className="row">
				<div className="twelve columns control">
				<strong>Select dining halls: </strong>
					{diningSet}
				</div>
					<div>
						<div className="six columns left-ticker">
						<table className="u-full-width">
						  <thead>
							<tr>
							  <th>Expiration</th>
							  <th>Price</th>
							  <th>Sell</th>
							</tr>
						  </thead>
						  <tbody>
						  {buyrows}
						  </tbody>
						</table>
						</div>
						<div className="six columns right-ticker">
						<table className="u-full-width">
						  <thead>
							<tr>
							  <th>Expiration</th>
							  <th>Price</th>
							  <th>Buy</th>
							</tr>
						  </thead>
						  <tbody>
						  {sellrows}
						  </tbody>
						</table>
						
						</div>
					</div>

			</div>
		)
	}
});

module.exports = TickerPanel;

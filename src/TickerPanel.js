/* jshint esnext:true */
let React = require('react');
let request = require('superagent');

let TickerPanel = React.createClass({
	getInitialState: function() {
		return {
			diningList: ['WEINSTEIN', 'KIMMEL', 'HAYDEN', 'RUBIN', 'PALLADIUM', 'THIRD-NORTH', 'U-HALL'],
			diningChecked: {},
			logged: false
		};
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
	_toggleCheckbox: function(i) {
		let hall = this.state.diningList[i];
		let upd = this.state.diningChecked;
		upd[hall]['checked'] = (upd[hall]['checked']) ? false: true;
		this.setState({
			diningChecked: upd
		});
	},
	render: function() {
		let diningSet = this.state.diningList.map( (hall, i) => {
			let checker = this.state.diningChecked[hall]['checked'];
			return (
				<div className="ticker-checkbox-set">
					<input type="checkbox" key={i} checked={checker} value={hall} onChange={this._toggleCheckbox.bind(this, i)} /><span>{hall}</span>
				</div>
			)
		});
		return (
			<div className="row">
				<div className="twelve columns control">
					{diningSet}
				</div>
					<div>
						<div className="six columns left-ticker">
						<table className="u-full-width">
						  <thead>
							<tr>
							  <th>Name</th>
							  <th>Age</th>
							  <th>Sex</th>
							  <th>Location</th>
							</tr>
						  </thead>
						  <tbody>
							<tr>
							  <td>Dave Gamache</td>
							  <td>26</td>
							  <td>Male</td>
							  <td>San Francisco</td>
							</tr>
							<tr>
							  <td>Dwayne Johnson</td>
							  <td>42</td>
							  <td>Male</td>
							  <td>Hayward</td>
							</tr>
						  </tbody>
						</table>
						</div>
						<div className="six columns right-ticker"></div>
					</div>

			</div>
		)
	}
});

module.exports = TickerPanel;

/* jshint esnext:true */
let React = require('react');
let request = require('superagent');

let BuyPage = React.createClass({
	_handlePriceOnChange: function(e) {
		e.preventDefault();
		let val = parseFloat(e.target.value).toFixed(2);
		if (isNaN(val)) {
			console.log(false);
		} else {
			console.log(true);
		}
	},
	_handleNNumberOnChange: function(e) {
		e.preventDefault();
		let str = e.target.value;
		let val = parseInt(str.slice(1, str.length));
		let n = str.slice(0, 1);
		if (n === 'N' & val.length <= 8) console.log(true);
		else console.log(false);
	},
	componentWillMount: function() {
		request
		.get('http://127.0.0.1:5000/api/users')
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
			<h1>BuyPage</h1>
				<div>
					<span>Buy Price: </span><input type="text" onChange={this._handlePriceOnChange} />
					<span>Quantity: </span><input type="number" min="1" max="5" />
					<span>N-number: </span><input type="text" onChange={this._handleNNumberOnChange} />
				</div>
			</div>
		)
	}
});

module.exports = BuyPage;

/* jshint esnext: true */
let React = require('react');
let d3 = require('d3');
let ReactFauxDOM = require('react-faux-dom');
let json = require('./faux_data');

let LinkedList = React.createClass({
	render: function() {

		let width = 960,
			height = 500;
			
			let color = d3.scale.category20();

			let force = d3.layout.force()
			.charge(-120)
			.linkDistance(30)
			.size([width, height]);

			let graph = ReactFauxDOM.createElement('svg');

			let svg = d3.select(graph)
			.attr('width', width)
			.attr('height', height);

			force
			.nodes(json.nodes)
			.links(json.links)
			.start();

			let link = svg.selectAll('.link')
			.data(json.links)
			.enter().append('line')
			.attr('class', 'link')
			.style('stroke-width', function(d) { return Math.sqrt(d.value); });

			let node = svg.selectAll('.node')
			.data(json.nodes)
			.enter().append('circle')
			.attr('class', 'node')
			.attr('r', 5)
			.style('fill', function(d) { return color(d.group); })
			.call(force.drag);

			node.append('title')
			.text(function(d) { return d.name; });

			force.on('tick', function() {
				link.attr('x1', function(d) { return d.source.x; })
				.attr('y1', function(d) { return d.source.y; })
				.attr('x2', function(d) { return d.target.x; })
				.attr('y2', function(d) { return d.target.y; });

				node.attr('cx', function(d) { return d.x; })
				.attr('cy', function(d) { return d.y; });
			});

			console.log(graph.toReact());

			return graph.toReact();

	}
});

module.exports = LinkedList;

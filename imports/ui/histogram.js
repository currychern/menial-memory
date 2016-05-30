import { Template } from 'meteor/templating';

import './histogram.html';

Template.histogram.onRendered( function () {
  var self = this;
  var parentInstance = self.view.parentView.templateInstance();

  //Chart Initialization
  var margin = {top: 40, right: 40, bottom: 40, left: 40},
      width = 300 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  //Create SVG element
  var svg = d3.select("#histogram")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scale.ordinal().rangeRoundBands([0, width], .1),
      y = d3.scale.linear().range([height, 0]);

  initAxis();

  function initAxis() {
    var xAxis = d3.svg.axis().scale(x).orient("bottom"),
        yAxis = d3.svg.axis().scale(y).orient("left");

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");
  }

  Tracker.autorun(function() {
    data = parentInstance.histogram.get();

    //Update scale domains
    x.domain(data.map(function(d) { return d._id; }));
    y.domain([0, d3.max(data, function(d) { return d.freq; })]);

    /*Bars*********************************************************************/

    //Select…
    var bar = svg.selectAll(".bar")
      .data(data, function(d) {return d._id});

    //Enter
    bar.enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d._id); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.freq); })
      .attr("height", function(d) { return height - y(d.freq); });

     //Update…
     bar.transition()
       .duration(500)
       .attr("class", "bar")
       .attr("x", function(d) { return x(d._id); })
       .attr("width", x.rangeBand())
       .attr("y", function(d) { return y(d.freq); })
       .attr("height", function(d) { return height - y(d.freq); });

     //Exit…
     bar.exit()
       .transition()
       .duration(500)
       .attr("x", +x.rangeBand())
       .remove();



    /*Label********************************************************************/

		var label = svg.selectAll(".bar-label")
			.data(data, function(d) {return d._id});

		label.enter()
			.append("text")
      .attr("class", "bar-label")
			.text(function(d) { return d.freq; })
			.attr("text-anchor", "middle")
			.attr("x", width)
			.attr("y", function(d) { return y(d.freq) - 7; });

		label.transition()
			.duration(500)
			.attr("x", function(d, i) { return x(d._id) + x.rangeBand() / 2; })
      .attr("y", function(d) { return y(d.freq) - 7; })
      .text(function(d) { return d.freq; });

		label.exit()
			.transition()
			.duration(500)
			.attr("x", +x.rangeBand())
			.remove();



    /*Axis*********************************************************************/

    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left");

    svg.selectAll("g.y.axis")
      .call(yAxis)

    svg.selectAll("g.x.axis")
      .call(xAxis);



  })
});

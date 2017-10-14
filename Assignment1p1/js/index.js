
var data = [{"day": 1, "calBurn": 1910, "calIntake": 2100, "steps": 10000}, {"day": 2, "calBurn": 2110, "calIntake": 1950, "steps": 10000}, {"day": 3, "calBurn": 1640, "calIntake": 1870, "steps": 10000}, {"day": 4, "calBurn": 2010, "calIntake": 2200, "steps": 10000}, {"day": 5, "calBurn": 1810, "calIntake": 1760, "steps": 10000}, {"day": 6, "calBurn": 1710, "calIntake": 1750, "steps": 10000},  {"day": 7, "calBurn": 1600, "calIntake": 2300, "steps": 10000}, {"day": 8, "calBurn": 2310, "calIntake": 1960, "steps": 10000}, {"day": 9, "calBurn": 1760, "calIntake": 1700, "steps": 10000}, {"day": 10, "calBurn": 1940, "calIntake": 1800, "steps": 10000}];

var width = 420,
    barHeight = 20,
    labelWidth = 30;

var x = d3.scaleLinear().range([0, width - labelWidth])
    .domain([ 0, d3.max(data, function(d) { return Math.max(d.calIntake, d.calBurn);
      } ) ]);

// var x = d3.scaleLinear().range([0, d3.max(data, function(d) {
//        return Math.max(+d.calIntake, +d.calBurn, +d.calIntake)
//    }) ])
//   .domain([0, width - labelWidth]);


var chart = d3.select(".chart").attr("width", width);
var groupspace = 20;

// d3.json(
//   "https://s3-us-west-2.amazonaws.com/s.cdpn.io/960128/sales.json",
//  function(error, data) {
//    x.domain([
//      0,
//      d3.max(data, function(d) {
//        return Math.max(+d.thingamajigs, +d.doohickeys, +d.widgets);
//      })
//    ]);
 
 chart.attr("height", barHeight * (3 * data.length + groupspace));

  var bars = chart
     .selectAll("g")
     .data(data)
     .enter()
     .append("g")
     .attr("transform", function(d, i) {
      return (
         "translate(" +
         labelWidth +
        "," +
        i * (barHeight * 2 + groupspace) +
        ")"
      ); });
    
    // draw the bars
    bars
      .append("rect")
      .attr("class", "calBurn") 
      .attr("width", function(d) { return x(d.calBurn); })
      .attr("height", barHeight - 1);
      
//.attr("width", barWidth - 1)
//      .attr("height",function(d) { return x(d.calBurn); })
//      .attr("x", function(d) { return (barWidth * (d.day + // d.day - 1)) } )  


    bars
      .append("rect")
      .attr("class", "calIntake")
      .attr("width", function(d) {
      return x(d.calIntake); })
      .attr("height", barHeight - 1)
      .attr("y", barHeight * 1);

     //  .attr("width", barWidth - 1)
     // .attr("height",function(d) { return x(d.calIntake); })
    //  .attr("x", function(d) { return (barWidth* 2 * (d.day + d.day - 1)) +  } ) 



    // Label the bars
    bars
      .append("text")
      .attr("class", "value")
      .attr("x", function(d) {
        return x(d.calBurn) - 3;
      })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) {
        return d.calBurn;
      });
    bars
      .append("text")
      .attr("class", "value")
      .attr("x", function(d) {
        return x(d.calIntake) - 3;
      })
      .attr("y", barHeight + barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) {
        return d.calIntake;
      });

    bars
      .append("text")
      .attr("class", "label")
      .attr("x", -labelWidth)
      .attr("y", barHeight + barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) {
        return d.day;
      });
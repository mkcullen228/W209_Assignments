var data = [{key: "Come Back to the Five and D…", date: "01/1", value: "0.00"},
{key: "The Brother from Another Pl…", date: "01/1", value: "662088.00"},
{key: "Stop Making Sense", date: "01/1", value: "730877.00"},
{key: "A Room with a View", date: "01/1", value: "0.00"},
{key: "Come Back to the Five and D…", date: "01/2", value: "0.00"},
{key: "The Brother from Another Pl…", date: "01/2", value: "402205.00"},
{key: "Stop Making Sense", date: "01/2", value: "628645.00"},
{key: "A Room with a View", date: "01/2", value: "0.00"},
{key: "Come Back to the Five and D…", date: "01/3", value: "0.00"},
{key: "The Brother from Another Pl…", date: "01/3", value: "367040.00"},
{key: "Stop Making Sense", date: "01/3", value: "697556.00"},
{key: "A Room with a View", date: "01/3", value: "0.00"},
{key: "Come Back to the Five and D…", date: "01/4", value: "0.00"},
{key: "The Brother from Another Pl…", date: "01/4", value: "172955.00"},
{key: "Stop Making Sense", date: "01/4", value: "362954.00"},
{key: "A Room with a View", date: "01/4", value: "0.00"},
{key: "Come Back to the Five and D…", date: "01/5", value: "0.00"},
{key: "The Brother from Another Pl…", date: "01/5", value: "207102.00"},
{key: "Stop Making Sense", date: "01/5", value: "415751.00"},
{key: "A Room with a View", date: "01/5", value: "929401.00"},
{key: "Come Back to the Five and D…", date: "01/6", value: "0.00"},
{key: "The Brother from Another Pl…", date: "01/6", value: "45891.00"},
{key: "Stop Making Sense", date: "01/6", value: "224378.00"},
{key: "A Room with a View", date: "01/6", value: "0.00"},
{key: "Come Back to the Five and D…", date: "01/7", value: "0.00"},
{key: "The Brother from Another Pl…", date: "01/7", value: "40939.00"},
{key: "Stop Making Sense", date: "01/7", value: "184722.00"},
{key: "A Room with a View", date: "01/7", value: "0.00"},
{key: "Come Back to the Five and D…", date: "01/8", value: "0.00"},
{key: "The Brother from Another Pl…", date: "01/8", value: "0.00"},
{key: "Stop Making Sense", date: "01/8", value: "159309.00"},
{key: "A Room with a View", date: "01/8", value: "926397.00"},
{key: "Come Back to the Five and D…", date: "01/9", value: "0.00"},
{key: "The Brother from Another Pl…", date: "01/9", value: "0.00"},
{key: "Stop Making Sense", date: "01/9", value: "47612.00"},
{key: "A Room with a View", date: "01/9", value: "0.00"},
{key: "Come Back to the Five and D…", date: "01/10", value: "0.00"},
{key: "The Brother from Another Pl…", date: "01/10", value: "96982.00"},
{key: "Stop Making Sense", date: "01/10", value: "146421.00"},
{key: "A Room with a View", date: "01/10", value: "0.00"},
{key: "Come Back to the Five and D…", date: "01/11", value: "141906.00"},
{key: "The Brother from Another Pl…", date: "01/11", value: "705071.00"},
{key: "Stop Making Sense", date: "01/11", value: "718787.00"},
{key: "A Room with a View", date: "01/11", value: "0.00"},
{key: "Come Back to the Five and D…", date: "01/12", value: "0.00"},
{key: "The Brother from Another Pl…", date: "01/12", value: "527011.00"},
{key: "Stop Making Sense", date: "01/12", value: "669953.00"},
{key: "A Room with a View", date: "01/12", value: "0.00"}
];

var datearray = [];
var colorrange = [];

//colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9"];
colorrange = [
  "#3182bd",
  "#31a354",
  "#c6dbef",
  "#969696",
  "#e6550d",
  "#6baed6",
  "#bcbddc",
  "#636363",
  "#9ecae1",
  "#fd8d3c",
  "#bdbdbd",
  "#756bb1",
  "#fdae6b",
  "#8c6d31",
  "#dadaeb",
  "#fdd0a2",
  "#e7ba52",
  "#d9d9d9",
  "#74c476",
  "#9e9ac8",
  "#bd9e39",
  "#a1d99b",
  "#e7cb94",
  "#843c39",
  "#c7e9c0",
  "#ad494a",
  "#d6616b",
  "#e7969c"
];
//strokecolor = colorrange[0];
strokecolor = "#000000";
// strokecolor = "#FFFFFF";
//strokecolor = "#696969";

// parseDate = d3.time.format("%d/%m/%Y").parse;
parseDate = d3.time.format("%d/%m").parse;

margin = { top: 100, right: 30, bottom: 90, left: 150 };
width = 650 - margin.left - margin.right;
height = 400 - margin.top - margin.bottom;

var months_list = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

var tooltip = d3
  .select("body")
  .append("div")
  .attr("class", "remove")
  .style("position", "absolute")
  .style("z-index", "30")
  .style("visibility", "hidden")
  .style("top", "20px")
  .style("left", "550px");

x = d3.time.scale().range([0, width]);

y = d3.scale.linear().range([height, 0]);

z = d3.scale.ordinal().range(colorrange);

xAxis = d3.svg
  .axis()
  .scale(x)
  .orient("bottom")
  // .ticks(d3.time.years, 1);
  .ticks(d3.time.months, 1);

yAxis = d3.svg.axis().scale(y);

yAxisr = d3.svg.axis().scale(y);

stack = d3.layout
  .stack()
  .offset("silhouette")
  .values(function(d) {
    return d.values;
  })
  .x(function(d) {
    return d.date;
    console.log(d.date);
  })
  .y(function(d) {
    return d.value * 100;
  });

nest = d3.nest().key(function(d) {
  return d.key;
});

area = d3.svg
  .area()
  //.interpolate("cardinal")
  .interpolate("basis")
  .x(function(d) {
    return x(d.date);
  })
  .y0(function(d) {
    return y(d.y0);
  })
  .y1(function(d) {
    return y(d.y0 + d.y);
  });

svg = d3
  .select("#streamgraph")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

graph = data.forEach(function(d) {
  d.date = parseDate(d.date);
  d.value = +d.value;
});

layers = stack(nest.entries(data));

x.domain(
  d3.extent(data, function(d) {
    return d.date;
  })
);

y.domain([
  0,
  d3.max(data, function(d) {
    return d.y0 + d.y;
  })
]);

svg
  .selectAll(".layer")
  .data(layers)
  .enter()
  .append("path")
  .attr("class", "layer")
  .attr("d", function(d) {
    return area(d.values);
  })
  // Color of each stream
  .style("fill", function(d, i) {
    return z(i);
  });

// Add x-Axis
svg
  .append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .selectAll("text")
  .attr("y", 5)
  .attr("x", -33)
  .attr("dy", "0.35em")
  .attr("transform", "rotate(-45)")
  .attr("style", "font-size: 12");

// Add x-axis label
svg
  .append("text") // text label for the x axis
  .attr("x", width * 3 / 8)
  .attr("dx", "1em")
  .attr("y", height + margin.bottom * 3 / 4)
  .style("text-anchor", "middle")
  .attr("style", "font-size: 16; font-family: Garamond, sans-serif")
  .text("Month of Year");

// Add y-axis
svg
  .append("g")
  .attr("class", "y axis")
  .attr("style", "font-size: 11")
  .call(yAxis.orient("left"));

// Add y-axis label
console.log(margin.left);
svg
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", 0 - height / 2)
  .attr("y", 0 - margin.left * 7 / 8)
  .attr("dy", "1em")
  .attr("style", "font-size: 16; font-family: Garamond, sans-serif")
  .style("text-anchor", "middle")
  .text("Average Profit (Dollars)");

// Add Title
svg
  .append("text")
  .attr("x", width / 2)
  .attr("y", 0 - margin.top / 2)
  .attr("text-anchor", "middle")
  .attr("style", "font-size: 20; font-family: Garamond, sans-serif")
  .style("text-decoration", "underline")
  .text("Cinecom Average Profits");

// Add Legend to plot

svg
  .selectAll(".layer")
  .attr("opacity", 1)
  .on("mouseover", function(d, i) {
    svg
      .selectAll(".layer")
      .transition()
      .duration(250)
      .attr("opacity", function(d, j) {
        return j != i ? 0.6 : 1;
      });
  })
  .on("mousemove", function(d, i) {
    mousex = d3.mouse(this);
    mousex = mousex[0];
    var invertedx = x.invert(mousex);
    // invertedx = invertedx.getYear() + invertedx.getDate();
    invertedx = invertedx.getMonth() + invertedx.getDate();
    var selected = d.values;
    console.log(selected);
    for (var k = 0; k < selected.length; k++) {
      datearray[k] = selected[k].date;
      // datearray[k] = datearray[k].getYear() + datearray[k].getDate();
      datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
    }

    mousedate = datearray.indexOf(invertedx);
    pro = d.values[mousedate].value;
    mo = months_list[d.values[mousedate].value];
    // console.log(mo);

    d3
      .select(this)
      .classed("hover", true)
      .attr("stroke", strokecolor)
      .attr("stroke-width", "0.5px"),
      tooltip
        .html("<p>" + d.key + "<br>$" + pro + "</p>")
        // .html("<p>" + d.key + "<br>" + mo +"<br>" + pro + "</p>")
        .style("visibility", "visible");
  })
  .on("mouseout", function(d, i) {
    svg
      .selectAll(".layer")
      .transition()
      .duration(250)
      .attr("opacity", "1");
    d3
      .select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px"),
      tooltip
        .html("<p>" + d.key + "<br>" + pro + " Million</p>")
        .style("visibility", "hidden");
  });

var vertical = d3
  .select("#streamgraph")
  .append("div")
  .attr("class", "remove")
  .style("position", "absolute")
  .style("z-index", "30")
  .style("width", "1px")
  .style("height", "380px")
  .style("top", "10px")
  .style("bottom", "30px")
  .style("left", "0px")
  .style("background", "#fff");

d3
  .select("#streamgraph")
  .on("mousemove", function() {
    mousex = d3.mouse(this);
    mousex = mousex[0] + 5;
    vertical.style("left", mousex + "px");
  })
  .on("mouseover", function() {
    mousex = d3.mouse(this);
    mousex = mousex[0] + 5;
    vertical.style("left", mousex + "px");
  });

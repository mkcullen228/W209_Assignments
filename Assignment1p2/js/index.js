var data = [
  { day: 1, calBurn: 1910, calIntake: 2100, steps: 10000 },
  { day: 2, calBurn: 2110, calIntake: 1950, steps: 10000 },
  { day: 3, calBurn: 1640, calIntake: 1870, steps: 10000 },
  { day: 4, calBurn: 2010, calIntake: 2200, steps: 10000 },
  { day: 5, calBurn: 1810, calIntake: 1760, steps: 10000 },
  { day: 6, calBurn: 1710, calIntake: 1750, steps: 10000 },
  { day: 7, calBurn: 1600, calIntake: 2300, steps: 10000 },
  { day: 8, calBurn: 2310, calIntake: 1960, steps: 10000 },
  { day: 9, calBurn: 1760, calIntake: 1700, steps: 10000 },
  { day: 10, calBurn: 1940, calIntake: 1800, steps: 10000 }
];

var width = 420,
    margin = 100,
  barHeight = 20,
  labelWidth = 55;

var x = d3
  .scaleLinear()
  .range([0, width - labelWidth])
  .domain([
    0,
    d3.max(data, function(d) {
      return Math.max(d.calIntake, d.calBurn);
    })
  ]);

var chart = d3.select(".chart").attr("width", width);
var groupspace = 20;

chart.attr("height", barHeight * (3 * data.length + groupspace));

var bars = chart
  .selectAll("g")
  .data(data)
  .enter()
  .append("g")
  .attr("transform", function(d, i) {
    return (
      "translate(" + labelWidth + "," + i * (barHeight * 2 + groupspace) + ")"
    );
  });


// draw the Calroic Burn Bars
bars
  .append("rect")
  .attr("class", "calBurn")
  .attr("width", function(d) {
    return x(d.calBurn);
  })
  .attr("height", barHeight - 1)
  .attr("fill", "maroon")
  .attr("opacity", 0.8)
  .attr("y", margin)
 // Add color Interaction
  .on("mouseover", function(d) {
    d3.select(this).attr("opacity", 1);
    d3.select(this).attr("fill", "#F36D6D");
  })
  .on("mouseout", function(d) {
    d3.select(this).attr("opacity", 0.8);
    d3.select(this).attr("fill", "maroon");
  });

// draw the Calroic Intake Bars
bars
  .append("rect")
  .attr("class", "calIntake")
  .attr("fill", "green")
  .attr("opacity", 0.8)
  .attr("width", function(d) {
    return x(d.calIntake);
  })
  .attr("height", barHeight - 1)
  .attr("y", margin + barHeight * 1)
 // Add color Interaction
  .on("mouseover", function(d) {
    d3.select(this).attr("opacity", 1);
    d3.select(this).attr("fill", "#6DF36D");
  })
  .on("mouseout", function(d) {
    d3.select(this).attr("opacity", 0.8);
    d3.select(this).attr("fill", "green");
  });

// Label the bars
bars
  .append("text")
  .attr("class", "value")
  .attr("x", function(d) {
    return x(d.calBurn) - 3;
  })
  .attr("y", margin + barHeight / 2)
  .attr("dy", ".25em")
  .text(function(d) {
    return d.calBurn;
  })
  .attr("fill", "white")
 // Add color Interaction
  .on("mouseover", function(d) {
    d3.select(this).attr("fill", "black");
  })
  .on("mouseout", function(d) {
    d3.select(this).attr("fill", "white");
  });
;

bars
  .append("text")
  .attr("class", "value")
  .attr("x", function(d) {
    return x(d.calIntake) - 3;
  })
  .attr("y", margin + barHeight + barHeight / 2)
  .attr("dy", ".35em")
  .attr("fill", "white")
  .text(function(d) {
    console.log(d3.sum(data, function(d) {
      return d.calIntake;
    }))
    return d.calIntake;
  })
 // Add color Interaction
  .on("mouseover", function(d) {
    d3.select(this).attr("fill", "black");
  })
  .on("mouseout", function(d) {
    d3.select(this).attr("fill", "white");
  });
;;

bars
  .append("text")
  .attr("class", "label")
  .attr("x", -labelWidth)
  .attr("y", margin + barHeight + barHeight / 2)
  .attr("dy", ".35em")
  .text(function(d) {
    return "Day " + d.day;
  });

// Add Summary totals
totalTitle = chart
  .append("text")
  .attr("class","totalTitle")
  .attr("x", labelWidth)
  .attr("y", margin/4)
  .text("Overall Totals ")
 
  var burnTotals = chart
  .append("text")
  .attr("class","totalLabel")
  .attr("x", labelWidth * 1.5)
  .attr("y", margin/2)
  .text(function(d) {
    return "Caloric Burn: " + d3.sum(data, function(d) {
      return d.calBurn;
    });
  });

  var intakeTotals = chart
  .append("text")
  .attr("class","totalLabel")
  .attr("x", labelWidth*1.5)
  .attr("y", margin/2 + margin/4)
  .text(function(d) {
    return "Caloric Intake: " + d3.sum(data, function(d) {
      return d.calIntake;
    });
  });

// ** Update data section (Called from the onclick)
function updateData() {
  
    // Select the section we want to apply our changes to
    var svg = d3.select(burnTotals).transition();
    
    // Make the changes
      totalTitle.remove();
      burnTotals.remove();
      intakeTotals.remove();
}
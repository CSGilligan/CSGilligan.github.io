d3.csv('https://raw.githubusercontent.com/CSGilligan/baseball-parity-project/main/mlb_disparity_by_day.csv').then(function(data){
const margin = {top: 120, right: 40, bottom: 40, left: 40}
const width = 800 - margin.left - margin.right
const height = 600 - margin.top - margin.bottom
const parseTime = d3.timeParse("%m/%d")
const parseTime2 = d3.timeParse("Y")
   
   const yearScale = d3.scaleLinear()
                      .domain([1995, 2021])
                      .range([height, 0]) 
  
    const dayScale = d3.scaleTime()
          .domain(d3.extent(data, function(d) { 
        return new Date(d.date); 
      }))
          .range([0, width]) 

    //   var myColor = d3.scaleSequential()
    // .interpolator(d3.interpolateInferno)
    // .domain([22,0])
    
const colorScale = d3.scaleLinear()
  .domain([0, 4.15, 8.3, 12.45, 16.6])
  // .range(["#FCED8D", "#FF9F47", "#E04B25", "#7A0B0A", "#330024"])
  // .range(["#FF9855", "#FF7C58", "#D95247", "#A3243B", "#54032F"])
  // .range(["#B8D9C6", "#6AA695", "#347367", "#1C5359", "#193140"])
  // .range(["#010B40", "#03658C", "#D97218", "#A60303", "#730202"])
  // .range(["#FFFECC", "#FFE08B", "#FF9F5C", "#ED5030", "#700D23"])
  // .range(["#585A80", "#70876A", "#C2A867", "#A64C34", "#A33424"])
  // .range(["#FFDD7D", "#ACC978", "#66AD81", "#358C83", "#296A76"])
  .range(["#142F43", "#4F9691", "#E5E294", "#D46A4F", "#A63332"])

   const svg = d3.select('#chart')
                 .append('svg')
                 .attr('width', width + margin.left + margin.right)
                 .attr('height', height + margin.top + margin.bottom)
                 .append('g')
                 .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

data.forEach((d) => {
		d.datetime = parseTime(d.date);
  	})  
data=data.filter(function(d){ return d.deviation != "-"})
data=data.filter(function(d){ return d.deviation != "--"})
  
    const tooltip = d3.select("#chart")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  const dates = data.map((d) => d.datetime)
  dayScale.domain(d3.extent(dates))
  
  const yAxis = d3.axisLeft().scale(yearScale).ticks(35).tickFormat(d3.format("d"))

  
  svg.append('g').call(yAxis)
    .attr("class", "y_axis")
    .style('font-family', 'oxygen')
    .attr("transform", "translate(0, 8)")
  
  const xAxis = d3.axisTop().scale(dayScale).ticks(10)

  
  svg.append('g').call(xAxis)    
    .attr("class", "x_axis")
    .style('font-family', 'oxygen')
    .attr("transform", "translate(0, -4)")

   svg.selectAll('rect')
     .data(data)
     .enter()
     .append('rect')
     .attr('rx', 2)
     .attr('ry', 2)
     .attr('width', width/250)
     .attr('height', 16)
     .attr('fill', function(d) {
        return colorScale(d.deviation)
   })
     .attr('y', function(d) {
     console.log(yearScale(d.year))
        return yearScale(d.year)
   })
     .attr('x', function(d) {
        return dayScale(d.datetime)
   })
   .on("mouseover", function(event, d) {
    tooltip
      .html(d.date + '/' + d.year + ': ' + Math.round(d.deviation*10)/10)
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  })
   .on("mouseleave", function(d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
  })
  
  svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 40 - (margin.top))
        .attr("text-anchor", "middle")  
        .style("font-size", "24px") 
        .text("Major League Baseball's Parity Problem")
        .attr("font-family", "oxygen")
  
    svg.append("text")
        .attr("x", 0 - (margin.left / 2))         
        .attr("y", 0 - (margin.top / 3))
        .attr("text-anchor", "left")  
        .style("font-size", "11px") 
        .text("After the most recent complete season in 2019, MLB win totals had a standard deviation of 16.6, 14% higher than ever before in the post-strike era.")
        .attr("font-family", "oxygen")

})
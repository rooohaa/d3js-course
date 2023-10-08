console.log("SVG Understanding!");

// Task: draw simple bar chart from json data using svg, rect
let buildings = [];

d3.json("./data/buildings.json").then((data) => {
  buildings = data.map((item) => ({ ...item, height: +item.height }));
  drawChart();
});

function drawChart() {
  const y = d3.scaleLinear().domain([0, 828]).range([0, 400]);

  const svg = d3
    .select("#app")
    .append("svg")
    .attr("width", 600)
    .attr("height", 400)
    .style("border", "1px solid #333");

  svg
    .selectAll("rect")
    .data(buildings)
    .enter()
    .append("rect")
    .attr("width", 35)
    .attr("height", (item) => y(item.height))
    .attr("fill", "gray")
    .attr("x", (_, idx) => 50 * idx);
}

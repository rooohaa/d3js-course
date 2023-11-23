console.log("SVG Understanding!");

// Task: draw simple bar chart from json data using svg, rect
let buildings = [];

d3.json("./data/buildings.json").then((data) => {
  buildings = data.map((item) => ({ ...item, height: +item.height }));
  drawChart();
});

const MARGIN = { LEFT: 80, RIGHT: 10, TOP: 10, BOTTOM: 80 };
const SVG_WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
const SVG_HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

function drawChart() {
  const svg = d3
    .select("#app")
    .append("svg")
    .attr("width", SVG_WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    .attr("height", SVG_HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(buildings, (item) => item.height)])
    .range([SVG_HEIGHT, 0]);

  const x = d3
    .scaleBand()
    .domain(buildings.map((b) => b.name))
    .range([0, SVG_WIDTH])
    .paddingInner(0.3)
    .paddingOuter(0.4);

  // Group for margins
  const g = svg
    .append("g")
    .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

  // X Axis label
  g.append("text")
    .attr("class", "x-axis-label")
    .attr("x", SVG_WIDTH / 2)
    .attr("y", SVG_HEIGHT + 70)
    .attr("font-size", "18px")
    .attr("text-anchor", "middle")
    .text("The world's tallest buildings");

  // Y Axis label
  g.append("text")
    .attr("class", "y-axis-label")
    .attr("x", -(SVG_HEIGHT / 2))
    .attr("y", -60)
    .attr("transform", "rotate(-90)")
    .attr("font-size", "18px")
    .attr("text-anchor", "middle")
    .text("Height (m)");

  // X axis
  const xAxisCall = d3.axisBottom(x);
  g.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${SVG_HEIGHT})`)
    .call(xAxisCall)
    .selectAll("text")
    .attr("y", 20)
    .attr("transform", "rotate(-10)");

  // Y axis
  const yAxisCall = d3
    .axisLeft(y)
    .ticks(4)
    .tickFormat((d) => d + "m");
  g.append("g").attr("class", "y-axis").call(yAxisCall);

  // Render bars
  g.selectAll("rect")
    .data(buildings)
    .enter()
    .append("rect")
    .attr("x", (item) => x(item.name))
    .attr("y", (item) => y(item.height))
    .attr("width", x.bandwidth)
    .attr("height", (item) => SVG_HEIGHT - y(item.height))
    .attr("fill", "gray");
}

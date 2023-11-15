/*
 *    index.js
 *    Mastering Data Visualization with D3.js
 *    Project 1 - Star Break Coffee
 */

console.log("Star Break Coffee");

let revenuesData;

let svg = d3
  .select("#svg-area")
  .append("svg")
  .attr("width", 800)
  .attr("height", 400);

document.addEventListener("DOMContentLoaded", () => {
  loadData().then(() => {
    // Render bar chart
    console.log(revenuesData);
  });
});

/* Data loading from CSV file */
function loadData() {
  return d3.csv("./data/revenues.csv").then((data) => {
    revenuesData = data.map(({ month, revenue, profit }) => ({
      month,
      revenue: Number(revenue),
      profit: Number(profit),
    }));
  });
}

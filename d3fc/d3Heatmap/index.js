d3.csv("PROCESSED - BeltThickness.csv", type).then((data) => {
  console.log("New Data Incoming");
  const container = document.querySelector("d3fc-canvas");

  // Here we use band scales to demonstrate that the autoBandwidth component
  // is able to obtain the bandwidth from the scale
  const xScale = d3.scaleBand().domain(d3.range(0, 500));

  const yScale = d3.scaleBand().domain(d3.range(1, 50));

  const series = fc
    .autoBandwidth(fc.seriesCanvasHeatmap())
    .xValue((d) => d.n)
    .yValue((d) => d.sensor1)
    .colorValue((d) => d.n)
    .xScale(xScale)
    .yScale(yScale)
    // The band scales require different alignments
    .xAlign("left")
    .yAlign("top")
    .widthFraction(1.0);

  const series2 = fc
    .autoBandwidth(fc.seriesCanvasHeatmap())
    .xValue((d) => d.n)
    .yValue((d) => d.sensor2)
    .colorValue((d) => d.sensor2)
    .xScale(xScale)
    .yScale(yScale)
    // The band scales require different alignments
    .xAlign("left")
    .yAlign("top")
    .widthFraction(1.0);

  const series3 = fc
    .autoBandwidth(fc.seriesCanvasHeatmap())
    .xValue((d) => d.n)
    .yValue((d) => d.sensor3)
    .colorValue((d) => d.sensor3)
    .xScale(xScale)
    .yScale(yScale)
    // The band scales require different alignments
    .xAlign("left")
    .yAlign("top")
    .widthFraction(1.0);

  d3.select(container)
    .on("draw", () => {
      series(data);
    })
    .on("measure", (event) => {
      const { width, height } = event.detail;
      xScale.range([0, width]);
      yScale.range([height, 0]);

      const ctx = container.querySelector("canvas").getContext("2d");
      series.context(ctx);
      series2.context(ctx);
      series3.context(ctx);
    });

  container.requestRedraw();
});

function type(d) {
  // d.count = Number(d.count);
  // d.day = Number(d.day);
  // d.hour = Number(d.hour);

  // New fields
  d.n = Number(d.n);
  d.sensor1 = Number(d.sensor1);
  d.sensor2 = Number(d.sensor2);
  d.sensor3 = Number(d.sensor3);
  d.sensor4 = Number(d.sensor4);
  d.sensor5 = Number(d.sensor5);
  d.sensor6 = Number(d.sensor6);
  d.sensor7 = Number(d.sensor7);
  d.sensor8 = Number(d.sensor8);
  d.sensor9 = Number(d.sensor9);
  d.sensor10 = Number(d.sensor10);
  return d;
}

// // a random number generator
// const generator = fc.randomGeometricBrownianMotion().steps(11);

// // some formatters
// const dateFormatter = d3.timeFormat("%b");
// const valueFormatter = d3.format("$.0f");

// const yExtent = fc
//   .extentLinear()
//   .include([0])
//   .pad([0, 0.5])
//   .accessors([(d) => d.sales]);

// const data = {
//   // target values for the annotations
//   targets: [
//     {
//       name: "low",
//       value: 4.5,
//     },
//     {
//       name: "high",
//       value: 7.2,
//     },
//   ],
//   // randomly generated sales data
//   sales: generator(1).map((d, i) => ({
//     month: dateFormatter(new Date(0, i + 1, 0)),
//     sales: d + i / 2,
//   })),
// };

// const chart = fc
//   .chartCartesian(d3.scaleBand(), d3.scaleLinear())
//   .chartLabel("2015 Cumulative Sales")
//   .xDomain(data.sales.map((d) => d.month))
//   .yDomain(yExtent(data.sales))
//   .xPadding(0.2)
//   .yTicks(5)
//   .yTickFormat(valueFormatter)
//   .yLabel("Sales (millions)")
//   .yNice();

// const bar = fc
//   .autoBandwidth(fc.seriesSvgBar())
//   .crossValue((d) => d.month)
//   .mainValue((d) => d.sales)
//   .align("left")
//   .decorate((selection) => {
//     // The selection passed to decorate is the one which the component creates
//     // within its internal data join, here we use the update selection to
//     // apply a style to 'path' elements created by the bar series
//     selection
//       .select(".bar > path")
//       .style("fill", (d) =>
//         d.sales < data.targets[0].value ? "inherit" : "#0c0"
//       );
//   });

// const annotation = fc
//   .annotationSvgLine()
//   .value((d) => d.value)
//   .decorate((selection) => {
//     selection
//       .enter()
//       .select("g.left-handle")
//       .append("text")
//       .attr("x", 5)
//       .attr("y", -5);
//     selection
//       .select("g.left-handle text")
//       .text((d) => d.name + " - " + valueFormatter(d.value) + "M");
//   });

// const multi = fc
//   .seriesSvgMulti()
//   .series([bar, annotation])
//   .mapping((data, index, series) => {
//     switch (series[index]) {
//       case bar:
//         return data.sales;
//       case annotation:
//         return data.targets;
//     }
//   });

// chart.svgPlotArea(multi);

// d3.select("#chart").datum(data).call(chart);

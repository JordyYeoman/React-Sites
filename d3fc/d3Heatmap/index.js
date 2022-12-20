d3.csv("PROCESSED - BeltThickness.csv", type).then((data) => {
  console.log("New Data Incoming");
  const container = document.querySelector("d3fc-canvas");

  // Here we use band scales to demonstrate that the autoBandwidth component
  // is able to obtain the bandwidth from the scale
  const xScale = d3.scaleBand().domain(d3.range(0, 50));

  const yScale = d3.scaleBand().domain(d3.range(0, 50));

  const series = fc
    .autoBandwidth(fc.seriesCanvasHeatmap())
    .xValue((d) => d.n)
    .yValue((d) => d.sensor4)
    .colorValue((d) => d.n)
    .xScale(xScale)
    .yScale(yScale)
    // The band scales require different alignments
    .xAlign("right")
    .yAlign("top");
  // .widthFraction(1.0);

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

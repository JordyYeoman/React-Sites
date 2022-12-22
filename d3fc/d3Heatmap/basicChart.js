// const width = 820;
// const height = 384;

console.log("System starting....");

const pointSeries = fc
  .seriesWebglPoint()
  .crossValue((d) => d.iteration)
  .mainValue((d) => d.reading)
  .size(20)
  .decorate((program) => {
    fc.symbolsFill().color([1, 0, 0, 1])(program);
    fc.pointAntiAlias()(program);

    const gl = program.context();
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(
      gl.SRC_ALPHA,
      gl.ONE_MINUS_DST_ALPHA,
      gl.ONE,
      gl.ONE_MINUS_SRC_ALPHA
    );
  });

const xExtent = fc.extentLinear().accessors([(d) => d.iteration]);
// .pad([0, 0.01]);
const yExtent = fc.extentLinear().accessors([(d) => d.reading]);

d3.csv("testFormat.csv", type).then((data) => {
  const xScale = d3.scaleLinear().domain(xExtent(data));
  const xScaleCopy = xScale.copy();
  const yScale = d3.scaleLinear().domain(yExtent(data));
  const yScaleCopy = yScale.copy();

  // const zoom = d3
  //   .zoom()
  //   .extent([
  //     [0, 0],
  //     [width, height],
  //   ])
  //   .scaleExtent([1, 10])
  //   .translateExtent([
  //     [0, 0],
  //     [width, height],
  //   ])
  //   .on("zoom", () => {
  //     xScale.domain(d3.event.transform.rescaleX(xScaleCopy).domain());
  //     yScale.domain(d3.event.transform.rescaleY(yScaleCopy).domain());
  //     d3.select("d3fc-group").node().requestRedraw();
  //   });

  // const decorate = (selection) => {
  //   selection
  //     .enter()
  //     .select(".plot-area")
  //     .on("measure.range", () => {
  //       xScaleCopy.range([0, d3.event.detail.width]);
  //       yScaleCopy.range([d3.event.detail.height, 0]);
  //     });
  //   .call(zoom);
  // };

  const chart = fc
    .chartCartesian(xScale, yScale)
    .webglPlotArea(pointSeries)
    .xLabel("Iteration")
    .yLabel("Reading");
  // .yTickFormat(d3.format(".3s"))
  // .decorate(decorate); // Remove zoom decoration for now to improve rendering performance

  d3.select("#chart").datum(data).call(chart);
});

function type(d) {
  d.sensor = Number(d.sensor);
  d.reading = Number(d.reading);
  d.iteration = Number(d.iteration);
  return d;
}

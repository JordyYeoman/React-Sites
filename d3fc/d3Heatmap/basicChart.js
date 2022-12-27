// const width = 820;
// const height = 384;

console.log('System starting....');

const xExtent = fc.extentLinear().accessors([(d) => d.iteration]);
// .pad([0, 0.01]);
const yExtent = fc.extentLinear().accessors([(d) => d.reading]);

d3.csv('./utils/PROCESSED_BeltThickness.csv', type).then((data) => {
  // Find domain values
  const minValue = d3.min(data, (d) => d.reading);
  const maxValue = d3.max(data, (d) => d.reading);

  // Generate a color scale
  const colorScale = d3
    .scaleSequential(fc.interpolateRgb)
    .domain([minValue, maxValue]);

  const xScale = d3.scaleLinear().domain(xExtent(data));
  const xScaleCopy = xScale.copy();
  const yScale = d3.scaleLinear().domain(yExtent(data));
  const yScaleCopy = yScale.copy();

  const pointSeries = fc
    .seriesWebglPoint()
    .crossValue((d) => d.iteration)
    .mainValue((d) => d.reading)
    .size(20)
    .decorate((program) => {
      fc.pointFill().color((d) => colorScale(d.reading))(program);
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

  const chart = fc
    .chartCartesian(xScale, yScale)
    .webglPlotArea(pointSeries)
    .xLabel('Iteration')
    .yLabel('Reading');
  // .yTickFormat(d3.format(".3s"))
  // .decorate(decorate); // Remove zoom decoration for now to improve rendering performance

  d3.select('#chart').datum(data).call(chart);
});

function type(d) {
  d.sensor = Number(d.sensor);
  d.reading = Number(d.reading);
  d.iteration = Number(d.iteration);
  return d;
}

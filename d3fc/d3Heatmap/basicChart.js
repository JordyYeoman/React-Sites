// const width = 820;
// const height = 384;

// Examples of color
// Full blue color with 50% opacity
// fc.pointFill().color([0, 0, 1, 0.5])(program);

// Full green color with 75% opacity
// fc.pointFill().color([0, 1, 0, 0.75])(program);

// Full yellow color with 100% opacity
// fc.pointFill().color([1, 1, 0, 1])(program);

console.log('System starting....');

const xExtent = fc
  .extentLinear()
  .accessors([(d) => d.iteration])
  .pad([0.001, 0.001]);
const yExtent = fc.extentLinear().accessors([(d) => d.reading]);

d3.csv('./utils/PROCESSED_BeltThickness.csv', type).then((data) => {
  // Find domain values
  const minValue = d3.min(data, (d) => d.reading);
  const maxValue = d3.max(data, (d) => d.reading);

  // const colorScale = (d) => {
  //   console.log('data: ', d);
  //   const color = d3.hsl(Math.random() * 360, 0.5, 0.5);
  //   console.log(color);
  //   return color;
  // };
  const colorScale = d3
    .scaleSequential(fc.interpolateRgb)
    .domain([minValue, maxValue]);

  const xScale = d3.scaleLinear().domain(xExtent(data));
  // Hardcoded value to set the x-range and add padding
  // const xScale = d3.scaleLinear().domain([0, 250]);
  const yScale = d3.scaleLinear().domain(yExtent(data));
  // const yScale = d3.scaleLinear().domain([20, 25]);

  const getRandomColor = () => {
    return [Math.random(), Math.random(), Math.random(), Math.random()];
  };

  const pointSeries = fc
    .seriesWebglPoint()
    .crossValue((d) => d.iteration)
    .mainValue((d) => d.reading)
    .size(20)
    .decorate((program) => {
      // fc.pointFill().color(getRandomColor())(program);
      // fc.pointFill().color([0, 0, 1, 0.5])(program);
      console.log('Calling pointFill bra');
      // fc.pointFill((d) => colorScale(d.reading))(program);
      // fc.pointFill((d) => colorScale(d.reading))(program);
      console.log('End pointfill');

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

  d3.select('#chart').datum(data).call(chart);
});

function type(d) {
  d.sensor = Number(d.sensor);
  d.reading = Number(d.reading);
  d.iteration = Number(d.iteration);
  return d;
}

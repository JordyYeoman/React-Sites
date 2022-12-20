const width = 820;
const height = 384;

const color = d3.scaleOrdinal(d3.schemeCategory10);

const pointSeries = fc
  .seriesWebglPoint()
  .crossValue((d) => d.group)
  .mainValue((d) => d.variable)
  .size(4)
  .decorate((program) => {
    fc.pointFill().color([1, 0, 10, 1])(program);
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

const xExtent = fc
  .extentLinear()
  .accessors([(d) => d.group])
  .pad([0.1, 0.1]);
const yExtent = fc.extentLinear().accessors([(d) => d.variable]);

d3.tsv("basicHeatmapData.csv", type).then((data) => {
  const xScale = d3.scaleLinear().domain(xExtent(data));
  const xScaleCopy = xScale.copy();
  const yScale = d3.scaleLinear().domain(yExtent(data));
  const yScaleCopy = yScale.copy();

  const zoom = d3
    .zoom()
    .extent([
      [0, 0],
      [width, height],
    ])
    .scaleExtent([1, 10])
    .translateExtent([
      [0, 0],
      [width, height],
    ])
    .on("zoom", () => {
      xScale.domain(d3.event.transform.rescaleX(xScaleCopy).domain());
      yScale.domain(d3.event.transform.rescaleY(yScaleCopy).domain());
      d3.select("d3fc-group").node().requestRedraw();
    });

  const decorate = (selection) => {
    selection
      .enter()
      .select(".plot-area")
      .on("measure.range", () => {
        xScaleCopy.range([0, d3.event.detail.width]);
        yScaleCopy.range([d3.event.detail.height, 0]);
      })
      .call(zoom);
  };

  const chart = fc
    .chartCartesian(xScale, yScale)
    .webglPlotArea(pointSeries)
    .xLabel("Count")
    .yLabel("Sensor Value")
    .yTickFormat(d3.format(".3s"))
    .decorate(decorate);

  d3.select("#chart").datum(data).call(chart);
});

function type(d) {
  d.group = Number(d.group);
  d.variable = Number(d.variable);
  d.value = Number(d.value);
  return d;
}

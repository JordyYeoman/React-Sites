// Set up webworker to calculate data.
const worker = new Worker("worker.js");
const dataWorker = new Worker("dataWorker.js");

// Global testing setup
const dataPoints = 1000;

dataWorker.onmessage = (e) => {
  const data = e.data;
  console.log("data", data);
  const stackedData = d3.stack().keys(["sensor"]).offset(d3.stackOffsetNone)(
    data
  );
  console.log("stacked data: ", stackedData);

  const xScale = d3.scaleLinear().domain([0, 100]);
  const yScale = d3.scaleLinear().domain([0, 30]);

  const crossValue = (d) => d.count;
  const mainValue = (d) => d.distance;

  const areaSeries = fc
    .seriesWebglArea()
    .mainValue(mainValue)
    .crossValue(crossValue)
    .defined(() => true)
    .equals((d) => d.length)
    .decorate((program) => {
      program.vertexShader().appendHeader(`varying lowp vec4 vColor;`)
        .appendBody(`
            float colourModifier = smoothstep(50.0, 400.0, aMainValue);
            vColor = mix(vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), colourModifier);
            vColor = mix(vColor, vec4(1.0, 0.5, 0.0, 1.0), colourModifier);
            vColor = mix(vColor, vec4(1.0, 0.0, 0.0, 1.0), colourModifier);
            float verticalFade = max(0.0, smoothstep(-1.1, -0.9, gl_Position.y) - 0.15);
            vColor.a = vColor.a * verticalFade;
        `);
      program.fragmentShader().appendHeader(`
            varying lowp vec4 vColor;
        `).appendBody(`
            gl_FragColor = vColor;
        `);
    });

  const lineSeries = fc
    .seriesWebglLine()
    .mainValue(mainValue)
    .crossValue(crossValue)
    .defined(() => true)
    .equals((d) => d.length)
    .lineWidth(2)
    .decorate((program) => {
      program.vertexShader().appendHeader(`varying lowp vec4 vColor;`)
        .appendBody(`
                    float colourModifier = smoothstep(-0.875, 1.0, gl_Position.y);
                    vColor = mix(vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), colourModifier);
                    vColor = mix(vColor, vec4(1.0, 0.5, 0.0, 1.0), colourModifier);
                    vColor = mix(vColor, vec4(1.0, 0.0, 0.0, 1.0), colourModifier);
                    `);
      program.fragmentShader().appendHeader(`varying lowp vec4 vColor;`)
        .appendBody(`
                    gl_FragColor = vColor;
            `);
    });

  const multiSeries = fc.seriesWebglMulti().series([areaSeries]);

  const zoom = fc.zoom().on("zoom", render);

  const chart = fc
    .chartCartesian(xScale, yScale)
    .yOrient("left")
    .chartLabel("The distance between Earth and Mars over time")
    .xLabel("Year")
    .yLabel("Distance (million Km)")
    .webglPlotArea(multiSeries)
    .decorate((selection) => {
      selection.enter().select(".plot-area").call(zoom, xScale);
    });

  function render() {
    d3.select("#chart").datum(data).call(chart);
  }

  render();
};
dataWorker.postMessage({ numPoints: dataPoints });

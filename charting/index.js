// Set up webworker to calculate data.
const worker = new Worker("worker.js");
const dataWorker = new Worker("dataWorker.js");
worker.onmessage = (e) => {
  const data = e.data;

  // Draw chart.
  const xScale = d3.scaleTime().domain([data[0].date, data[1000].date]);
  const yScale = d3.scaleLinear().domain([0, 400]);

  const crossValue = (d) => d.date;
  const mainValue = (d) => d.distance;

  // vColor = (vec4(0.55, 0.65, 0.75, 1) * colourModifier) + ((1.0 - colourModifier) * vec4(0.75, 0.45, 0.45, 1));

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
            vColor = mix(vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), colourModifier);
            float verticalFade = max(0.0, smoothstep(-1.1, -0.9, gl_Position.y) - 0.15);
            vColor.a = vColor.a * verticalFade;
        `);
      program.fragmentShader().appendHeader(`
            varying lowp vec4 vColor;
        `).appendBody(`
            gl_FragColor = vColor;
        `);
    });

  //vColor = (vec4(0.55, 0.65, 0.75, 1) * colourModifier) + ((1.0 - colourModifier) * vec4(0.75, 0.45, 0.45, 1));`

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
                    vColor = mix(vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), colourModifier);
                    `);
      program.fragmentShader().appendHeader(`varying lowp vec4 vColor;`)
        .appendBody(`
                    gl_FragColor = vColor;
            `);
    });

  const multiSeries = fc.seriesWebglMulti().series([areaSeries, lineSeries]);

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
worker.postMessage({ numPoints: 1000000 });

// Testing
dataWorker.onmessage = (e) => {
  console.log("Event recieved from worker", e.data);
};

setInterval(() => {
  dataWorker.postMessage({ msg: "SEND IT" });
}, 1500);

window.addEventListener("load", () => {
  // Set up webworker to calculate data.
  const dataWorker = new Worker("dataWorker.js");

  // Global testing setup
  const dataPoints = 100000;

  dataWorker.onmessage = (e) => {
    const { data } = e;
    // console.log("data", data);

    const xScale = d3.scaleLinear().domain([0, 100]);
    const yScale = d3.scaleLinear().domain([0, 10]);

    const getColor = (sensor1) => {
      const minSensor1 = 0; // minimum sensor1 value
      const maxSensor1 = 30; // maximum sensor1 value

      if (minSensor1 >= maxSensor1) {
        console.error("Invalid sensor1 range");
        return "rgba(0, 0, 0, 1)";
      }

      // Normalize the sensor1 value between 0 and 1
      const normalizedSensor1 =
        (sensor1 - minSensor1) / (maxSensor1 - minSensor1);
      const r = normalizedSensor1;
      const g = 1 - normalizedSensor1;

      // Normalize the opacity value between 0 and 1
      const minOpacity = 0.5; // minimum opacity value
      const maxOpacity = 1; // maximum opacity value
      const normalizedOpacity =
        (sensor1 - minOpacity) / (maxOpacity - minOpacity);
      const opacity = normalizedOpacity.toFixed(2); // Round to 2 decimal places
      // return `rgba(${r}, ${g}, 0, ${opacity})`;
      // TODO - Fix opacity override
      return { r, g, b: 0, opacity: 1 };
    };

    const series1 = fc
      .seriesWebglBar()
      .defined(() => true)
      .equals((d) => d.length)
      .crossValue((d) => d.count)
      .mainValue((d) => 1)
      .baseValue(0)
      .decorate((program, d) => {
        // Initialize the program object
        program.vertexShader().appendHeader(`
        varying lowp vec4 vColor;
      `).appendBody(`
        vColor = vec4(1, 1, 1, 1);
      `);
        program.fragmentShader().appendHeader(`
        varying lowp vec4 vColor;
      `).appendBody(`
        gl_FragColor = vColor;
      `);

        // Calculate the color for each bar in the series
        d.forEach((z, i) => {
          const { r, g, b, opacity } = getColor(z.sensor1);
          // console.log("r", r, "g", g, "b", b, "opacity", opacity);

          // Set the color of the bar using the calculated color
          program
            .vertexShader()
            .appendBody(`vColor = vec4(${r}, ${g}, ${b}, ${opacity});`);
        });
      });

    const series2 = fc
      .seriesWebglBar()
      .defined(() => true)
      .equals((d) => d.length)
      .crossValue((d) => d.count)
      .mainValue(2)
      .baseValue(1)
      .decorate((program, d) => {
        // Initialize the program object
        program.vertexShader().appendHeader(`
        varying lowp vec4 vColor;
      `).appendBody(`
        vColor = vec4(1, 1, 1, 1);
      `);
        program.fragmentShader().appendHeader(`
        varying lowp vec4 vColor;
      `).appendBody(`
        gl_FragColor = vColor;
      `);

        // Calculate the color for each bar in the series
        d.forEach((z, i) => {
          const { r, g, b, opacity } = getColor(z.sensor2);
          // console.log("r", r, "g", g, "b", b, "opacity", opacity);

          // Set the color of the bar using the calculated color
          program
            .vertexShader()
            .appendBody(`vColor = vec4(${r}, ${g}, ${b}, ${opacity});`);
        });
      });

    const series3 = fc
      .seriesWebglBar()
      .defined(() => true)
      .equals((d) => d.length)
      .crossValue((d) => d.count)
      .mainValue(3)
      .baseValue(2)
      .decorate((program, d) => {
        // Initialize the program object
        program.vertexShader().appendHeader(`
        varying lowp vec4 vColor;
      `).appendBody(`
        vColor = vec4(1, 1, 1, 1);
      `);
        program.fragmentShader().appendHeader(`
        varying lowp vec4 vColor;
      `).appendBody(`
        gl_FragColor = vColor;
      `);

        // Calculate the color for each bar in the series
        d.forEach((z, i) => {
          const { r, g, b, opacity } = getColor(z.sensor3);
          // console.log("r", r, "g", g, "b", b, "opacity", opacity);

          // Set the color of the bar using the calculated color
          program
            .vertexShader()
            .appendBody(`vColor = vec4(${r}, ${g}, ${b}, ${opacity});`);
        });
      });

    const series4 = fc
      .seriesWebglBar()
      .defined(() => true)
      .equals((d) => d.length)
      .crossValue((d) => d.count)
      .mainValue(4)
      .baseValue(3)
      .decorate((program, d) => {
        // Initialize the program object
        program.vertexShader().appendHeader(`
        varying lowp vec4 vColor;
      `).appendBody(`
        vColor = vec4(1, 1, 1, 1);
      `);
        program.fragmentShader().appendHeader(`
        varying lowp vec4 vColor;
      `).appendBody(`
        gl_FragColor = vColor;
      `);

        // Calculate the color for each bar in the series
        d.forEach((z, i) => {
          const { r, g, b, opacity } = getColor(z.sensor4);
          // console.log("r", r, "g", g, "b", b, "opacity", opacity);

          // Set the color of the bar using the calculated color
          program
            .vertexShader()
            .appendBody(`vColor = vec4(${r}, ${g}, ${b}, ${opacity});`);
        });
      });
    const series5 = fc
      .seriesWebglBar()
      .defined(() => true)
      .equals((d) => d.length)
      .crossValue((d) => d.count)
      .mainValue(5)
      .baseValue(4)
      .decorate((program, d) => {
        // Initialize the program object
        program.vertexShader().appendHeader(`
        varying lowp vec4 vColor;
      `).appendBody(`
        vColor = vec4(1, 1, 1, 1);
      `);
        program.fragmentShader().appendHeader(`
        varying lowp vec4 vColor;
      `).appendBody(`
        gl_FragColor = vColor;
      `);

        // Calculate the color for each bar in the series
        d.forEach((z, i) => {
          const { r, g, b, opacity } = getColor(z.sensor5);
          // console.log("r", r, "g", g, "b", b, "opacity", opacity);

          // Set the color of the bar using the calculated color
          program
            .vertexShader()
            .appendBody(`vColor = vec4(${r}, ${g}, ${b}, ${opacity});`);
        });
      });
    const multiSeries = fc
      .seriesWebglMulti()
      .series([series5, series4, series3, series2, series1]);

    const zoom = fc.zoom().on("zoom", render);

    const chart = fc
      .chartCartesian(xScale, yScale)
      .yOrient("left")
      .chartLabel("Belt sensor readings over time")
      .xLabel("Metres of belt")
      .yLabel("Sensor")
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
});

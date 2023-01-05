window.addEventListener("load", () => {
  const getColorForVal = (val) => {
    if (typeof val !== "number") return "#ffffff";

    // Red - Belt is significantly worn
    if (val <= 19) {
      return "#ff0707";
    }
    // Orange - Belt has a decent amount of wear
    if (val <= 20.75) {
      return "#ff6007";
    }
    // Yellow - Mild wear on belt
    if (val <= 21.5) {
      return "#ffe607";
    }
    // Green - Belt is in good condition
    if (val > 23) {
      return "#74ff07";
    }
    // Fail case - Return white
    return "#ffffff";
  };

  function type(d) {
    d.Iteration = Number(d.Iteration).toString();
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

  // Read data from CSV
  d3.csv("./utils/PROCESSED_V2_BeltThickness.csv", type).then((dataV2) => {
    const data = [...dataV2];

    // Run chart
    const stack = d3
      .stack()
      .keys(Object.keys(data[0]).filter((k) => k !== "Iteration"));
    const series = stack(data);

    const container = document.querySelector("d3fc-canvas");

    const xScale = d3
      .scalePoint()
      .domain(data.map((d) => d.Iteration))
      .padding(0.5);

    const yExtent = fc
      .extentLinear()
      .accessors([(a) => a.map((d) => d[1])])
      .include([0]);

    const yScale = d3.scaleLinear().domain(yExtent(series));

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const colorScale = d3
      .scaleLinear()
      .domain([0, 30])
      .range(["#ffffff", "#000000"]); // range of colors to use in the gradient

    const barSeries = fc
      .seriesWebglBar()
      .xScale(xScale)
      .yScale(yScale)
      .crossValue((d) => d.data.Iteration)
      .mainValue((d) => d[1])
      .baseValue((d) => d[0]);

    let pixels = null;
    let frame = 0;
    let gl = null;

    d3.select(container)
      .on("measure", (event) => {
        const { width, height } = event.detail;
        xScale.range([0, width]);
        yScale.range([height, 0]);

        gl = container.querySelector("canvas").getContext("webgl");
        barSeries.context(gl);
      })
      .on("draw", () => {
        if (pixels == null) {
          pixels = new Uint8Array(
            gl.drawingBufferWidth * gl.drawingBufferHeight * 4
          );
        }
        performance.mark(`draw-start-${frame}`);
        series.forEach((s, i) => {
          barSeries.decorate((program) => {
            fc
              .webglFillColor()
              .value((x) => {
                console.log("x[`sensor${i}`]", x[`sensor${i}`]);
                const sensorValue = x[`sensor${i}`];
                if (!sensorValue) return [255, 255, 0, 1];
                // console.log("sensorValue", sensorValue);
                let colorValue2 = getColorForVal(sensorValue);
                const colorValue = colorScale(sensorValue);
                // console.log(
                //   "sensor value",
                //   sensorValue,
                //   "Color Value: ",
                //   colorValue
                // );
                let { r, g, b, opacity } = d3.color(colorValue2);
                opacity = 0.8;
                return [r / 255, g / 255, b / 255, opacity];
              })
              .data(data)(program);
          })(s);
        });

        // Force GPU to complete rendering to allow accurate performance measurements to be taken
        gl.readPixels(
          0,
          0,
          gl.drawingBufferWidth,
          gl.drawingBufferHeight,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          pixels
        );
        performance.measure(`draw-duration-${frame}`, `draw-start-${frame}`);
        const duration = performance.measure(
          `draw-duration-${frame}`,
          `draw-start-${frame}`
        );
        console.log(`Duration: ${duration.duration} milliseconds`);
        frame++;
      });

    container.requestRedraw();
  });
});

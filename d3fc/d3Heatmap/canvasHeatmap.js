window.addEventListener("load", () => {
  // d3.csv("./utils/data2.csv", type).then((data) => {
  const getColorForVal = (val) => {
    if (typeof val !== "number") return "#ffffff";

    // Red - Belt is significantly worn
    if (val <= 20.5) {
      return "#ff0707";
    }
    // Orange - Belt has a decent amount of wear
    if (val <= 21.25) {
      return "#ff6007";
    }
    // Yellow - Mild wear on belt
    if (val <= 21.75) {
      return "#ffe607";
    }
    // Green - Belt is in good condition
    if (val > 21.9) {
      // return "#74ff07";
      return "green";
    }
    // Fail case - Return white
    return "#ffffff";
  };

  d3.csv("./utils/PROCESSED_BeltThickness.csv", type).then((data) => {
    const container = document.querySelector("d3fc-canvas");
    console.log("data", data);

    // Here we use band scales to demonstrate that the autoBandwidth component
    // is able to obtain the bandwidth from the scale
    const xScale = d3.scaleBand().domain(d3.range(1, 2000));

    const yScale = d3.scaleBand().domain(d3.range(1, 10));

    const xAxis = fc.axisBottom().scale(xScale);

    const yAxis = fc.axisLeft().scale(yScale);

    const series = fc
      .autoBandwidth(
        fc.seriesCanvasHeatmap({
          xAxis: {
            bottom: (xAxis) => customAxis(fc.axisBottom(xAxis), true),
          },
          xLabel: "Value",
        })
      )
      .xValue((d) => d.count)
      .yValue((d) => d.day)
      .colorValue((d) => d.hour)
      .xScale(xScale)
      .yScale(yScale)
      // The band scales require different alignments
      .xAlign("right")
      .yAlign("top")
      .widthFraction(10.01)
      .decorate((context, data, index) => {
        context.fillStyle = getColorForVal(data.hour);
      });

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
    d.count = Number(d.count);
    d.day = Number(d.day);
    d.hour = Number(d.hour);
    return d;
  }

  // ...
});

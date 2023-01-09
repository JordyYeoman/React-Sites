window.addEventListener("load", () => {
  // Set up webworker to calculate data.
  const dataWorker = new Worker("dataWorker.js");

  // Global testing setup
  const dataPoints = 1000;

  dataWorker.onmessage = (e) => {
    //   const data = e.data;
    const data = [
      {
        count: 1,
        sensor1: 10,
        sensor2: 5,
        sensor3: 8,
        sensor4: 12,
        sensor5: 15,
      },
      {
        count: 2,
        sensor1: 15,
        sensor2: 10,
        sensor3: 12,
        sensor4: 18,
        sensor5: 22,
      },
      {
        count: 3,
        sensor1: 20,
        sensor2: 15,
        sensor3: 16,
        sensor4: 24,
        sensor5: 30,
      },
      {
        count: 4,
        sensor1: 25,
        sensor2: 20,
        sensor3: 20,
        sensor4: 30,
        sensor5: 37,
      },
      {
        count: 5,
        sensor1: 30,
        sensor2: 25,
        sensor3: 24,
        sensor4: 36,
        sensor5: 45,
      },
      {
        count: 6,
        sensor1: 35,
        sensor2: 30,
        sensor3: 28,
        sensor4: 42,
        sensor5: 52,
      },
      {
        count: 7,
        sensor1: 40,
        sensor2: 35,
        sensor3: 32,
        sensor4: 48,
        sensor5: 60,
      },
      {
        count: 8,
        sensor1: 45,
        sensor2: 40,
        sensor3: 36,
        sensor4: 54,
        sensor5: 67,
      },
      {
        count: 9,
        sensor1: 50,
        sensor2: 45,
        sensor3: 40,
        sensor4: 60,
        sensor5: 75,
      },
      {
        count: 10,
        sensor1: 55,
        sensor2: 50,
        sensor3: 44,
        sensor4: 66,
        sensor5: 82,
      },
      {
        count: 11,
        sensor1: 60,
        sensor2: 55,
        sensor3: 48,
        sensor4: 72,
        sensor5: 90,
      },
      {
        count: 12,
        sensor1: 65,
        sensor2: 60,
        sensor3: 52,
        sensor4: 78,
        sensor5: 97,
      },
      {
        count: 13,
        sensor1: 70,
        sensor2: 65,
        sensor3: 56,
        sensor4: 84,
        sensor5: 105,
      },
      {
        count: 14,
        sensor1: 75,
        sensor2: 70,
        sensor3: 60,
        sensor4: 90,
        sensor5: 112,
      },
      {
        count: 15,
        sensor1: 80,
        sensor2: 75,
        sensor3: 64,
        sensor4: 96,
        sensor5: 120,
      },
      {
        count: 16,
        sensor1: 85,
        sensor2: 80,
        sensor3: 68,
        sensor4: 102,
        sensor5: 127,
      },
      {
        count: 17,
        sensor1: 90,
        sensor2: 85,
        sensor3: 72,
        sensor4: 108,
        sensor5: 135,
      },
      {
        count: 18,
        sensor1: 95,
        sensor2: 90,
        sensor3: 76,
        sensor4: 114,
        sensor5: 142,
      },
      {
        count: 19,
        sensor1: 100,
        sensor2: 95,
        sensor3: 80,
        sensor4: 120,
        sensor5: 150,
      },
      {
        count: 20,
        sensor1: 105,
        sensor2: 100,
        sensor3: 84,
        sensor4: 126,
        sensor5: 157,
      },
      {
        count: 21,
        sensor1: 110,
        sensor2: 105,
        sensor3: 88,
        sensor4: 132,
        sensor5: 165,
      },
      {
        count: 22,
        sensor1: 115,
        sensor2: 110,
        sensor3: 92,
        sensor4: 138,
        sensor5: 172,
      },
      {
        count: 23,
        sensor1: 120,
        sensor2: 115,
        sensor3: 96,
        sensor4: 144,
        sensor5: 180,
      },
      {
        count: 24,
        sensor1: 125,
        sensor2: 120,
        sensor3: 100,
        sensor4: 150,
        sensor5: 187,
      },
    ];

    const stackedData = d3
      .stack()
      .keys(["sensor1", "sensor2"])
      .offset(d3.stackOffsetNone)(data);

    console.log("data", data);
    console.log("stackedData", stackedData);

    const xScale = d3.scaleLinear().domain([0, 100]);
    const yScale = d3.scaleLinear().domain([0, 100]);

    const series1 = fc
      .seriesWebglBar()
      .defined(() => true)
      .equals((d) => d.length)
      .crossValue((d) => d.count)
      .mainValue((d) => 10)
      .decorate((program, d) => {
        // const gl = program.context();
        // gl.useProgram(program);
        // const programObject = program.program();
        // const location = gl.getUniformLocation(programObject, "uSensorValue");

        //     const attribute = fc
        //   .webglAttribute()
        //   .size(1)
        //   .type(5126)
        //   .data((context) => {
        //     console.log(context);
        //     return [context.datum.sensor1];
        //   });
        //     program.buffers().attribute("uSensorValue", attribute);

        // Define the sensor reading value as an attribute
        // let x = program.buffers();
        // console.log("x", x);

        // program
        //   .buffers()
        //   .attribute("uSensorValue", (context) => [context.datum.sensor1]);

        // let ctx = program.context();
        // console.log("ctx", ctx);

        // let location = ctx.getUniformLocation(x, "uSensorValue");
        // console.log("location", location);

        // Create color value

        program.vertexShader().appendHeader(`
          uniform float uSensorValue;
          varying lowp vec4 vColor;
        `).appendBody(`
            vColor = mix(vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), ${
              Math.random() * 10
            });
            vColor = mix(vColor, vec4(1.0, 0.5, 0.0, 1.0), ${
              Math.random() * 5
            });
            vColor = mix(vColor, vec4(1.0, 0.0, 0.0, 1.0), ${
              Math.random() * 100
            });
      `);
        program.fragmentShader().appendHeader(`
          varying lowp vec4 vColor;
        `).appendBody(`
          gl_FragColor = vColor;
        `);
      });

    const series2 = fc
      .seriesWebglBar()
      .crossValue((d) => d.count)
      .mainValue((d) => 10)
      .baseValue((d) => 20)
      .decorate((program) => {
        program.vertexShader().appendHeader(`varying lowp vec4 vColor;`)
          .appendBody(`
              if (aMainValue < 5.0) {
                  vColor = vec4(1.0, 0.0, 0.0, 1.0);
              } else {
              vColor = vec4(0.0, 1.0, 0.0, 1.0);
              }
            `);
        program.fragmentShader().appendHeader(`
                varying lowp vec4 vColor;
            `).appendBody(`
                gl_FragColor = vColor;
            `);
      });

    const series3 = fc
      .seriesWebglBar()
      .crossValue((d) => d.count)
      .mainValue((d) => 10)
      .baseValue((d) => 30)
      .decorate((program) => {
        program.vertexShader().appendHeader(`varying lowp vec4 vColor;`)
          .appendBody(`
              if (aMainValue > 5.0) {
                  vColor = vec4(1.0, 0.0, 0.0, 1.0);
              } else {
              vColor = vec4(1.0, 0.0, 1.0, 1.0);
              }
            `);
        program.fragmentShader().appendHeader(`
                varying lowp vec4 vColor;
            `).appendBody(`
                gl_FragColor = vColor;
            `);
      });

    const series4 = fc
      .seriesWebglBar()
      .crossValue((d) => d.count)
      .mainValue((d) => 10)
      .baseValue((d) => 40)
      .decorate((program) => {
        program.vertexShader().appendHeader(`varying lowp vec4 vColor;`)
          .appendBody(`
              if (aMainValue < 5.0) {
                  vColor = vec4(1.0, 0.0, 0.0, 1.0);
              } else {
              vColor = vec4(1.0, 0.7, 0.0, 1.0);
              }
            `);
        program.fragmentShader().appendHeader(`
                varying lowp vec4 vColor;
            `).appendBody(`
                gl_FragColor = vColor;
            `);
      });

    const series5 = fc
      .seriesWebglBar()
      .crossValue((d) => d.count)
      .mainValue((d) => 10)
      .baseValue((d) => 50)
      .decorate((program) => {
        program.vertexShader().appendHeader(`varying lowp vec4 vColor;`)
          .appendBody(`
              if (aMainValue > 5.0) {
                  vColor = vec4(0.7, 0.2, 0.2, 1.0);
              } else {
              vColor = vec4(1.0, 0.7, 0.0, 1.0);
              }
            `);
        program.fragmentShader().appendHeader(`
                varying lowp vec4 vColor;
            `).appendBody(`
                gl_FragColor = vColor;
            `);
      });

    const multiSeries = fc
      .seriesWebglMulti()
      .series([series5, series4, series3, series2, series1]); // Draw in reverse to show lowest sensor in front
    //   const multiSeries = fc.seriesWebglMulti().series([series1, series2]);

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

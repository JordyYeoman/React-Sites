const series1 = fc
  .seriesWebglBar()
  .defined(() => true)
  .equals((d) => d.length)
  .crossValue((d) => d.count)
  .mainValue((d) => 10)
  .decorate((program, d) => {
    console.log("sensor1", d);

    // Initialize the program object
    program
      .vertexShader()
      .appendHeader(`varying lowp vec4 vColor;`)
      .appendBody(`vColor = vec4(1, 1, 1, 1);`);
    program.fragmentShader().appendHeader(`
    varying lowp vec4 vColor;
`).appendBody(`
    gl_FragColor = vColor;
`);

    // Calculate the color for each bar in the series
    const colors = d.map((z, i) => {
      const { r, g, b, opacity } = getColor(z.sensor1);
      console.log("r", r, "g", g, "b", b, "opacity", opacity);

      // Push the calculated color to the colors array
      return { r, g, b, opacity };
    });

    // Create an attribute in the vertex shader to hold the colors array
    program.vertexShader().appendHeader(`attribute vec4 aColors;`);
    program.vertexShader().appendBody(`vColor = aColors;`);

    // program
    //   .context()
    //   .bufferData(new Float32Array(colors), "aColors", 2, false);

    // Create a buffer object
    const buffer = program.context().createBuffer();
    // Bind the buffer object to the ARRAY_BUFFER target
    program.context().bindBuffer(program.context().ARRAY_BUFFER, buffer);
    // Populate the buffer with the colors array
    program
      .context()
      .bufferData(
        program.context().ARRAY_BUFFER,
        new Float32Array(colors),
        program.context().STATIC_DRAW
      );
    // Bind the colors array to the aColors attribute
    program
      .context()
      .vertexAttribPointer(
        program.context().getAttribLocation(program.shaderProgram(), "aColors"),
        4,
        program.context().FLOAT,
        false,
        0,
        0
      );
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

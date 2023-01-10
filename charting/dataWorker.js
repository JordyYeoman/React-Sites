// Generate a random number between min and max (inclusive)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random data item
function generateDataItem(count) {
  //   return [getRandomInt(1, 10), getRandomInt(12, 30), getRandomInt(1, 500)];
  return {
    count,
    sensor1: getRandomInt(1, 30),
    sensor2: getRandomInt(1, 30),
    sensor3: getRandomInt(1, 30),
    sensor4: getRandomInt(1, 30),
    sensor5: getRandomInt(1, 30),
  };
}

// Generate a dataset with a specified size
function generateDataset(size) {
  const dataset = [];
  for (let i = 0; i < size; i++) {
    dataset.push(generateDataItem(i));
  }
  return dataset;
}

// Create a worker that will return a data set on sensors and readings
onmessage = ({ data }) => {
  const { numPoints } = data;
  const newData = generateDataset(numPoints);

  postMessage(newData);
};

// Hacky way - extremely slow
const createSeries = () => {
  let series = [];
  for (let i = 0; i < dataPoints; i++) {
    // let x = fc.webglAttribute();
    let s = fc
      .seriesWebglBar()
      .crossValue((d) => d.count)
      .mainValue((d) => 1)
      .baseValue((d) => 0)
      .decorate((program, d) => {
        const { r, g, b, opacity } = getColor(d[i].sensor1);
        // console.log("r", r, "g", g, "b", b, "opacity", opacity);

        program
          .vertexShader()
          .appendHeader(`varying lowp vec4 vColor;`)
          .appendBody(`vColor = vec4(${r}, ${g}, ${b}, ${opacity});`);
        program.fragmentShader().appendHeader(`
              varying lowp vec4 vColor;
          `).appendBody(`
              gl_FragColor = vColor;
          `);
      });
    series.push(s);
  }
  // console.log("series", series);
  return series;
};

createSeries();

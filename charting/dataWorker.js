// Generate a random number between min and max (inclusive)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random data item
function generateDataItem(sensorIndex, count) {
  //   return [getRandomInt(1, 10), getRandomInt(12, 30), getRandomInt(1, 500)];
  return {
    sensor: sensorIndex,
    distance: getRandomInt(12, 30),
    count,
  };
}

// Generate a dataset with a specified size
function generateDataset(size) {
  const dataset = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < 10; j++) {
      dataset.push(generateDataItem(j, i + 1));
    }
  }
  return dataset;
}

// Create a worker that will return a data set on sensors and readings
onmessage = ({ data }) => {
  const { numPoints } = data;
  const newData = generateDataset(numPoints);

  postMessage(newData);
};

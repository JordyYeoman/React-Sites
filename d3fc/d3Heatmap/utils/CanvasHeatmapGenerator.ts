import fs from "fs";

// Generate a random number between min and max (inclusive)
function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random data item
function generateDataItem(sensorIndex: number, count?: number): any[] {
  //   return [getRandomInt(1, 10), getRandomInt(12, 30), getRandomInt(1, 500)];
  return [sensorIndex, getRandomInt(12, 30), count];
}

// Generate a dataset with a specified size
function generateDataset(size: number): any[] {
  const dataset: any[] = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < 10; j++) {
      dataset.push(generateDataItem(j, i + 1));
    }
  }
  return dataset;
}

// Example usage: generate a dataset with 20 items
const dataset = generateDataset(10000);
console.log(dataset);

// Write to file
const filename = "data2.csv";
const topRow = ["day", "hour", "count"];

// Create file
fs.writeFile(`${filename}`, "", function (err) {
  if (err) throw err;
  console.log("File is created successfully.");
});

// Init writestream to CSV file
const writeStream = fs.createWriteStream(`${filename}`);

// Add header line to new CSV file
writeStream.write(`${topRow}\n`);

// Write each line to csv file
dataset.forEach((d: number[]) => {
  const length = d.length;
  d.forEach((num: number, i: number) => {
    writeStream.write(`${num}`);
    if (i + 1 !== d.length) {
      writeStream.write(`,`);
    }
  });
  writeStream.write(`\n`);
});

writeStream.close(() => {
  console.log("Data processing complete");
});

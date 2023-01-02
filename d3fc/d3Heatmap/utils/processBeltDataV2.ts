import fs from 'fs';

const filename = 'BeltThickness.csv';
const topRow = [
  'Iteration',
  'sensor1',
  'sensor2',
  'sensor3',
  'sensor4',
  'sensor5',
  'sensor6',
  'sensor7',
  'sensor8',
  'sensor9',
  'sensor10',
];
const sensorCount = 10;

let data: string[] = fs.readFileSync(filename, 'utf8').split('\n');

// Init writestream to CSV file
const writeStream = fs.createWriteStream(`PROCESSED_V2_${filename}`);

// Add header line to new CSV file
writeStream.write(`${topRow}\n`);

// Each line should be an array of values
let data2: string[][] = data.map((line) => line.split(','));

// We only need the values at indexs < 11, others can be removed
let data3: string[][] = data2.map((line) => line.slice(1, 11));

// Remove header line since it is unnecessary
data3.splice(0, 1);
data3.splice(-1, 1);

// Extract only the required data points
data3.forEach((line: string[], iteration: number) => {
  writeStream.write(`${iteration},`);
  line.forEach((dataPoint: string) => {
    writeStream.write(`${dataPoint},`);
  });
  writeStream.write(`\n`);
});

writeStream.close(() => {
  console.log('Data processing complete');
});

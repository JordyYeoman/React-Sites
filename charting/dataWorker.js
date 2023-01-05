// Create a worker that will return a data set on sensors and readings
onmessage = ({ data }) => {
  console.log("Data received");

  setTimeout(() => {
    postMessage("Absolutely Send it");
  }, 1000);
};

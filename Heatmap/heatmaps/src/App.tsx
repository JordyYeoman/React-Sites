import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import BarGraph from "./BarGraph";
import HeatMapV1 from "./Heatmap_v1";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveHeatMapCanvas } from "@nivo/heatmap";
import data from "./assets/data.json";

type Blah = {
  x: string | number;
  y: number;
};

type DataSet = {
  id: string; // Used for right side legend in graph
  data: Blah[];
};

// const getData = (count: number): Blah[] => {
//   return [...Array(count)].map((d, i) => {
//     return {
//       x: 10 * Math.random() * Math.random() * 109 * i,
//       y: 10 * Math.random() * Math.random() * 100 * i + 1,
//     };
//   });
// };

// const generateData = (dataSetSize: number) => {
//   let data: Array<DataSet> = [];
//   for (let i = 0; i < 8; i++) {
//     // 8 for the amount of rows which correlates to 8 sensor on the belt machine
//     let bicBoiData: Blah[] = getData(100);
//     data.push({
//       id: i.toString(),
//       data: bicBoiData,
//     });
//   }
//   return data;
// };

// let data = generateData(500);

// console.log(data);

const MyResponsiveHeatMapCanvas = ({ data /* see data tab */ }) => (
  <ResponsiveHeatMapCanvas
    data={data}
    margin={{ top: 70, right: 60, bottom: 20, left: 80 }}
    valueFormat=">-.2s"
    axisTop={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: -90,
      legend: "",
      legendOffset: 46,
    }}
    axisRight={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "country",
      legendPosition: "middle",
      legendOffset: 40,
    }}
    axisLeft={null}
    colors={{
      type: "quantize",
      scheme: "red_yellow_blue",
      steps: 10,
      minValue: -100000,
      maxValue: 100000,
    }}
    emptyColor="#555555"
    borderWidth={1}
    borderColor="#000000"
    enableLabels={false}
    legends={[
      {
        anchor: "left",
        translateX: -50,
        translateY: 0,
        length: 200,
        thickness: 10,
        direction: "column",
        tickPosition: "after",
        tickSize: 3,
        tickSpacing: 4,
        tickOverlap: false,
        tickFormat: ">-.2s",
        title: "Value →",
        titleAlign: "start",
        titleOffset: 4,
      },
    ]}
    annotations={[]}
  />
);

function App() {
  return (
    <div className="App">
      <div>
        <div>TIP TOP HeatMap</div>
        <div style={{ width: "800px", height: "800px" }}>
          <MyResponsiveHeatMapCanvas data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;

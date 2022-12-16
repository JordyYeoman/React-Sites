import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import BarGraph from "./BarGraph";
import HeatMapV1 from "./Heatmap_v1";
import { ResponsiveBar } from "@nivo/bar";
import {
  ComputedCell,
  ResponsiveHeatMap,
  ResponsiveHeatMapCanvas,
} from "@nivo/heatmap";
// import data from "./assets/data.json";

type Blah = {
  x: string | number;
  y: number;
};

type DataSet = {
  id: string; // Used for right side legend in graph
  data: Blah[];
};

const getData = (count: number): Blah[] => {
  return [...Array(count)].map((d, i) => {
    return {
      x: i,
      y: 10 * Math.random() * Math.random(),
    };
  });
};

const generateData = (dataSetSize: number) => {
  let data: Array<DataSet> = [];
  for (let i = 0; i < 8; i++) {
    // 8 for the amount of rows which correlates to 8 sensor on the belt machine
    let bicBoiData: Blah[] = getData(dataSetSize);
    data.push({
      id: i.toString(),
      data: bicBoiData,
    });
  }
  return data;
};

let data = generateData(1000);

console.log(data);

// Canvas
const MyResponsiveHeatMapCanvas = ({ data /* see data tab */ }) => (
  <ResponsiveHeatMapCanvas
    data={data}
    margin={{ top: 70, right: 60, bottom: 20, left: 80 }}
    valueFormat=">-.2s"
    // axisTop={{
    //   tickSize: 5,
    //   tickPadding: 5,
    //   tickRotation: -90,
    //   legend: "",
    //   legendOffset: 46,
    // }}
    // axisRight={{
    //   tickSize: 5,
    //   tickPadding: 5,
    //   tickRotation: 0,
    //   legend: "country",
    //   legendPosition: "middle",
    //   legendOffset: 40,
    // }}
    // axisLeft={null}
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
    // forceSquare={true}
    // legends={[
    //   {
    //     anchor: "left",
    //     translateX: -50,
    //     translateY: 0,
    //     length: 200,
    //     thickness: 10,
    //     direction: "column",
    //     tickPosition: "after",
    //     tickSize: 3,
    //     tickSpacing: 4,
    //     tickOverlap: false,
    //     tickFormat: ">-.2s",
    //     title: "Value →",
    //     titleAlign: "start",
    //     titleOffset: 4,
    //   },
    // ]}
    annotations={[]}
  />
);

const CustomCell = ({
  cell,
  borderWidth,
}: {
  cell: ComputedCell<any>;
  borderWidth: number;
}) => {
  if (cell.value === null) return null;

  cell.width = 3;
  cell.height = 3;

  return (
    <g transform={`translate(${cell.x}, ${cell.y})`}>
      <path
        transform={`rotate(${cell.value < 50 ? 180 : 0})`}
        fill={cell.color}
        fillOpacity={cell.opacity}
        strokeWidth={borderWidth}
        stroke={cell.borderColor}
        d={`
                  M0 -${Math.round(cell.height / 2)}
                  L${Math.round(cell.width / 2)} ${Math.round(cell.height / 2)}
                  L-${Math.round(cell.width / 2)} ${Math.round(cell.height / 2)}
                  L0 -${Math.round(cell.height / 2)}
              `}
      />
    </g>
  );
};

// SVG Version
const MyResponsiveHeatMap = ({ data /* see data tab */ }) => (
  <ResponsiveHeatMap
    data={data}
    margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
    valueFormat=">-.2s"
    isInteractive={false}
    // axisTop={{
    //   tickSize: 5,
    //   tickPadding: 5,
    //   tickRotation: -90,
    //   legend: "",
    //   legendOffset: 46,
    // }}
    // axisRight={{
    //   tickSize: 5,
    //   tickPadding: 5,
    //   tickRotation: 0,
    //   legend: "country",
    //   legendPosition: "middle",
    //   legendOffset: 70,
    // }}
    // axisLeft={{
    //   tickSize: 5,
    //   tickPadding: 5,
    //   tickRotation: 0,
    //   legend: "country",
    //   legendPosition: "middle",
    //   legendOffset: -72,
    // }}
    cellComponent={CustomCell}
    colors={{
      type: "diverging",
      scheme: "red_yellow_blue",
      divergeAt: 0.5,
      minValue: -100000,
      maxValue: 100000,
    }}
    emptyColor="#555555"
    // legends={[
    //   {
    //     anchor: "bottom",
    //     translateX: 0,
    //     translateY: 30,
    //     length: 400,
    //     thickness: 8,
    //     direction: "row",
    //     tickPosition: "after",
    //     tickSize: 3,
    //     tickSpacing: 4,
    //     tickOverlap: false,
    //     tickFormat: ">-.2s",
    //     title: "Value →",
    //     titleAlign: "start",
    //     titleOffset: 4,
    //   },
    // ]}
  />
);

function App() {
  return (
    <div className="App">
      <div>
        <div>TIP TOP HeatMap</div>
        <div style={{ width: "1800px", height: "800px" }}>
          {/* <MyResponsiveHeatMapCanvas data={data} /> */}
          <MyResponsiveHeatMap data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;

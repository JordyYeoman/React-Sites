import * as d3 from "d3";
import * as fc from "d3fc";
import React, { useRef, useState } from "react";
import {
  SimpleChart,
  CanvasHeatmap,
} from "./components/organisms/CanvasHeatmap";
import Footer from "./components/templates/Footer";
import Header from "./components/templates/Header";

export const App = () => {
  const [totalDataPoints, setTotalDataPoints] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="w-full">
      <Header />
      <div className="flex justify-center items-center m-4 h-60">
        <div className="bg-gray-800 mr-2 w-full h-full rounded p-4 flex-1">
          <div className="flex justify-between">
            <div>Adjustment</div>
            <div className="px-4 py-1 cursor-pointer bg-zinc-900 rounded text-sm font-medium">
              Render
            </div>
          </div>
          <InputField step={1} min={0} max={10000} title={"Data Range"} />
          <InputField step={1} min={0} max={10000} title={"Range 2"} />
          <InputField step={1} min={0} max={10000} title={"Range 3"} />
          <div className="flex flex-col mt-1">
            <div>
              <label htmlFor="WindowSize" className="text-sm pr-2">
                WindowSize
              </label>
              <input className="rounded" name="MWA" type="text" />
            </div>
            <div>
              <label htmlFor="MWA" className="text-sm pr-2">
                MWA
              </label>
              <input name="MWA" type="checkbox" />
            </div>
          </div>
        </div>
        <div className="bg-gray-800 ml-2 w-full h-full rounded p-4 flex-1">
          <div>Stats</div>
          <div className="flex">Total Sensor Readings: 2700</div>
          <div className="flex">Red Readings: 19</div>
          <div className="flex">Orange Readings: 5</div>
          <div className="flex">Yellow Readings: 11</div>
        </div>
      </div>
      <div className="flex justify-center items-center m-4 h-[20rem]">
        <div
          className="bg-gray-800 w-full h-full rounded p-4"
          ref={containerRef}
        >
          {/* <img
            className="w-full h-full object-contain rounded overflow-hidden"
            src={"./belt2.png"}
          /> */}
          {/* <CanvasHeatmap containerRef={containerRef} /> */}
          <SimpleChart />
          <CanvasHeatmap />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const InputField = ({
  step = 1,
  min = 0,
  max = 100,
  title = "Value",
}: {
  step: number;
  min: number;
  max: number;
  title: string;
}) => {
  const [value, setValue] = useState<string>("0");

  return (
    <>
      <label
        htmlFor="large-range"
        className="block mb-2 text-xs mb-0 mt-1 font-medium text-gray-900 dark:text-white"
      >
        {title}: {value}
      </label>
      <input
        step={step}
        min={min}
        max={max}
        onChange={(value) => {
          setValue(value.target.value);
        }}
        id="large-range"
        type="range"
        value={value}
        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg dark:bg-gray-700"
      ></input>
    </>
  );
};

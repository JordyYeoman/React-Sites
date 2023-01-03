import * as d3 from "d3";
import * as fc from "d3fc";
import React from "react";

// function App() {
//   return (
//     <div className="App">
//       <div>
//         <div>TIP TOP HeatMap</div>
//       </div>
//     </div>
//   );
// }

// export default App;

export const HeatmapChart = () => {
  console.log("System starting....");

  const xExtent = fc
    .extentLinear()
    .accessors([(d: { iteration: any }) => d.iteration])
    .pad([0.001, 0.001]);
  const yExtent = fc
    .extentLinear()
    .accessors([(d: { reading: any }) => d.reading]);

  d3.csv("./utils/PROCESSED_V2_BeltThickness.csv", type).then((data) => {
    // Find the minimum and maximum values
    const minValue = d3.min(data, (d) => d.reading);
    const maxValue = d3.max(data, (d) => d.reading);

    // const colorScale = (d) => {
    //   console.log('data: ', d);
    //   const color = d3.hsl(Math.random() * 360, 0.5, 0.5);
    //   console.log(color);
    //   return color;
    // };
    const colorScale = d3
      .scaleSequential(fc.interpolateRgb)
      .domain([minValue, maxValue]);

    const xScale = d3.scaleLinear().domain(xExtent(data));
    // Hardcoded value to set the x-range and add padding
    // const xScale = d3.scaleLinear().domain([0, 250]);
    const yScale = d3.scaleLinear().domain(yExtent(data));
    // const yScale = d3.scaleLinear().domain([20, 25]);

    const getRandomColor = () => {
      return [Math.random(), Math.random(), Math.random(), Math.random()];
    };

    const pointSeries = fc
      .seriesWebglPoint()
      .crossValue((d: { iteration: any }) => d.iteration)
      .mainValue((d: { reading: any }) => d.reading)
      .size(20)
      .decorate((program: { context: () => any }) => {
        // fc.pointFill().color(getRandomColor())(program);
        // fc.pointFill().color([0, 0, 1, 0.5])(program);
        console.log("Calling pointFill bra");
        // fc.pointFill((d) => colorScale(d.reading))(program);
        // fc.pointFill((d) => colorScale(d.reading))(program);
        console.log("End pointfill");

        // fc.pointAntiAlias()(program);

        const gl = program.context();
        gl.enable(gl.BLEND);
        gl.blendFuncSeparate(
          gl.SRC_ALPHA,
          gl.ONE_MINUS_DST_ALPHA,
          gl.ONE,
          gl.ONE_MINUS_SRC_ALPHA
        );
      });

    const chart = fc
      .chartCartesian(xScale, yScale)
      .webglPlotArea(pointSeries)
      .xLabel("Iteration")
      .yLabel("Reading");

    // Render the chart
    d3.select("#chart").datum(data).call(chart);
  });

  function type(d: any) {
    d.sensor = Number(d.sensor);
    d.reading = Number(d.reading);
    d.iteration = Number(d.iteration);
    return d;
  }
};

// const SimpleChart = ({ chartId, data, width, height }: any) => {
//   const id = chartId === undefined ? "chart" : chartId;
//   const yExtent = fc
//     .extentLinear()
//     .accessors([(d: { high: any }) => d.high, (d: { low: any }) => d.low]);
//   const xExtent = fc.extentTime().accessors([(d: { date: any }) => d.date]);

//   const gridlines = fc.annotationSvgGridline();
//   const candlestick = fc.seriesSvgCandlestick();
//   const multi = fc.seriesSvgMulti().series([gridlines, candlestick]);

//   const chart = fc
//     .chartCartesian(d3.scaleTime(), d3.scaleLinear())
//     .svgPlotArea(multi);

//   chart.xDomain(xExtent(data));
//   chart.yDomain(yExtent(data));

//   const render = () => {
//     d3.select(`#${id}`).datum(data).call(chart);
//   };

//   React.useEffect(() => {
//     render();
//   }, [data]);

//   return (
//     <div
//       id={id}
//       style={{
//         width: width != undefined ? width : "100%",
//         height: height != undefined ? height : "95vh",
//       }}
//     ></div>
//   );
// };

// const StreamingChart = ({
//   initialData,
//   next,
// }: {
//   initialData: any;
//   next: any;
// }) => {
//   const [data, setData] = React.useState(initialData);
//   const getNext = React.useCallback(() => next(), []);

//   React.useEffect(() => {
//     const timer = setTimeout(() => {
//       setData((prevData: any) => {
//         const data = prevData.slice(1);
//         const nextPoint = next();
//         data.push(nextPoint);
//         return data;
//       });
//     }, 200);
//     return () => clearTimeout(timer);
//   }, [data]);

//   return (
//     <SimpleChart
//       data={data}
//       chartId="streaming-chart"
//       width={1200}
//       height={800}
//     />
//   );
// };

// const stream = fc.randomFinancial().stream();
// const initialData = stream.take(100);
// export const ChartMan = () => (
//   <StreamingChart initialData={initialData} next={stream.next} />
// );

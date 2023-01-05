import * as d3 from "d3";
import * as fc from "d3fc";
import React, { Component } from "react";
import { useEffect, useRef, useState } from "react";

const getColorForVal = (val: number) => {
  // Red - Belt is significantly worn
  if (val <= 19) {
    return "#ff0707";
  }
  // Orange - Belt has a decent amount of wear
  if (val <= 20.75) {
    return "#ff6007";
  }
  // Yellow - Mild wear on belt
  if (val <= 21.5) {
    return "#ffe607";
  }
  // Green - Belt is in good condition
  if (val > 21.5) {
    return "#74ff07";
  }
  // Fail case - Return white
  return "#ffffff";
};

function type(d: any) {
  d.Iteration = Number(d.Iteration).toString();
  d.sensor1 = Number(d.sensor1);
  d.sensor2 = Number(d.sensor2);
  d.sensor3 = Number(d.sensor3);
  d.sensor4 = Number(d.sensor4);
  d.sensor5 = Number(d.sensor5);
  d.sensor6 = Number(d.sensor6);
  d.sensor7 = Number(d.sensor7);
  d.sensor8 = Number(d.sensor8);
  d.sensor9 = Number(d.sensor9);
  d.sensor10 = Number(d.sensor10);
  return d;
}

interface Props {}

export class SimpleChart extends Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    this.createChart = this.createChart.bind(this);
    // @ts-ignore
    this.myRef = React.createRef();
  }
  componentDidMount() {
    this.createChart();
  }
  componentDidUpdate() {
    this.createChart();
  }
  createChart() {
    const data = fc.randomFinancial()(50);
    // @ts-ignore
    const yExtent = fc.extentLinear().accessors([(d) => d.high, (d) => d.low]);
    // @ts-ignore
    const xExtent = fc.extentTime().accessors([(d) => d.date]);

    const gridlines = fc.annotationSvgGridline();
    const candlestick = fc.seriesSvgCandlestick();
    const multi = fc.seriesSvgMulti().series([gridlines, candlestick]);

    const chart = fc
      .chartCartesian(d3.scaleTime(), d3.scaleLinear())
      .yDomain(yExtent(data))
      .xDomain(xExtent(data))
      .svgPlotArea(multi);
    // @ts-ignore
    d3.select(this.myRef.current).datum(data).call(chart);
  }
  render() {
    // @ts-ignore
    return <df3c-canvas ref={this.myRef} width={500} height={500} />;
  }
}

export class CanvasHeatmap extends Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    this.createChart = this.createChart.bind(this);
    // @ts-ignore
    this.containerRef = React.createRef();
  }
  componentDidMount() {
    this.createChart();
  }
  componentDidUpdate() {
    console.log("Component updated!!");
    this.createChart();
  }
  createChart() {
    // @ts-ignore
    const container = this.containerRef.current;
    d3.csv("./PROCESSED_V2_BeltThickness.csv", type).then((data) => {
      console.log("data", data);
      console.log("container", container);
      // Here we use band scales to demonstrate that the autoBandwidth component
      // is able to obtain the bandwidth from the scale
      // @ts-ignore
      const xScale = d3.scaleBand().domain(d3.range(1, 2000));
      // @ts-ignore
      const yScale = d3.scaleBand().domain(d3.range(1, 10));

      const xAxis = fc.axisBottom().scale(xScale);
      const yAxis = fc.axisLeft().scale(yScale);

      const series = fc
        .autoBandwidth(
          fc.seriesCanvasHeatmap({
            xAxis: {
              // @ts-ignore
              bottom: (xAxis) => customAxis(fc.axisBottom(xAxis), true),
            },
            xLabel: "Value",
          })
        )
        // @ts-ignore
        .xValue((d) => d.count)
        // @ts-ignore
        .yValue((d) => d.day)
        // @ts-ignore
        .colorValue((d) => d.hour)
        .xScale(xScale)
        .yScale(yScale)
        .xAlign("right")
        .yAlign("top")
        .widthFraction(10.01)
        // @ts-ignore
        .decorate((context, data, index) => {
          context.fillStyle = getColorForVal(data.hour);
        });

      d3.select(container)
        .on("draw", () => {
          console.log("DRAWING");
          series(data);
        })
        .on("measure", (event) => {
          console.log("MEASURING");
          const { width, height } = event.detail;
          xScale.range([0, width]);
          yScale.range([height, 0]);

          const ctx = container.querySelector("canvas").getContext("2d");
          series.context(ctx);
        });
      // container.requestRedraw();
    });
  }
  render() {
    // @ts-ignore
    return <df3c-canvas ref={this.containerRef} width={500} height={500} />;
  }
}

// const CanvasHeatmap: React.FC<{
//   containerRef: React.MutableRefObject<HTMLDivElement | null>;
// }> = ({ containerRef }) => {
//   const [data, setData] = useState<any>([]);
//   const [series, setSeries] = useState<any>([]);
//   const [pixels, setPixels] = useState<any>(null);
//   const [frame, setFrame] = useState<any>(0);
//   const [gl, setGl] = useState<any>(null);
//   const [xScale] = useState<any>(d3.scalePoint().padding(0.5));
//   const [yScale] = useState<any>(d3.scaleLinear());
//   const [color] = useState<any>(d3.scaleOrdinal(d3.schemeCategory10));
//   const [width, setWidth] = useState(0);
//   const [height, setHeight] = useState(0);
//   const [redrawTrigger, setRedrawTrigger] = useState(0);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     let container = containerRef.current;
//     if (container) {
//       d3.csv("./PROCESSED_V2_BeltThickness.csv", type).then((data) => {
//         console.log("data", data);

//         // Here we use band scales to demonstrate that the autoBandwidth component
//         // is able to obtain the bandwidth from the scale
//         // @ts-ignore
//         const xScale = d3.scaleBand().domain(d3.range(1, 2000));
//         // @ts-ignore
//         const yScale = d3.scaleBand().domain(d3.range(1, 10));

//         const xAxis = fc.axisBottom().scale(xScale);

//         const yAxis = fc.axisLeft().scale(yScale);

//         const series = fc
//           .autoBandwidth(
//             fc.seriesCanvasHeatmap({
//               xAxis: {
//                 // @ts-ignore
//                 bottom: (xAxis) => customAxis(fc.axisBottom(xAxis), true),
//               },
//               xLabel: "Value",
//             })
//           )
//           .xValue((d: { count: any }) => d.count)
//           .yValue((d: { day: any }) => d.day)
//           .colorValue((d: { hour: any }) => d.hour)
//           .xScale(xScale)
//           .yScale(yScale)
//           // The band scales require different alignments
//           .xAlign("right")
//           .yAlign("top")
//           .widthFraction(10.01)
//           .decorate(
//             (
//               context: { fillStyle: string },
//               data: { hour: number },
//               index: any
//             ) => {
//               context.fillStyle = getColorForVal(data.hour);
//             }
//           );

//         d3.select(container)
//           .on("draw", () => {
//             series(data);
//           })
//           .on("measure", (event) => {
//             const { width, height } = event.detail;
//             xScale.range([0, width]);
//             yScale.range([height, 0]);
//             if (canvasRef.current) {
//               const ctx = canvasRef.current.getContext("2d");
//               series.context(ctx);
//             }
//           });

//         // container.requestRedraw();
//         setRedrawTrigger(redrawTrigger + 1);
//       });
//     }
//   }, [containerRef]);
//   // @ts-ignore
//   return <d3fc-canvas ref={canvasRef} width={500} height={500} />;
// };

// export default CanvasHeatmap;

// useEffect code

// Old stuff
// Create and apply the zoom behavior
// const zoom = d3.zoom().on("zoom", () => {
//   // @ts-ignore
//   xScale.range([
//     event.transform.x,
//     width * event.transform.k + event.transform.x,
//   ]);
//   pointSeries
//     .xScale(xScale)
//     .yScale(yScale)
//     .color((d: any) => getColorForVal(d.sensor1))
//     .data(data)
//     .render();
// });

// canvas.call(zoom).on("click", (event: any) => {
//   console.log(event);
// });

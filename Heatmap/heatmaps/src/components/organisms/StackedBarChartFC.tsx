import * as d3 from "d3";
import { zoomTransform, zoom } from "d3";
import * as fc from "d3fc";
import React, { Component, useEffect, useRef, useState } from "react";
import { getData } from "./StackedBarChart";

const createChart = (
  myRef: any,
  currentZoomState: any,
  updateZoom: Function
) => {
  let data = getData(10000);
  console.log("data", data);
  const xScale = d3.scaleLinear().domain([0, data.length]);
  const yScale = d3.scaleLinear().domain([0, 50]);

  if (currentZoomState) {
    const newXScale = currentZoomState.rescaleX(xScale);
    xScale.domain(newXScale.domain());
  }

  const series1 = fc
    .seriesWebglBar()
    .defined(() => true)
    .equals((d: string | any[]) => d.length)
    .crossValue((d: { count: any }) => d.count)
    .mainValue((d: any) => 10)
    .decorate((program: any, d: any) => {
      program.vertexShader().appendHeader(`varying lowp vec4 vColor;`)
        .appendBody(`
            if (aMainValue > 15.0) {
                vColor = vec4(0.1, 0.5, 0.25, 1.0);
            } else {
            vColor = vec4(0.1, 0.1, 0.1, 1.0);
            }
          `);
      program.fragmentShader().appendHeader(`
              varying lowp vec4 vColor;
          `).appendBody(`
              gl_FragColor = vColor;
          `);
    });

  const series2 = fc
    .seriesWebglBar()
    .crossValue((d: { count: any }) => d.count)
    .mainValue((d: any) => 10)
    .baseValue((d: any) => 20)
    .decorate((program: any) => {
      program.vertexShader().appendHeader(`varying lowp vec4 vColor;`)
        .appendBody(`
              if (aMainValue > 15.0) {
                  vColor = vec4(1.0, 0.0, 0.0, 1.0);
              } else {
              vColor = vec4(0.0, 1.0, 0.0, 1.0);
              }
            `);
      program.fragmentShader().appendHeader(`
                varying lowp vec4 vColor;
            `).appendBody(`
                gl_FragColor = vColor;
            `);
    });

  const series3 = fc
    .seriesWebglBar()
    .crossValue((d: { count: any }) => d.count)
    .mainValue((d: any) => 10)
    .baseValue((d: any) => 30)
    .decorate(
      (program: {
        vertexShader: () => {
          (): any;
          new (): any;
          appendHeader: {
            (arg0: string): {
              (): any;
              new (): any;
              appendBody: { (arg0: string): void; new (): any };
            };
            new (): any;
          };
        };
        fragmentShader: () => {
          (): any;
          new (): any;
          appendHeader: {
            (arg0: string): {
              (): any;
              new (): any;
              appendBody: { (arg0: string): void; new (): any };
            };
            new (): any;
          };
        };
      }) => {
        program.vertexShader().appendHeader(`varying lowp vec4 vColor;`)
          .appendBody(`
              if (aMainValue > 15.0) {
                  vColor = vec4(1.0, 0.0, 0.0, 1.0);
              } else {
              vColor = vec4(1.0, 0.0, 1.0, 1.0);
              }
            `);
        program.fragmentShader().appendHeader(`
                varying lowp vec4 vColor;
            `).appendBody(`
                gl_FragColor = vColor;
            `);
      }
    );

  const series4 = fc
    .seriesWebglBar()
    .crossValue((d: { count: any }) => d.count)
    .mainValue((d: any) => 10)
    .baseValue((d: any) => 40)
    .decorate(
      (program: {
        vertexShader: () => {
          (): any;
          new (): any;
          appendHeader: {
            (arg0: string): {
              (): any;
              new (): any;
              appendBody: { (arg0: string): void; new (): any };
            };
            new (): any;
          };
        };
        fragmentShader: () => {
          (): any;
          new (): any;
          appendHeader: {
            (arg0: string): {
              (): any;
              new (): any;
              appendBody: { (arg0: string): void; new (): any };
            };
            new (): any;
          };
        };
      }) => {
        program.vertexShader().appendHeader(`varying lowp vec4 vColor;`)
          .appendBody(`
              if (aMainValue < 5.0) {
                  vColor = vec4(1.0, 0.0, 0.0, 1.0);
              } else {
              vColor = vec4(1.0, 0.7, 0.0, 1.0);
              }
            `);
        program.fragmentShader().appendHeader(`
                varying lowp vec4 vColor;
            `).appendBody(`
                gl_FragColor = vColor;
            `);
      }
    );

  const series5 = fc
    .seriesWebglBar()
    .crossValue((d: { count: any }) => d.count)
    .mainValue((d: any) => 10)
    .baseValue((d: any) => 50)
    .decorate(
      (program: {
        vertexShader: () => {
          (): any;
          new (): any;
          appendHeader: {
            (arg0: string): {
              (): any;
              new (): any;
              appendBody: { (arg0: string): void; new (): any };
            };
            new (): any;
          };
        };
        fragmentShader: () => {
          (): any;
          new (): any;
          appendHeader: {
            (arg0: string): {
              (): any;
              new (): any;
              appendBody: { (arg0: string): void; new (): any };
            };
            new (): any;
          };
        };
      }) => {
        program.vertexShader().appendHeader(`varying lowp vec4 vColor;`)
          .appendBody(`
              if (aMainValue > 5.0) {
                  vColor = vec4(0.7, 0.2, 0.2, 1.0);
              } else {
              vColor = vec4(1.0, 0.7, 0.0, 1.0);
              }
            `);
        program.fragmentShader().appendHeader(`
                varying lowp vec4 vColor;
            `).appendBody(`
                gl_FragColor = vColor;
            `);
      }
    );

  const multiSeries = fc
    .seriesWebglMulti()
    .series([series5, series4, series3, series2, series1]); // Draw in reverse to show lowest sensor in front

  const zoom = fc.zoom().on("zoom", () => {
    console.log("ZOOM!");
    // @ts-ignore
    const zoomState = zoomTransform(myRef.current);
    console.log("zoom state", zoomState);
    updateZoom(zoomState);
    //   setState();
  });

  // function render() {
  //   d3.select("#chart").datum(data).call(chart);
  // }

  const chart = fc
    .chartCartesian(xScale, yScale)
    .yOrient("left")
    .chartLabel("Belt sensor readings over time")
    .xLabel("Metres of belt")
    .yLabel("Sensor")
    .webglPlotArea(multiSeries)
    .decorate((selection) => {
      let x = selection.enter().select(".plot-area");
      console.log("x", x);
      x.call(zoom, xScale);
    });
  // @ts-ignore
  d3.select(myRef.current).datum(data).call(chart);
};

const StackedBarChartFC = () => {
  const myRef = useRef(null);
  const [zoom, setZoom] = useState(0);
  useEffect(() => {
    createChart(myRef, zoom, setZoom);
  }, [zoom]);
  // @ts-ignore
  return <df3c-canvas ref={myRef} width={500} height={500} />;
};

export default StackedBarChartFC;

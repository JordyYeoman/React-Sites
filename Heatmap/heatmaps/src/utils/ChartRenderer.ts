import fc from 'd3fc';
import * as d3 from "d3";

export const getColorForVal = (val: number) => {
    if (typeof val !== 'number') return '#ffffff';
  
    // Red - Belt is significantly worn
    if (val <= 19) {
      return '#ff0707';
    }
    // Orange - Belt has a decent amount of wear
    if (val <= 20.75) {
      return '#ff6007';
    }
    // Yellow - Mild wear on belt
    if (val <= 21.5) {
      return '#ffe607';
    }
    // Green - Belt is in good condition
    if (val > 21.5) {
      return '#74ff07';
    }
    // Fail case - Return white
    return '#ffffff';
  };
  
  export function type(d: any) {
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
  
  // Read data from CSV
  d3.csv('./utils/PROCESSED_V2_BeltThickness.csv', type).then((dataV2: any) => {
    const data = [...dataV2];
  
    // Run chart
    const stack = d3
      .stack()
      .keys(Object.keys(data[0]).filter((k) => k !== 'Iteration'));
    const series = stack(data);
  
    const container: any = document.querySelector('d3fc-canvas')!;
  
    const xScale = d3
      .scalePoint()
      .domain(data.map((d) => d.Iteration))
      .padding(0.5);
  
    const yExtent = fc
      .extentLinear()
      .accessors([(a: any[]) => a.map((d: any[]) => d[1])])
      .include([0]);
  
    const yScale = d3.scaleLinear().domain(yExtent(series));
  
    const color = d3.scaleOrdinal(d3.schemeCategory10);
  
    const barSeries = fc
      .seriesWebglBar()
      .xScale(xScale)
      .yScale(yScale)
      .crossValue((d: { data: { Iteration: any; }; }) => d.data.Iteration)
      .mainValue((d: any[]) => d[1])
      .baseValue((d: any[]) => d[0]);
  
    let pixels: Uint8Array | null = null;
    let frame = 0;
    let gl: WebGLRenderingContext | null = null;
  
    d3.select(container)
      .on('measure', (event: { detail: { width: any; height: any; }; }) => {
        const { width, height } = event.detail;
        xScale.range([0, width]);
        yScale.range([height, 0]);
  
        if(container) {
          gl = container?.querySelector('canvas')?.getContext('webgl') ?? null;
        }
        barSeries.context(gl);
      })
      .on('draw', () => {
        if (pixels == null) {
          if(gl){
            pixels = new Uint8Array(
              gl.drawingBufferWidth * gl.drawingBufferHeight * 4
            );
          } 
        }
        performance.mark(`draw-start-${frame}`);
        series.forEach((s: any, i: any) => {
          barSeries.decorate((program: any) => {
            fc
              .webglFillColor()
              .value((x: { [x: string]: any; }) => {
                const sensorValue = x[`sensor${i}`];
                let colorValue = getColorForVal(sensorValue);
                // @ts-ignore
                let { r, g, b, opacity } = d3.color(colorValue);
                return [r / 255, g / 255, b / 255, opacity];
              })
              .data(data)(program);
          })(s);
        });
  
        // Force GPU to complete rendering to allow accurate performance measurements to be taken
        gl?.readPixels(
          0,
          0,
          gl.drawingBufferWidth,
          gl.drawingBufferHeight,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          pixels
        );
        performance.measure(`draw-duration-${frame}`, `draw-start-${frame}`);
        const duration = performance.measure(
          `draw-duration-${frame}`,
          `draw-start-${frame}`
        );
        console.log(`Duration: ${duration.duration} milliseconds`);
        frame++;
      });
  
    container?.requestRedraw();
  });
  
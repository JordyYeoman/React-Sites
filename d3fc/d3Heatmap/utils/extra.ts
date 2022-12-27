// const zoom = d3
//   .zoom()
//   .extent([
//     [0, 0],
//     [width, height],
//   ])
//   .scaleExtent([1, 10])
//   .translateExtent([
//     [0, 0],
//     [width, height],
//   ])
//   .on("zoom", () => {
//     xScale.domain(d3.event.transform.rescaleX(xScaleCopy).domain());
//     yScale.domain(d3.event.transform.rescaleY(yScaleCopy).domain());
//     d3.select("d3fc-group").node().requestRedraw();
//   });

// const decorate = (selection) => {
//   selection
//     .enter()
//     .select(".plot-area")
//     .on("measure.range", () => {
//       xScaleCopy.range([0, d3.event.detail.width]);
//       yScaleCopy.range([d3.event.detail.height, 0]);
//     });
//   .call(zoom);
// };

export const SimpleChart = ({ chartId, data, width, height }: any) => {
  const id = chartId === undefined ? "chart" : chartId;
  const yExtent = fc
    .extentLinear()
    .accessors([(d: { high: any }) => d.high, (d: { low: any }) => d.low]);
  const xExtent = fc.extentTime().accessors([(d: { date: any }) => d.date]);

  const gridlines = fc.annotationSvgGridline();
  const candlestick = fc.seriesSvgCandlestick();
  const multi = fc.seriesSvgMulti().series([gridlines, candlestick]);

  const chart = fc
    .chartCartesian(d3.scaleTime(), d3.scaleLinear())
    .svgPlotArea(multi);

  chart.xDomain(xExtent(data));
  chart.yDomain(yExtent(data));

  const render = () => {
    d3.select(`#${id}`).datum(data).call(chart);
  };

  React.useEffect(() => {
    render();
  }, [data]);

  return (
    <div
      id={id}
      style={{
        width: width != undefined ? width : "100%",
        height: height != undefined ? height : "95vh",
      }}
    ></div>
  );
};

export const StreamingChart = ({
  initialData,
  next,
}: {
  initialData: any;
  next: any;
}) => {
  const [data, setData] = React.useState(initialData);
  const getNext = React.useCallback(() => next(), []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setData((prevData: any) => {
        const data = prevData.slice(1);
        const nextPoint = next();
        data.push(nextPoint);
        return data;
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <SimpleChart
      data={data}
      chartId="streaming-chart"
      width={"100%"}
      height={"100%"}
    />
  );
};

const stream = fc.randomFinancial().stream();
const initialData = stream.take(100);
export const ChartMan = () => (
  <StreamingChart initialData={initialData} next={stream.next} />
);

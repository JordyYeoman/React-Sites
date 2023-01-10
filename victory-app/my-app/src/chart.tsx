/* eslint-disable no-magic-numbers,react/no-multi-comp */
import React from "react";
import { range, merge, random, minBy, maxBy, last } from "lodash";
import { VictoryChart } from "victory-chart";
import { VictoryStack } from "victory-stack";
import { VictoryGroup } from "victory-group";
import { VictoryAxis } from "victory-axis";
import { VictoryArea } from "victory-area";
import { VictoryBar } from "victory-bar";
import { VictoryLine } from "victory-line";
import { VictoryScatter } from "victory-scatter";
import { VictoryZoomContainer } from "victory-zoom-container";
import { VictoryTooltip } from "victory-tooltip";
import { VictoryLegend } from "victory-legend";
import {
  CoordinatesPropType,
  DomainTuple,
  VictoryClipContainer,
  VictoryPortal,
  VictoryTheme,
} from "victory-core";

const allData = range(0, 10, 0.001).map((x: number) => ({
  x,
  y: (Math.sin((Math.PI * x) / 2) * x) / 10,
}));

interface CustomChartState {
  zoomedXDomain: DomainTuple;
}

class CustomChart extends React.Component<any, CustomChartState> {
  entireDomain: { x: DomainTuple; y: DomainTuple };

  constructor(props: any) {
    super(props);

    this.entireDomain = this.getEntireDomain(props);

    this.state = {
      zoomedXDomain: this.entireDomain.x,
    };
  }

  onDomainChange(domain: { x: DomainTuple; y: DomainTuple }) {
    this.setState({
      zoomedXDomain: domain.x,
    });
  }

  getData() {
    const { zoomedXDomain } = this.state;
    const { data, maxPoints } = this.props;
    const filtered = data.filter(
      (d: { x: number }) => d.x >= zoomedXDomain[0] && d.x <= zoomedXDomain[1]
    );

    if (filtered.length > maxPoints) {
      const k = Math.ceil(filtered.length / maxPoints);
      return filtered.filter((d: { x: number[] }, i: number) => i % k === 0);
    }
    return filtered;
  }

  getEntireDomain(props: { data: CoordinatesPropType[] }) {
    const { data }: { data: CoordinatesPropType[] } = props;

    const minPoint = minBy(data, (d: CoordinatesPropType) => d.y);
    const yMin = minPoint ? minPoint.y : 0;

    const maxPoint = maxBy(data, (d: CoordinatesPropType) => d.y);
    const yMax = maxPoint ? maxPoint.y : 0;

    const lastPoint = last(data);
    const xLast = lastPoint ? lastPoint.x : 0;

    const yArr: DomainTuple = [yMin, yMax];
    const xArr: DomainTuple = [data[0].x, xLast];

    return {
      x: xArr,
      y: yArr,
    };
  }

  render() {
    const renderedData = this.getData();
    return (
      <VictoryChart
        style={this.props.style}
        domain={this.entireDomain}
        containerComponent={
          <VictoryZoomContainer
            zoomDimension="x"
            onZoomDomainChange={this.onDomainChange.bind(this)}
            minimumZoom={{ x: 1 / 10000 }}
          />
        }
      >
        <VictoryScatter data={renderedData} />
      </VictoryChart>
    );
  }
}

interface VictoryZoomContainerDemoState {
  arrayData: number[][];
  barData: {
    x: number;
    y: number;
  }[];
  data: {
    a: number;
    b: number;
  }[];
  style: React.CSSProperties;
  transitionData: {
    x: number;
    y: number;
  }[];
  zoomDomain: {
    x?: DomainTuple;
    y?: DomainTuple;
  };
}

const parentStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  margin: "2%",
  maxWidth: "40%",
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
};

const makeData = () =>
  range(-50, 75).map((i: any) => ({ x: i, y: Math.random() }));

export default class VictoryZoomContainerDemo extends React.Component<
  any,
  VictoryZoomContainerDemoState
> {
  setStateInterval?: number = undefined;

  constructor(props: any) {
    super(props);
    this.state = {
      barData: makeData(),
      data: this.getData(),
      transitionData: this.getTransitionData(),
      arrayData: this.getArrayData(),
      style: {
        stroke: "blue",
        strokeWidth: 2,
      },
      zoomDomain: this.getZoomDomain(),
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData(),
        transitionData: this.getTransitionData(),
        style: this.getStyles(),
      });
    }, 30000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getZoomDomain() {
    const yZoomDomain: DomainTuple = [random(0, 0.4), random(0.6, 1)];

    return {
      y: yZoomDomain,
    };
  }

  getTransitionData() {
    const lines = random(6, 10);
    return range(lines).map((line: any) => {
      return { x: line, y: random(2, 10) };
    });
  }

  getData() {
    return range(5000).map((i: number) => {
      return {
        a: i + 20,
        b: Math.random(),
      };
    });
  }
  getArrayData() {
    return range(40).map((i: number) => [i, i + Math.random() * 3]);
  }

  getStyles() {
    const colors = ["red", "orange", "cyan", "green", "blue", "purple"];
    return {
      stroke: colors[random(0, 5)],
      strokeWidth: random(1, 5),
    };
  }
  render() {
    return (
      <div className="demo" style={containerStyle}>
        <VictoryChart
          style={{ parent: parentStyle }}
          //   animate={{ duration: 1500 }}
          domainPadding={{ x: 0, y: 0 }}
          containerComponent={
            <VictoryZoomContainer
              minimumZoom={{ x: 5 }}
              zoomDimension="x"
              downsample={10}
              clipContainerComponent={
                <VictoryClipContainer clipPadding={{ top: 15, bottom: 15 }} />
              }
            />
          }
        >
          <VictoryPortal>
            <VictoryScatter
              style={{ parent: parentStyle, data: { fill: "orange" } }}
              size={25}
              data={this.state.data}
              x="a"
              y="b"
            />
          </VictoryPortal>
        </VictoryChart>
      </div>
    );
  }
}

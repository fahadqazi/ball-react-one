import React from "react";
import * as d3 from "d3";
import "./Ball.css";

export default class Ball extends React.Component {
  constructor(props) {
    super(props);
    this.chart_width =
      props.width -
      props.margin.left -
      props.margin.right;
    this.chart_height =
      props.height -
      props.margin.top -
      props.margin.bottom;

    // this.data = props.data;

    this.state = {
      xScale: d3
        .scaleTime()
        .domain([d3.min(props.data, d => d.x), d3.max(props.data, d => d.x)])
        .rangeRound([0, this.chart_width]),

      yScale: d3
        .scaleLinear()
        .domain([d3.min(props.data, d => d.y), d3.max(props.data, d => d.y)])
        .rangeRound([this.chart_height, 0]),

      chart_width: this.chart_width,

      chart_height: this.chart_height,

      data: props.data

    };
  }

  chartRef = React.createRef();

  componentDidMount(){
    this.updateChart()
  }

  updateChart() {
    console.log('=================================================')
    const { margin, width, height, data } = this.props;
    const { xScale, yScale } = this.state;
    const chartElement = d3.select(this.chartRef.current);

    console.log('Data from update function: ', data)

      xScale.domain([d3.min(data, d => d.x), d3.max(data, d => d.x)])

      yScale.domain([d3.min(data, d => d.y), d3.max(data, d => d.y)])


    const svg = chartElement
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const line = d3
      .line()
      .curve(d3.curveBasis)
      .x(d => xScale(d.x))
      .y(d => yScale(d.y));

    svg
      .append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(0," + this.state.chart_height + ")")
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("class", "axis y-axis")
      .call(d3.axisLeft(yScale));

    svg
      .append("path")
      .datum(this.props.data)
      .attr("class", "line")
      .attr("d", line);
  }
/*
  static getDerivedStateFromProps(nextProps, prevState){
    const { xScale, yScale } = prevState;
    const data = nextProps.data;

    xScale.domain([d3.min(nextProps.data, d => d.x), d3.max(nextProps.data, d => d.x)])
    yScale.domain([d3.min(nextProps.data, d => d.y), d3.max(nextProps.data, d => d.y)])

    prevState = {...prevState, xScale, yScale, data}
    console.log('previous state: ', prevState)
    return prevState;
  }
*/

componentDidUpdate(prevProps, prevState){
    console.log('prevProps: ', prevProps)
    console.log('prevState: ', prevState)
    this.updateChart()
  }

  render() {
    const { width, height, data } = this.props;
    // console.log('Data from Ball render: ', data)
    return (
      <svg width={width} height={height}>
        <g ref={this.chartRef} />
      </svg>
    );
  }
}

import React from 'react';

import radarChart from '../utils/radarChart';

const RadarChart = React.createClass({

  displayName: 'RadarChart',

  componentWillReceiveProps(newProps) {
    this.updateChart(newProps);
  },

  componentDidMount() {
    this.updateChart(this.props);
  },

  updateChart(props) {
    let data;
    if (props.data) {
      let latestData = props.data.data[0]
      data = [
        {
          axes: Object.keys(latestData).map((d) => {
            return { axis: d, value: (Math.floor(Math.random() * 20) + 1)}
          }).filter((d) => d.axis != 'timestamp')

        }
      ];
    } else {
      data = [
        {
          axes: [
            {axis: "A", value: 6},
            {axis: "D", value: 7},
            {axis: "H", value: 10},
            {axis: "T", value: 13},
            {axis: "L", value: 9}
          ]
        }
      ];
    }


    let chart = radarChart.chart();

    chart.config({
      containerClass: 'radar-chart', // target with css, default stylesheet targets .radar-chart
      w: 175,
      h: 175,
      factor: 0.95,
      factorLegend: 1,
      levels: 3,
      maxValue: 0,
      radians: 2 * Math.PI,
      axisLine: true,
      axisText: true,
      circles: true,
      radius: 3,
      axisJoin: function(d, i) {
        return d.className || i;
      },
      transitionDuration: 300
    });

    let svg = d3.select(this.getDOMNode())
      .attr('width', 200)
      .attr('height', 200);

    svg.append('g').classed('focus', 1).datum(data).call(chart);
  },

  render() {
    return (
      <svg />
    );
  }

});

export default RadarChart;


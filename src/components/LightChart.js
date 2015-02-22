import React from 'react';
import ChartistGraph from 'react-chartist';
import d3 from 'd3';

const LightChart = React.createClass({

  displayName: 'LightChart',

  render() {
    var lightChart, lightData, high, low
    if (this.props.data) {
      var _light = this.props.data.data.map((d) => d['light'])
      var timestamp = this.props.data.data.map((d) => d['timestamp'])
      high = d3.max(_light)
      low = d3.min(_light)

      const biPolarLineChartOptions = {
        high: high || 0,
        low: low || 0,
        showArea: true,
        showLine: true,
        showPoint: false,
        axisX: {
          showLabel: false,
          showGrid: false
        }
      }

      lightData = {
        labels: timestamp,
        series: [
          _light
        ]
      }

      lightChart = <ChartistGraph data={lightData} options={biPolarLineChartOptions} type={'Line'} />
    }

    return (
      <section className='indicator light'>
        Light: {this.props.light} Lux
        { lightChart }
      </section>
    );
  }

});

export default LightChart;

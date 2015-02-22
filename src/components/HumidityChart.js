import React from 'react';
import ChartistGraph from 'react-chartist';
import d3 from 'd3';

const HumidityChart = React.createClass({

  displayName: 'HumidityChart',

  render() {
    var humidityChart, humidityData, high, low
    if (this.props.data) {
      var _humidity = this.props.data.data.map((d) => d['humidity'])
      var timestamp = this.props.data.data.map((d) => d['timestamp'])
      high = d3.max(_humidity)
      low = d3.min(_humidity)

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

      humidityData = {
        labels: timestamp,
        series: [
          _humidity
        ]
      }

      humidityChart = <ChartistGraph data={humidityData} options={biPolarLineChartOptions} type={'Line'} />
    }

    return (
      <section className='indicator humidity'>
        Humidity: {this.props.humidity} %
        { humidityChart }
      </section>
    );
  }

});

export default HumidityChart;

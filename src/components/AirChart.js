import React from 'react';
import ChartistGraph from 'react-chartist';
import d3 from 'd3';

const AirChart = React.createClass({

  displayName: 'AirChart',

  render() {
    var airChart, airData, high, low
    if (this.props.data) {
      var _air = this.props.data.data.map((d) => d['airquality_raw'])
      var timestamp = this.props.data.data.map((d) => d['timestamp'])
      high = d3.max(_air)
      low = d3.min(_air)

      const biPolarLineChartOptions = {
        high: high || 0,
        low: low || 0,
        showArea: true,
        showLine: false,
        showPoint: false,
        axisX: {
          showLabel: false,
          showGrid: false
        }
      }

      airData = {
        labels: timestamp,
        series: [
          _air
        ]
      }

      airChart = <ChartistGraph data={airData} options={biPolarLineChartOptions} type={'Line'} />
    }

    return (
      <section className='indicator aqi'>
        AQI: {this.props.aqi} mV
        { airChart }
      </section>
    );
  }

});

export default AirChart;

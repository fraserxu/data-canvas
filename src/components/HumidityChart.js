import React from 'react';
import ChartistGraph from 'react-chartist';
import d3 from 'd3';
import moment from 'moment';

const HumidityChart = React.createClass({

  displayName: 'HumidityChart',

  render() {
    var humidityChart, humidityData, high, low
    if (this.props.data) {
      var _humidity = this.props.data.data.map((d) => d['humidity'])
      var timestamp = this.props.data.data.map((d) => d['timestamp'])
      high = d3.max(_humidity)
      low = d3.min(_humidity)

      let _labels = timestamp
      if (this.props.dataRange == 'day') {
        _labels = timestamp.map((d) => moment(d).format('HH'))
      } else if (this.props.dataRange == 'week') {
        _labels = timestamp.map((d) => moment(d).format('dd'))
      } else if (this.props.dataRange == 'month') {
        _labels = timestamp.map((d) => moment(d).format('DD'))
      }

      const biPolarLineChartOptions = {
        high: 100,
        low: 0,
        showArea: true,
        showLine: false,
        showPoint: false,
        axisX: {
          showLabel: true,
          showGrid: false
        }
      }

      humidityData = {
        labels: _labels,
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

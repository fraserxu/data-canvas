import React from 'react';
import ChartistGraph from 'react-chartist';
import d3 from 'd3';
import moment from 'moment';

const LightChart = React.createClass({

  displayName: 'LightChart',

  render() {
    var lightChart, lightData, high, low
    if (this.props.data) {
      var _light = this.props.data.data.map((d) => d['light'])
      var timestamp = this.props.data.data.map((d) => d['timestamp'])
      high = d3.max(_light)
      low = d3.min(_light)

      let _labels = timestamp
      if (this.props.dataRange == 'day') {
        _labels = timestamp.map((d) => moment(d).format('HH'))
      } else if (this.props.dataRange == 'week') {
        _labels = timestamp.map((d) => moment(d).format('dd'))
      } else if (this.props.dataRange == 'month') {
        _labels = timestamp.map((d) => moment(d).format('DD'))
      }

      const biPolarLineChartOptions = {
        high: 2000,
        low: 0,
        showArea: true,
        showLine: false,
        showPoint: false,
        axisX: {
          showLabel: true,
          showGrid: false
        }
      }

      lightData = {
        labels: _labels,
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

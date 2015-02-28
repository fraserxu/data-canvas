import React from 'react';
import ChartistGraph from 'react-chartist';
import d3 from 'd3';
import moment from 'moment';

const NoiseChart = React.createClass({

  displayName: 'NoiseChart',

  render() {
    var noiseChart, airData, high, low
    if (this.props.data) {
      var _sound = this.props.data.data.map((d) => d['sound'])
      var timestamp = this.props.data.data.map((d) => d['timestamp'])
      high = d3.max(_sound)
      low = d3.min(_sound)

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

      airData = {
        labels: _labels,
        series: [
          _sound
        ]
      }

      noiseChart = <ChartistGraph data={airData} options={biPolarLineChartOptions} type={'Line'} />
    }

    return (
      <section className='indicator noise'>
        Noise: {this.props.noise} mV
        { noiseChart }
      </section>
    );
  }

});

export default NoiseChart;

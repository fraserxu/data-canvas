import React from 'react';
import ChartistGraph from 'react-chartist';
import d3 from 'd3';

const NoiseChart = React.createClass({

  displayName: 'NoiseChart',

  render() {
    var noiseChart, airData, high, low
    if (this.props.data) {
      var _sound = this.props.data.data.map((d) => d['sound'])
      var timestamp = this.props.data.data.map((d) => d['timestamp'])
      high = d3.max(_sound)
      low = d3.min(_sound)

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

      airData = {
        labels: timestamp,
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

import React from 'react';
import ChartistGraph from 'react-chartist';
import d3 from 'd3';
import moment from 'moment';

const LightChart = React.createClass({

  displayName: 'LightChart',

  render() {
    var lightChart, lightData, _light, timestamp, high, low, biPolarLineChartOptions;
    if (this.props.data) {
      if (!this.props.multiple) {
        _light = this.props.data.data.map((d) => d['light'])
        timestamp = this.props.data.data.map((d) => d['timestamp'])
        high = d3.max(_light)
        low = d3.min(_light)
        _light = [ _light ]
        biPolarLineChartOptions = {
          high: high || 150,
          low: low || 0,
          showArea: true,
          showLine: false,
          showPoint: false,
          axisX: {
            showLabel: true,
            showGrid: false
          }
        }
      } else {
        _light = this.props.data.map((d) => {
          return d.data.map((_d) => _d['light'])
        })
        timestamp = this.props.data[0].data.map((d) => d['timestamp'])
        high = d3.max(_light.map((light) => d3.max(light)))
        low = d3.min(_light.map((light) => d3.min(light)))
        biPolarLineChartOptions = {
          high: high || 150,
          low: low || 0,
          showArea: false,
          showLine: true,
          showPoint: true,
          axisX: {
            showLabel: true,
            showGrid: true
          }
        }
      }

      let _labels = timestamp
      if (this.props.dataRange == 'day') {
        _labels = timestamp.map((d) => moment(d).format('HH'))
      } else if (this.props.dataRange == 'week') {
        _labels = timestamp.map((d) => moment(d).format('dd'))
      } else if (this.props.dataRange == 'month') {
        _labels = timestamp.map((d) => moment(d).format('DD'))
      }

      lightData = {
        labels: _labels,
        series: _light
      }

      lightChart = <ChartistGraph data={lightData} options={biPolarLineChartOptions} type={'Line'} />
    }

    const isLast = this.props.last
    const description = `The light sensor measures digital light, or illuminance. `

    return (
      <section className='indicator light'>
        Light (<span className={`help hint--${isLast ? 'left' : 'bottom'}`} data-hint={`${description}`}>?</span>) : {this.props.light} Lux
        { lightChart }
      </section>
    );
  }

});

export default LightChart;

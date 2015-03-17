import React from 'react';
import ChartistGraph from 'react-chartist';
import d3 from 'd3';
import moment from 'moment';

const TemperatureChart = React.createClass({

  displayName: 'TemperatureChart',

  render() {
    var temperatureChart, temeratureData, _data, timestamp, high, low, biPolarLineChartOptions;
    if (this.props.data) {
      if (!this.props.multiple) {
        _data = this.props.data.data.map((d) => d['temperature'])
        timestamp = this.props.data.data.map((d) => d['timestamp'])
        high = d3.max(_data)
        low = d3.min(_data)
        _data = [ _data ]
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
        _data = this.props.data.map((d) => {
          return d.data.map((_d) => _d['temperature'])
        })
        timestamp = this.props.data[0].data.map((d) => d['timestamp'])
        high = d3.max(_data.map((data) => d3.max(data)))
        low = d3.min(_data.map((data) => d3.min(data)))
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

      temeratureData = {
        labels: _labels,
        series: _data
      }

      temperatureChart = <ChartistGraph data={temeratureData} options={biPolarLineChartOptions} type={'Line'} />
    }

    const isLast = this.props.last
    const description = `Unit: degree celsius.`

    return (
      <section className='indicator temperature'>
        Temperature (<span className={`help hint--${isLast ? 'left' : 'bottom'}`} data-hint={`${description}`}>?</span>) : {this.props.temperature} °C
        { temperatureChart }
      </section>
    );
  }

});

export default TemperatureChart;

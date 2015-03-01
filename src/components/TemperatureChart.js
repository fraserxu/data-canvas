import React from 'react';
import ChartistGraph from 'react-chartist';
import d3 from 'd3';
import moment from 'moment';

const TemperatureChart = React.createClass({

  displayName: 'TemperatureChart',

  render() {
    var temperatureChart, temeratureData
    if (this.props.data) {
      var _air = this.props.data.data.map((d) => d['temperature'])
      var timestamp = this.props.data.data.map((d) => d['timestamp'])
      // high = d3.max(_air)
      // low = d3.min(_air)

      let _labels = timestamp
      if (this.props.dataRange == 'day') {
        _labels = timestamp.map((d) => moment(d).format('HH'))
      } else if (this.props.dataRange == 'week') {
        _labels = timestamp.map((d) => moment(d).format('dd'))
      } else if (this.props.dataRange == 'month') {
        _labels = timestamp.map((d) => moment(d).format('DD'))
      }

      const biPolarLineChartOptions = {
        high: 50,
        low: -10,
        showArea: true,
        showLine: false,
        showPoint: false,
        axisX: {
          showLabel: true,
          showGrid: false
        }
      }

      temeratureData = {
        labels: _labels,
        series: [
          _air
        ]
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

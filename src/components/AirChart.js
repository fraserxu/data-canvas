import React from 'react';
import ChartistGraph from 'react-chartist';
import d3 from 'd3';
import moment from 'moment';

const AirChart = React.createClass({

  displayName: 'AirChart',

  render() {
    var airChart, airData
    if (this.props.data) {
      var _air = this.props.data.data.map((d) => d['airquality_raw'])
      var timestamp = this.props.data.data.map((d) => d['timestamp'])
      var high = d3.max(_air)
      var low = d3.min(_air)

      let _labels = timestamp
      if (this.props.dataRange == 'day') {
        _labels = timestamp.map((d) => moment(d).format('HH'))
      } else if (this.props.dataRange == 'week') {
        _labels = timestamp.map((d) => moment(d).format('dd'))
      } else if (this.props.dataRange == 'month') {
        _labels = timestamp.map((d) => moment(d).format('DD'))
      }

      const biPolarLineChartOptions = {
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

      airData = {
        labels: _labels,
        series: [
          _air
        ]
      }

      airChart = <ChartistGraph data={airData} options={biPolarLineChartOptions} type={'Line'} />
    }

    const isLast = this.props.last

    return (
      <section className='indicator aqi'>
        AQI (<span className={`help hint--${isLast ? 'left' : 'bottom'}`} data-hint='Measures when harmful target gases (second hand smoke, carbon monoxide, alcohol etc.) are triggered and expresses their combined concentration in raw voltage. Higher output is associated with increased pollutant gases. Peaks may happen around rush hour, when a bus or truck drives by, or during construction.'>?</span>) : {this.props.aqi} mV
        { airChart }
      </section>
    );
  }

});

export default AirChart;

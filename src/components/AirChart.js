import React from 'react';
import ChartistGraph from 'react-chartist';
import d3 from 'd3';
import moment from 'moment';

const AirChart = React.createClass({

  displayName: 'AirChart',

  render() {
    let airChart, airData, _air, timestamp, high, low, biPolarLineChartOptions;
    if (this.props.data) {
      if (!this.props.multiple) {
        _air = this.props.data.data.map((d) => d['airquality_raw'])
        timestamp = this.props.data.data.map((d) => d['timestamp'])
        high = d3.max(_air)
        low = d3.min(_air)
        _air = [ _air ]
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
        _air = this.props.data.map((d) => {
          return d.data.map((_d) => _d['airquality_raw'])
        })
        timestamp = this.props.data[0].data.map((d) => d['timestamp'])
        high = d3.max(_air.map((air) => d3.max(air)))
        low = d3.min(_air.map((air) => d3.min(air)))
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

      airData = {
        labels: _labels,
        series: _air
      }

      airChart = <ChartistGraph data={airData} options={biPolarLineChartOptions} type={'Line'} />
    }

    const isLast = this.props.last

    return (
      <section className='indicator aqi'>
        Pollution (<span className={`help hint--${isLast ? 'left' : 'bottom'}`} data-hint='Measures when harmful target gases (second hand smoke, carbon monoxide, alcohol etc.) are triggered and expresses their combined concentration in raw voltage. Higher output is associated with increased pollutant gases. Peaks may happen around rush hour, when a bus or truck drives by, or during construction.'>?</span>) : {this.props.aqi} mV
        { airChart }
      </section>
    );
  }

});

export default AirChart;

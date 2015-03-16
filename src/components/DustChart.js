import React from 'react';
import ChartistGraph from 'react-chartist';
import d3 from 'd3';
import moment from 'moment';

const DustChart = React.createClass({

  displayName: 'DustChart',

  render() {
    let dustChart, dustData, _dust, timestamp, high, low;
    if (this.props.data) {
      if (!this.props.multiple) {
        _dust = this.props.data.data.map((d) => d['dust'])
        timestamp = this.props.data.data.map((d) => d['timestamp'])
        high = d3.max(_dust)
        low = d3.min(_dust)
        _dust = [ _dust ]
      } else {
        _dust = this.props.data.map((d) => {
          return d.data.map((_d) => _d['dust'])
        })
        timestamp = this.props.data[0].data.map((d) => d['timestamp'])
        high = d3.max(_dust.map((dust) => d3.max(dust)))
        low = d3.min(_dust.map((dust) => d3.min(dust)))
      }

      let _labels = timestamp
      if (this.props.dataRange == 'day') {
        _labels = timestamp.map((d) => moment(d).format('HH'))
      } else if (this.props.dataRange == 'week') {
        _labels = timestamp.map((d) => moment(d).format('dd'))
      } else if (this.props.dataRange == 'month') {
        _labels = timestamp.map((d) => moment(d).format('DD'))
      }

      const biPolarLineChartOptions = {
        high: high || 3000,
        low: low || 0,
        showArea: true,
        showLine: false,
        showPoint: false,
        axisX: {
          showLabel: true,
          showGrid: false
        }
      }

      dustData = {
        labels: _labels,
        series: _dust
      }

      dustChart = <ChartistGraph data={dustData} options={biPolarLineChartOptions} type={'Line'} />
    }

    const isLast = this.props.last
    const description = `Measures the concentration of PM above 1 micrometer in size, as opposed to weight of PM. This sensor has a detection range of of [0-28’000 pcs/liter].`

    return (
      <section className='indicator dust'>
        Dust (<span className={`help hint--${isLast ? 'left' : 'bottom'}`} data-hint={`${description}`}>?</span>) : {this.props.dust} pcs/238mL
        { dustChart }
      </section>
    );
  }

});

export default DustChart;

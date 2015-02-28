import React from 'react';
import ChartistGraph from 'react-chartist';
import d3 from 'd3';
import moment from 'moment';

const DustChart = React.createClass({

  displayName: 'DustChart',

  render() {
    var dustChart, dustData, high, low
    if (this.props.data) {
      var _dust = this.props.data.data.map((d) => d['dust'])
      var timestamp = this.props.data.data.map((d) => d['timestamp'])
      // high = d3.max(_dust)
      // low = d3.min(_dust)

      let _labels = timestamp
      if (this.props.dataRange == 'day') {
        _labels = timestamp.map((d) => moment(d).format('HH'))
      } else if (this.props.dataRange == 'week') {
        _labels = timestamp.map((d) => moment(d).format('dd'))
      } else if (this.props.dataRange == 'month') {
        _labels = timestamp.map((d) => moment(d).format('DD'))
      }

      const biPolarLineChartOptions = {
        high: 3000,
        low: 0,
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
        series: [
          _dust
        ]
      }

      dustChart = <ChartistGraph data={dustData} options={biPolarLineChartOptions} type={'Line'} />
    }

    return (
      <section className='indicator dust'>
        Dust: {this.props.dust} pcs/238mL
        { dustChart }
      </section>
    );
  }

});

export default DustChart;

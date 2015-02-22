import React from 'react';
import ChartistGraph from 'react-chartist';
import d3 from 'd3';

const DustChart = React.createClass({

  displayName: 'DustChart',

  render() {
    var dustChart, dustData, high, low
    if (this.props.data) {
      var _dust = this.props.data.data.map((d) => d['dust'])
      var timestamp = this.props.data.data.map((d) => d['timestamp'])
      high = d3.max(_dust)
      low = d3.min(_dust)

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

      dustData = {
        labels: timestamp,
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

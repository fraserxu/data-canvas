import React from 'react';
import ChartistGraph from 'react-chartist';
import d3 from 'd3';
import moment from 'moment';
import $ from 'jquery';

const HumidityChart = React.createClass({

  displayName: 'HumidityChart',

  componentDidMount() {
    let el = this.getDOMNode();
    let $chart = $(el).find('.ct-chart');

    $chart.css({ position: 'relative'});

    let $toolTip = $chart
      .append('<div class="tooltip"></div>')
      .find('.tooltip')
      .hide();

    $chart.on('mouseenter', '.ct-point', function() {
      let $point = $(this),
        value = $point.attr('ct:value'),
        seriesName = $point.parent().attr('ct:series-name');
      $toolTip.html(seriesName + '<br>' + value).show();
    });

    $chart.on('mouseleave', '.ct-point', function() {
      $toolTip.hide();
    });

    $chart.on('mousemove', function(event) {
      $toolTip.css({
        left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
        top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height() - 40
      });
    });
  },

  render() {
    var humidityChart, humidityData, _humidity, timestamp, high, low, biPolarLineChartOptions;
    if (this.props.data) {
      if (!this.props.multiple) {
        _humidity = this.props.data.data.map((d) => d['humidity'])
        timestamp = this.props.data.data.map((d) => d['timestamp'])
        high = d3.max(_humidity)
        low = d3.min(_humidity)
        _humidity = [ _humidity ]
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
        _humidity = this.props.data.map((d) => {
          return {
            name: d.data[0].city,
            data: d.data.map((_d) => _d['humidity'])
          }
        })
        timestamp = this.props.data[0].data.map((d) => d['timestamp'])
        high = d3.max(_humidity.map((humidity) => d3.max(humidity.data)))
        low = d3.min(_humidity.map((humidity) => d3.min(humidity.data)))
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

      humidityData = {
        labels: _labels,
        series: _humidity
      }

      humidityChart = <ChartistGraph data={humidityData} options={biPolarLineChartOptions} type={'Line'} />
    }

    const isLast = this.props.last
    const description = `relative humidity is expressed as percentage and measures the absolute humidity relative to the maximum for that temperature. This sensor can detect RH from 5 to 99%. `

    return (
      <section className='indicator humidity'>
        Humidity (<span className={`help hint--${isLast ? 'left' : 'bottom'}`} data-hint={`${description}`}>?</span>) : {this.props.humidity} %
        { humidityChart }
      </section>
    );
  }

});

export default HumidityChart;

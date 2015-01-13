'use strict'

var React = require('react')
var d3 = require('d3')

var DATA_URL = 'https://localdata-sensors.herokuapp.com/api/sources/ci4s0caqw000002wey2s695ph/entries?startIndex=0&count=100000'

var Sparkline = React.createClass({

  displayName: 'Sparkline',

  getDefaultProps() {
    return {
      width: 960,
      height: 500
    }
  },

  componentDidMount() {

    var margin = {top: 20, right: 20, bottom: 30, left: 50}
    var foot = {height: 30}
    var width = this.props.width - margin.left - margin.right
    var height = this.props.height - margin.top - margin.bottom

    var parseDate = d3.time.format("%Y-%m-%d %X").parse

    var xScale = d3.time.scale()
      .range([0, width])

    var yScale = d3.scale.linear()
      .range([height, 0])

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')

    var line = d3.svg.line()
      .interpolate('basis')
      .x(function(d) { return xScale(d.date) })
      .y(function(d) { return yScale(d.aqi) })

    var svg = d3.select(this.getDOMNode()).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    d3.json(DATA_URL, function(data) {
      data.forEach(function(d) {
        d.date = parseDate(d['timestamp'].replace('T', ' ').replace('.000Z', ''))
        d.aqi = +d.data['airquality_raw']
      })

      console.log('data', data)

      xScale.domain([data[0].date, data[data.length - 1].date])
      yScale.domain(d3.extent(data, function(d) { return d.aqi }))

      svg.append('linearGradient')
        .attr('id', 'aqi-gradient')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0).attr('y1', yScale(d3.min(data, function(d) { return d.aqi })))
        .attr('x2', 0).attr('y2', yScale(d3.max(data, function(d) { return d.aqi })))
        .selectAll('stop')
        .data([
          {offset: '0%', color: 'green'},
          {offset: '25%', color: 'yellow'},
          {offset: '50%', color: 'orange'},
          {offset: '75%', color: 'red'},
          {offset: '100%', color: 'purple'}
        ])
        .enter()
        .append('stop')
        .attr('offset', function(d) { return d.offset })
        .attr('stop-color', function(d) { return d.color })

      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)

      svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('AQI')

      svg.append('path')
        .datum(data)
        .attr('class', 'line gradient')
        .attr('d', line)
    })

  },

  render() {
    return (
      <div />
    )
  }

})

module.exports = Sparkline
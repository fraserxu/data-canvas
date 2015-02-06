'use strict'

var React = require('react')
var d3 = require('d3')
var moment = require('moment')

var Sparkline = React.createClass({

  displayName: 'Sparkline',

  getDefaultProps() {
    return {
      width: 600,
      height: 300,
      type: 'chart'
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) this.drawChart(nextProps.data)
  },

  drawChart(data) {
    var el = this.getDOMNode()
    while (el.firstChild) {
      el.removeChild(el.firstChild)
    }

    var margin = {top: 20, right: 20, bottom: 30, left: 50}
    var foot = {height: 30}
    var width = this.props.width - margin.left - margin.right
    var height = this.props.height - margin.top - margin.bottom

    function formatDate(d) {
      var parseDate = d3.time.format("%Y-%m-%d %X").parse
      return parseDate(moment(d['timestamp']).format().replace('T', ' ').replace('+08:00', ''))
    }

    var xScale = d3.time.scale().range([width, 0])
    var yScale = d3.scale.linear().range([height - 20, 20])

    var xAxis = d3.svg.axis().scale(xScale).orient('bottom')
    var yAxis = d3.svg.axis().scale(yScale).orient('left')

    var line = d3.svg.line()
      .interpolate('basis')
      .x((d) => {
        return xScale(formatDate(d))
      })
      .y((d) => {
        return yScale(d.data[this.props.indicator])
      })

    var svg = d3.select(this.getDOMNode()).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    var min = formatDate(data[0])
    var max = formatDate(data[data.length - 1])
    xScale.domain( [min, max] )
    yScale.domain(d3.extent(data.map((item) => item.data[this.props.indicator])))

    svg.append('linearGradient')
      .attr('id', 'aqi-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0).attr('y1', yScale(d3.min(data, (d) => d.data[this.props.indicator] )))
      .attr('x2', 0).attr('y2', yScale(d3.max(data, (d) => d.data[this.props.indicator] )))
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
      .attr('offset', (d) => d.offset)
      .attr('stop-color', (d) => d.color)

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + (height - 20) + ')')
      .call(xAxis)

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text(this.props.type)

    svg.append('path')
      .datum(data)
      .attr('class', 'line gradient')
      .attr('d', line)
  },

  render() {
    return (
      <div className='body' />
    )
  }

})

module.exports = Sparkline

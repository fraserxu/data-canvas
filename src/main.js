'use strict'

var React = require('react')
var api = require('./utils/api')

var Sparkline = require('./components/Sparkline')
var SparklineLegend = require('./components/SparklineLegend')

var App = React.createClass({

  displayName: 'App',

  getInitialState: function() {
    return {
      data: []
    };
  },

  componentDidMount() {
    this.fetchData('', {})
  },

  fetchData(url, options) {
    api.fetchData(url = '', options = {}, (err, data) => {
      if (this.isMounted()) this.setState({data: data})
    })
  },

  render() {
    return (
      <div>
        <header>Realtime Airquality data from Wiredcraft office</header>
        <Sparkline data={this.state.data} />
        <SparklineLegend />
      </div>
    )
  }

})

React.render(<App />, document.body)

'use strict'

var React = require('react')
var api = require('./utils/api')

var Air = require('./components/Air')
var Temperature = require('./components/Temperature')
var Dust = require('./components/Dust')
var Sound = require('./components/Sound')
var Humidity = require('./components/Humidity')
var UV = require('./components/UV')
var Light = require('./components/Light')

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
        <Air data={this.state.data} />
        <Temperature data={this.state.data} />
        <Dust data={this.state.data} />
        <Sound data={this.state.data} />
        <Humidity data={this.state.data} />
        <UV data={this.state.data} />
        <Light data={this.state.data} />
      </div>
    )
  }

})

React.render(<App />, document.body)

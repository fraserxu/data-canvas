'use strict'

var React = require('react')
var qs = require('querystring')
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
    try {
      var search = location.search.replace('?', '')
      var source = qs.parse(search).source
      this.fetchData('', {
        source: source
      })
    } catch (e) {
      this.fetchData('', {})
    }
  },

  fetchData(url, options) {
    api.fetchData(url, options, (err, data) => {
      if (this.isMounted()) this.setState({data: data})
    })
  },

  render() {
    var address = 'loading address...'
    if (this.state.data[0]) {
      address = this.state.data[0].address.display_name
    }

    return (
      <div>
        <header>
          <h1>Realtime sensor data from <small><i>{address}</i></small></h1>
          <i>To use your own data, add "?source=YOUR_SOURCE" to the url in the address bar.</i>
          <p>
            <i>© Made by <a href='https://fraserxu.me'>Fraser Xu</a>.</i>
          </p>
        </header>

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

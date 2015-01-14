'use strict'

var React = require('react')
var Sparkline = require('./components/Sparkline')

var App = React.createClass({

  displayName: 'App',

  render() {
    return (
      <div>
        <header>Realtime Airquality data from Wiredcraft office</header>
        <Sparkline />
      </div>
    )
  }

})

React.render(<App />, document.body)

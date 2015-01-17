var React = require('react');
var Sparkline = require('./Sparkline');

var Temperature = React.createClass({

  displayName: 'Temperature',

  render() {
    return (
      <section className='container'>
        <Sparkline data={this.props.data} indicator={'temperature'} type={'Temperature(℃)'} />
      </section>
    );
  }

});

module.exports = Temperature;

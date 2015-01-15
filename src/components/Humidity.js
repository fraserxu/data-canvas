var React = require('react');
var Sparkline = require('./Sparkline');

var Humidity = React.createClass({

  displayName: 'Humidity',

  render() {
    return (
      <section className='container'>
        <Sparkline data={this.props.data} indicator={'humidity'} type={'Humidity'} yDomain={[0, 100]}/>
      </section>
    );
  }

});

module.exports = Humidity;

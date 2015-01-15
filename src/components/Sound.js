var React = require('react');
var Sparkline = require('./Sparkline');

var Sound = React.createClass({

  displayName: 'Sound',

  render() {
    return (
      <section className='container'>
        <Sparkline data={this.props.data} indicator={'sound'} type={'Sound'} yDomain={[500, 3000]}/>
      </section>
    );
  }

});

module.exports = Sound;

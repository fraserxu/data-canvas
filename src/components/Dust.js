var React = require('react');
var Sparkline = require('./Sparkline');

var Dust = React.createClass({

  displayName: 'Dust',

  render() {
    return (
      <section className='container'>
        <Sparkline data={this.props.data} indicator={'dust'} type={'Dust'} yDomain={[100, 4500]}/>
      </section>
    );
  }

});

module.exports = Dust;

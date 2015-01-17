var React = require('react');
var Sparkline = require('./Sparkline');

var Dust = React.createClass({

  displayName: 'Dust',

  render() {
    return (
      <section className='container'>
        <Sparkline data={this.props.data} indicator={'dust'} type={'Dust'} />
      </section>
    );
  }

});

module.exports = Dust;

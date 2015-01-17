var React = require('react');
var Sparkline = require('./Sparkline');

var UV = React.createClass({

  displayName: 'UV',

  render() {
    return (
      <section className='container'>
        <Sparkline data={this.props.data} indicator={'uv'} type={'UV'} />
      </section>
    );
  }

});

module.exports = UV;

var React = require('react');

var SparklineLegend = React.createClass({

  displayName: 'SparklineLegend',

  render() {
    return (
      <table>
        <tbody>
        <tr>
        <td>Very low</td>
        <td style={{ 'background' : '#79bc6a;'}}>0/25</td>
        </tr>
        <tr>
        <td>Low</td>
        <td style={{ 'background' : '#bbcf4c;'}}>25/50</td>
        </tr>
        <tr>
        <td>Medium</td>
        <td style={{ 'background' : '#eec20b;'}}>50/75</td>
        </tr>
        <tr>
        <td>High</td>
        <td style={{ 'background' : '#f29305;'}}>75/100</td>
        </tr>
        <tr>
        <td>Very high</td>
        <td style={{ 'background' : '#e8416f;'}}>&gt;100</td>
        </tr>
        </tbody>
      </table>
    );
  }

});

module.exports = SparklineLegend;

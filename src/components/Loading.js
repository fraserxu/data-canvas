const React = require('react');

const BARS = '<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\">\n  <path transform=\"translate(2)\" d=\"M0 12 V20 H4 V12z\"> \n    <animate attributeName=\"d\" values=\"M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z\" dur=\"1.2s\" repeatCount=\"indefinite\" begin=\"0\" keytimes=\"0;.2;.5;1\" keySplines=\"0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8\" calcMode=\"spline\"  />\n  </path>\n  <path transform=\"translate(8)\" d=\"M0 12 V20 H4 V12z\">\n    <animate attributeName=\"d\" values=\"M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z\" dur=\"1.2s\" repeatCount=\"indefinite\" begin=\"0.2\" keytimes=\"0;.2;.5;1\" keySplines=\"0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8\" calcMode=\"spline\"  />\n  </path>\n  <path transform=\"translate(14)\" d=\"M0 12 V20 H4 V12z\">\n    <animate attributeName=\"d\" values=\"M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z\" dur=\"1.2s\" repeatCount=\"indefinite\" begin=\"0.4\" keytimes=\"0;.2;.5;1\" keySplines=\"0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8\" calcMode=\"spline\" />\n  </path>\n  <path transform=\"translate(20)\" d=\"M0 12 V20 H4 V12z\">\n    <animate attributeName=\"d\" values=\"M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z\" dur=\"1.2s\" repeatCount=\"indefinite\" begin=\"0.6\" keytimes=\"0;.2;.5;1\" keySplines=\"0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8\" calcMode=\"spline\" />\n  </path>\n  <path transform=\"translate(26)\" d=\"M0 12 V20 H4 V12z\">\n    <animate attributeName=\"d\" values=\"M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z\" dur=\"1.2s\" repeatCount=\"indefinite\" begin=\"0.8\" keytimes=\"0;.2;.5;1\" keySplines=\"0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8\" calcMode=\"spline\" />\n  </path>\n</svg>\n'
const BUBBLES = '<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\">\n  <circle transform=\"translate(8 0)\" cx=\"0\" cy=\"16\" r=\"0\"> \n    <animate attributeName=\"r\" values=\"0; 4; 0; 0\" dur=\"1.2s\" repeatCount=\"indefinite\" begin=\"0\"\n      keytimes=\"0;0.2;0.7;1\" keySplines=\"0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8\" calcMode=\"spline\" />\n  </circle>\n  <circle transform=\"translate(16 0)\" cx=\"0\" cy=\"16\" r=\"0\"> \n    <animate attributeName=\"r\" values=\"0; 4; 0; 0\" dur=\"1.2s\" repeatCount=\"indefinite\" begin=\"0.3\"\n      keytimes=\"0;0.2;0.7;1\" keySplines=\"0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8\" calcMode=\"spline\" />\n  </circle>\n  <circle transform=\"translate(24 0)\" cx=\"0\" cy=\"16\" r=\"0\"> \n    <animate attributeName=\"r\" values=\"0; 4; 0; 0\" dur=\"1.2s\" repeatCount=\"indefinite\" begin=\"0.6\"\n      keytimes=\"0;0.2;0.7;1\" keySplines=\"0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8\" calcMode=\"spline\" />\n  </circle>\n</svg>\n'

const SVGs = {
  bars: BARS,
  bubbles: BUBBLES
};

const Loading = React.createClass({
  displayName: 'Loading',

  getDefaultProps: function() {
    return {
      color: '#fff',
      height: 64,
      type: 'balls',
      width: 64
    };
  },

  propTypes: {
    color: React.PropTypes.string,
    height: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    type: React.PropTypes.string,
    width: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ])
  },

  render: function () {
    const svg = SVGs[this.props.type];
    const svgStyle = {
      fill: this.props.color,
      height: this.props.height,
      width: this.props.width
    };

    return (
      <img style={svgStyle} src={'data:image/svg+xml;utf8,'+svg} />
    );
  }
});

export default Loading;

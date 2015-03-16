import React from 'react';
import { addons } from 'react/addons';

import City from './components/City';
import cities from './data/cities.json';

const { PureRenderMixin } = addons;

const App = React.createClass({

  displayName: 'App',

  mixins: [PureRenderMixin],

  getInitialState() {
    return {
      cities: cities,
      dataRange: 'day',
      type: 'overall',
      selectedCity: 'Shanghai'
    };
  },

  setRange(value) {
    this.setState({
      dataRange: value
    })
  },

  setType(value) {
    this.setState({
      type: value
    })
  },

  setCity(value) {
    this.setState({
      type: 'specific',
      selectedCity: value.target.getAttribute('name')
    })
  },

  render() {
    const { dataRange, cities } = this.state

    return (
      <div className='main'>
        <header>
          <div className='control left'>
            <ul className='options'>
              <li className={this.state.type == 'overall' ? 'active' : ''} onClick={this.setType.bind(this, 'overall')}>Overall</li>
              <li className={this.state.type == 'specific' ? 'active' : ''} onClick={this.setType.bind(this, 'specific')}>Specific</li>
            </ul>
          </div>
          <div className='title'>Data Canvas - Sense your city</div>
          <div className='control right'>
            <span className='label'>View by:</span>
            <ul className='options'>
              <li className={this.state.dataRange == 'day' ? 'active' : ''} onClick={this.setRange.bind(this, 'day')}>DAY</li>
              <li className={this.state.dataRange == 'week' ? 'active' : ''} onClick={this.setRange.bind(this, 'week')}>WEEK</li>
              <li className={this.state.dataRange == 'month' ? 'active' : ''} onClick={this.setRange.bind(this, 'month')}>MONTH</li>
            </ul>
          </div>
        </header>
        <section className='wrapper'>
          { this.state.type === 'overall' &&
            <div className='row'>
              {Object.keys(cities).map((city, index) => {
                return <City type={'overall'} key={city} setCity={this.setCity} name={city} last={(Object.keys(cities).length - 1) === index} id={cities[city]} dataRange={dataRange} />
              })}
            </div>
          }
          { this.state.type === 'specific' &&
            <div className='row'>
              <City type={'specific'} name={this.state.selectedCity} id={cities[this.state.selectedCity]} dataRange={dataRange} />
            </div>
          }
        </section>
        <footer>
          <p>Image data from Yahoo flickr weather project</p>
          <p>Weather data and icon from openweathermap</p>
          Made with &lt;3 by <a href='http://fraserxu.me'>Fraser Xu</a>
        </footer>
      </div>
    );
  }

});

React.render(<App />, document.body);

// dev
window.React = React;


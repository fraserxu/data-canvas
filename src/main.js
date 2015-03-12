import React from 'react';

import City from './components/City';
import cities from './data/cities.json';

window.React = React;

const App = React.createClass({

  displayName: 'App',

  getInitialState() {
    return {
      cities: cities,
      dataRange: 'day'
    };
  },

  setRange(value) {
    this.setState({
      dataRange: value
    })
  },

  render() {
    const { dataRange, cities } = this.state

    return (
      <div className='main'>
        <header>
          <div className='title'>Data Canvas - Sense your city</div>
          <div className='control'>
            <span className='label'>View by:</span>
            <ul className='options'>
              <li className={this.state.dataRange == 'day' ? 'active' : ''} onClick={this.setRange.bind(this, 'day')}>DAY</li>
              <li className={this.state.dataRange == 'week' ? 'active' : ''} onClick={this.setRange.bind(this, 'week')}>WEEK</li>
              <li className={this.state.dataRange == 'month' ? 'active' : ''} onClick={this.setRange.bind(this, 'month')}>MONTH</li>
            </ul>
          </div>
        </header>
        <section className='wrapper'>
          <div className='row'>
            {Object.keys(cities).map((city, index) => {
              return <City key={city} name={city} last={(Object.keys(cities).length - 1) === index} id={cities[city]} dataRange={dataRange} />
            })}
          </div>
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

import React from 'react';
// import { addons } from 'react/addons';

import City from './components/City';
import ComparedCities from './components/ComparedCities';
import cities from './data/cities.json';

// const { PureRenderMixin } = addons;

const App = React.createClass({

  displayName: 'App',

  // mixins: [PureRenderMixin],

  getInitialState() {
    return {
      cities: cities,
      dataRange: 'day',
      type: 'overall',
      selectedCity: 'Shanghai',
      comparedCities: ['Shanghai']
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

  setSelectedCity(value) {
    let { comparedCities } = this.state;
    if (comparedCities.indexOf(value) >= 0) {
      comparedCities.splice(comparedCities.indexOf(value), 1);
    } else {
      comparedCities.push(value);
    }
    console.log('comparedCities', comparedCities);
    this.setState({
      comparedCities: comparedCities
    });
  },

  render() {
    let { dataRange, cities, comparedCities } = this.state
    let colors = ['#d70206', '#f05b4f', '#f4c63d', '#d17905', '#453d3f', '#59922b', '#0544d3']

    return (
      <div className='main'>
        <header>
          <div className='control left'>
            <ul className='options'>
              <li className={this.state.type == 'overall' ? 'active' : ''} onClick={this.setType.bind(this, 'overall')}>Overall</li>
              <li className={this.state.type == 'specific' ? 'active' : ''} onClick={this.setType.bind(this, 'specific')}>Specific</li>
              <li className={this.state.type == 'compare' ? 'active' : ''} onClick={this.setType.bind(this, 'compare')}>Compare</li>
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
          { this.state.type === 'compare' &&
            <div>
              <div className='selector'>
                <ul className='cities'>
                  {Object.keys(cities).map((city, index) => {
                    let style;
                    let selected = (comparedCities.indexOf(city) >= 0) ? 'selected' : '';
                    if (selected) {
                      style = {
                        borderBottom: `2px solid ${colors[comparedCities.indexOf(city)]}`
                      }
                    }
                    return <li style={style} className={selected} onClick={this.setSelectedCity.bind(this, city)} key={index}>{city}</li>
                  })}
                </ul>
              </div>

              <div className='row'>
                <ComparedCities type='compare' cities={comparedCities} dataRange={dataRange} />
              </div>
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


import React from 'react';

import City from './components/City';
import cities from './data/cities.json';

window.React = React

const App = React.createClass({

  displayName: 'App',

  getInitialState() {
    return {
      cities: cities
    };
  },

  render() {
    const { cities } = this.state

    return (
      <div className='main'>
        <header>Data Canvas - Sense your city</header>
        <section className='wrapper'>
          <div className='row'>
            {Object.keys(cities).map((city) => {
              return <City key={city} name={city} id={cities[city]} />
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

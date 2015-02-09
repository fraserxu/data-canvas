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
    var { cities } = this.state

    return (
      <section className='container'>
        {Object.keys(cities).map((city) => {
          return <City key={city} name={city} id={cities[city]} />
        })}
      </section>
    );
  }

});


React.render(<App />, document.body);

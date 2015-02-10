import React from 'react';

import api from '../utils/api';

const City = React.createClass({

  displayName: 'City',

  getInitialState() {
    return {
      data: null
    };
  },

  componentWillMount() {
    this.fetchData()
  },

  fetchData() {
    api.getWeatherByCityID(this.props.id, (data) => {
      api.fetchCityData(this.props.name, {}, (sensorData) => {
        this.setState({
          data: data,
          sensorData: sensorData
        })
      })

    })
  },

  render() {
    var icon
    if (this.state.data) icon = `http://openweathermap.org/img/w/${this.state.data.weather[0].icon}.png`

    return (
      <section className='city col-1'>
        {this.props.name}
        <div className='weather'>
          <img src={icon} />
        </div>
      </section>
    );
  }

});

export default City;

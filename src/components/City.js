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
      var condition = data.weather[0].main || 'clear'
      api.fetchCityData(this.props.name, {}, (sensorData) => {
        api.getFlickrUrl(this.props.name, condition, (url) => {
          this.setState({
            data: data,
            sensorData: sensorData,
            flickUrl: url
          })
        })

      })

    })
  },

  render() {
    var icon, temperature
    if (this.state.data) icon = `http://openweathermap.org/img/w/${this.state.data.weather[0].icon}.png`
    if (this.state.sensorData) temperature = parseFloat(this.state.sensorData.data[this.state.sensorData.data.length - 1]['temperature']).toFixed(2)
    var headerStyle = {
      backgroundImage: `url(${this.state.flickUrl})`,
      opacity: '0.8'
    }

    return (
      <section className='city col-1'>
        <header style={headerStyle}>
          <span className='title'>{this.props.name}</span>
          <span className='temp'>{temperature} ℃</span>
          <div className='weather'>
            <img src={icon} />
          </div>
        </header>
      </section>
    );
  }

});

export default City;

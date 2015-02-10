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
    var icon, temperature, aqi, dust, humidity, noise, light
    if (this.state.data) icon = `http://openweathermap.org/img/w/${this.state.data.weather[0].icon}.png`
    if (this.state.sensorData) {
      var latest = this.state.sensorData.data[this.state.sensorData.data.length - 1]
      temperature = parseFloat(latest['temperature']).toFixed(2)
      aqi = parseFloat(latest['airquality_raw']).toFixed(2)
      dust = parseFloat(latest['dust']).toFixed(2)
      humidity = parseFloat(latest['humidity']).toFixed(2)
      noise = parseFloat(latest['sound']).toFixed(2)
      light = parseFloat(latest['light']).toFixed(2)
    }
    var headerStyle = {
      backgroundImage: `url(${this.state.flickUrl})`
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
        <section className='indicator aqi'>
          AQI: {aqi} mV
        </section>
        <section className='indicator dust'>
          Dust: {dust} pcs/238mL
        </section>
        <section className='indicator humidity'>
          Humidity: {humidity} %
        </section>
        <section className='indicator noise'>
          Noise: {noise} mV
        </section>
        <section className='indicator light'>
          Light: {light} Lux
        </section>
      </section>
    );
  }

});

export default City;

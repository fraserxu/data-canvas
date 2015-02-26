import React from 'react';

import api from '../utils/api';
import AirChart from './AirChart';
import DustChart from './DustChart';
import HumidityChart from './HumidityChart';
import NoiseChart from './NoiseChart';
import LightChart from './LightChart';

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
      if (!data) return
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
    var icon, temperature, aqi, dust, humidity, noise, light, headerStyle
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
    if (this.state.flickUrl) {
      headerStyle = {
        backgroundImage: `url(${this.state.flickUrl})`
      }
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

        <AirChart data={this.state.sensorData} aqi={aqi} />

        <DustChart data={this.state.sensorData} dust={dust} />

        <HumidityChart data={this.state.sensorData} humidity={humidity} />

        <NoiseChart data={this.state.sensorData} noise={noise} />

        <LightChart data={this.state.sensorData} light={light} />

      </section>
    );
  }

});

export default City;

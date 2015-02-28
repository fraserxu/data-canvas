import React from 'react';

import api from '../utils/api';
import AirChart from './AirChart';
import DustChart from './DustChart';
import HumidityChart from './HumidityChart';
import NoiseChart from './NoiseChart';
import LightChart from './LightChart';
import TemperatureChart from './TemperatureChart';
import Loading from './Loading';

const City = React.createClass({

  displayName: 'City',

  getInitialState() {
    return {
      data: null,
      flickUrl: null,
      sensorData: null,
      loading: true
    };
  },

  componentWillMount() {
    if (!this.state.loading) this.setState({loading: true})
    this.fetchData(this.props)
  },

  componentWillReceiveProps(nextProps) {
    if (!this.state.loading) this.setState({loading: true})
    this.fetchData(nextProps)
  },

  fetchData(props) {
    if (!this.state.data || !this.state.flickUrl) {
      api.getWeatherByCityID(props.id, (data) => {
        if (!data) return

        this.setState({ data: data })

        const condition = data.weather[0].main || 'clear'
        api.getFlickrUrl(props.name, condition, (url) => {
          this.setState({
            flickUrl: url
          })
        })
      })
    }

    api.fetchCityData(props.name, {
      dataRange: props.dataRange || 'month'
    }, (sensorData) => {
      this.setState({
        sensorData: sensorData,
        loading: false
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

    const { loading } = this.state

    return (
      <section className='city col-1'>
        <header style={headerStyle}>
          <span className='title'>{this.props.name}</span>
          <span className='temp'>{temperature} ℃</span>
          <div className='weather'>
            <img src={icon} />
          </div>
        </header>

        { loading ? <Loading type='bubbles' color='#ccc' /> : null}

        <AirChart data={this.state.sensorData} aqi={aqi} dataRange={this.props.dataRange} />

        <DustChart data={this.state.sensorData} dust={dust} dataRange={this.props.dataRange} />

        <HumidityChart data={this.state.sensorData} humidity={humidity} dataRange={this.props.dataRange} />

        <TemperatureChart data={this.state.sensorData} temperature={temperature} dataRange={this.props.dataRange} />

        <NoiseChart data={this.state.sensorData} noise={noise} dataRange={this.props.dataRange} />

        <LightChart data={this.state.sensorData} light={light} dataRange={this.props.dataRange} />

      </section>
    );
  }

});

export default City;

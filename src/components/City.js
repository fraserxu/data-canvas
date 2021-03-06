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
    if ((!this.state.data || !this.state.flickUrl) && props.type === 'overall') {
      api.getWeatherByCityID(props.id, (data) => {
        if (!data) return
        let size = this.props.showDetail ? 'b' : 'n'

        const condition = data.weather[0].main || 'clear'
        api.getFlickrUrl(props.name, condition, size, (url) => {
          this.setState({
            flickUrl: url,
            data: data
          })
        })
      })
    }

    api.fetchCityData(props.name, {
      dataRange: props.dataRange || 'week'
    }, (sensorData) => {
      this.setState({
        sensorData: sensorData,
        loading: false
      })
    })
  },

  render() {
    let icon, temperature, aqi, dust, humidity, noise, light, headerStyle
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
    if (this.props.type === 'overall' && this.state.flickUrl) {
      headerStyle = {
        backgroundImage: `url(${this.state.flickUrl})`
      }
    } else {
      headerStyle = {
        height: '60px',
        color: '#000'
      }
    }

    const { loading } = this.state

    return (
      <section className='city col-1'>
        <header style={headerStyle} name={this.props.name} onClick={this.props.setCity ? this.props.setCity : null}>
          <span className='title'>{this.props.name}</span>
          <span className='temp'>{temperature} ℃</span>
          <div className='weather'>
            <img src={icon} />
          </div>
        </header>

        { loading ? <Loading type='bubbles' color='#ccc' /> : null}

        { !loading &&
          <div className='charts-container'>
            <AirChart last={this.props.last} data={this.state.sensorData} aqi={aqi} dataRange={this.props.dataRange} />

            <DustChart last={this.props.last} data={this.state.sensorData} dust={dust} dataRange={this.props.dataRange} />

            <HumidityChart last={this.props.last} data={this.state.sensorData} humidity={humidity} dataRange={this.props.dataRange} />

            <TemperatureChart last={this.props.last} data={this.state.sensorData} temperature={temperature} dataRange={this.props.dataRange} />

            <NoiseChart last={this.props.last} data={this.state.sensorData} noise={noise} dataRange={this.props.dataRange} />

            <LightChart last={this.props.last} data={this.state.sensorData} light={light} dataRange={this.props.dataRange} />

          </div>
        }

      </section>
    );
  }

});

export default City;

import React from 'react';
import ChartistGraph from 'react-chartist';
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

    /**
     * Air Chart
     */
    var airChart, airData, high, low
    if (this.state.sensorData) {
      var _air = this.state.sensorData.data.map((d) => d['airquality_raw'])
      var timestamp = this.state.sensorData.data.map((d) => d['timestamp'])
      high = d3.max(_air)
      low = d3.min(_air)

      var biPolarLineChartOptions = {
        high: high || 0,
        low: low || 0,
        showArea: true,
        showLine: true,
        showPoint: false,
        axisX: {
          showLabel: false,
          showGrid: false
        }
      }

      airData = {
        labels: timestamp,
        series: [
          _air
        ]
      }

      airChart = <ChartistGraph data={airData} options={biPolarLineChartOptions} type={'Line'} />
    }

    /**
     * Dust Chart
     */
    var dustChart, airData, high, low
    if (this.state.sensorData) {
      var _dust = this.state.sensorData.data.map((d) => d['dust'])
      var timestamp = this.state.sensorData.data.map((d) => d['timestamp'])
      high = d3.max(_dust)
      low = d3.min(_dust)

      var biPolarLineChartOptions = {
        high: high || 0,
        low: low || 0,
        showArea: true,
        showLine: true,
        showPoint: false,
        axisX: {
          showLabel: false,
          showGrid: false
        }
      }

      airData = {
        labels: timestamp,
        series: [
          _dust
        ]
      }

      dustChart = <ChartistGraph data={airData} options={biPolarLineChartOptions} type={'Line'} />
    }

    /**
     * Humidity Chart
     */
    var humidityChart, airData, high, low
    if (this.state.sensorData) {
      var _humidity = this.state.sensorData.data.map((d) => d['humidity'])
      var timestamp = this.state.sensorData.data.map((d) => d['timestamp'])
      high = d3.max(_humidity)
      low = d3.min(_humidity)

      var biPolarLineChartOptions = {
        high: high || 0,
        low: low || 0,
        showArea: true,
        showLine: true,
        showPoint: false,
        axisX: {
          showLabel: false,
          showGrid: false
        }
      }

      airData = {
        labels: timestamp,
        series: [
          _humidity
        ]
      }

      humidityChart = <ChartistGraph data={airData} options={biPolarLineChartOptions} type={'Line'} />
    }

    /**
     * Noise Chart
     */
    var noiseChart, airData, high, low
    if (this.state.sensorData) {
      var _sound = this.state.sensorData.data.map((d) => d['sound'])
      var timestamp = this.state.sensorData.data.map((d) => d['timestamp'])
      high = d3.max(_sound)
      low = d3.min(_sound)

      var biPolarLineChartOptions = {
        high: high || 0,
        low: low || 0,
        showArea: true,
        showLine: true,
        showPoint: false,
        axisX: {
          showLabel: false,
          showGrid: false
        }
      }

      airData = {
        labels: timestamp,
        series: [
          _sound
        ]
      }

      noiseChart = <ChartistGraph data={airData} options={biPolarLineChartOptions} type={'Line'} />
    }

    /**
     * Light Chart
     */
    var lightChart, airData, high, low
    if (this.state.sensorData) {
      var _light = this.state.sensorData.data.map((d) => d['light'])
      var timestamp = this.state.sensorData.data.map((d) => d['timestamp'])
      high = d3.max(_light)
      low = d3.min(_light)

      var biPolarLineChartOptions = {
        high: high || 0,
        low: low || 0,
        showArea: true,
        showLine: true,
        showPoint: false,
        axisX: {
          showLabel: false,
          showGrid: false
        }
      }

      airData = {
        labels: timestamp,
        series: [
          _light
        ]
      }

      lightChart = <ChartistGraph data={airData} options={biPolarLineChartOptions} type={'Line'} />
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
          { airChart }
        </section>
        <section className='indicator dust'>
          Dust: {dust} pcs/238mL
          { dustChart }
        </section>
        <section className='indicator humidity'>
          Humidity: {humidity} %
          { humidityChart }
        </section>
        <section className='indicator noise'>
          Noise: {noise} mV
          { noiseChart }
        </section>
        <section className='indicator light'>
          Light: {light} Lux
          { lightChart }
        </section>
      </section>
    );
  }

});

export default City;

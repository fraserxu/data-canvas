import React from 'react';
import parallel from 'run-parallel';

import api from '../utils/api';
import AirChart from './AirChart';
import DustChart from './DustChart';
import HumidityChart from './HumidityChart';
import NoiseChart from './NoiseChart';
import LightChart from './LightChart';
import TemperatureChart from './TemperatureChart';
import Loading from './Loading';

const ComparedCities = React.createClass({

  displayName: 'ComparedCities',

  getInitialState() {
    return {
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
    let { cities } = props;

    let tasks = cities.map((city) => {
      return function(cb) {
        api.fetchCityData(city, {
          dataRange: props.dataRange || 'week'
        }, (sensorData) => {
          cb(null, sensorData)
        })
      }
    });

    parallel(tasks, (err, results) => {
      this.setState({
        loading: false,
        sensorData: results
      })
    })

  },

  render() {
    const { loading } = this.state
    let headerStyle = {
      height: '60px',
      color: '#000'
    }

    return (
      <section className='city col-1'>
        <header style={headerStyle} name={this.props.name} onClick={this.props.setCity ? this.props.setCity : null}>
          <span className='title'>{'Comparision'}</span>
        </header>

        { loading ? <Loading type='bubbles' color='#ccc' /> : null}

        { !loading &&
          <div className='charts-container'>
            <AirChart multiple={true} last={false} data={this.state.sensorData} aqi={''} dataRange={this.props.dataRange} />

            <DustChart multiple={true} last={false} data={this.state.sensorData} dust={''} dataRange={this.props.dataRange} />

            <HumidityChart multiple={true} last={false} data={this.state.sensorData} humidity={''} dataRange={this.props.dataRange} />

            <TemperatureChart multiple={true} last={false} data={this.state.sensorData} temperature={''} dataRange={this.props.dataRange} />

            <NoiseChart multiple={true} last={false} data={this.state.sensorData} noise={''} dataRange={this.props.dataRange} />

            <LightChart multiple={true} last={false} data={this.state.sensorData} light={''} dataRange={this.props.dataRange} />

          </div>
        }

      </section>
    );
  }

});

export default ComparedCities;

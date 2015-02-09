var d3 = require('d3')
var qs = require('querystring')
var moment = require('moment')
var dateUtils = require('./dateUtils')

var cities = require('../data/cities.json')

var SOURCE = 'ci4s0caqw000002wey2s695ph'
var API_URL = 'http://sensor-api.localdata.com/api/v1'
var OSM_URL = 'http://nominatim.openstreetmap.org/reverse'

var API = {
  fetchData(url, options, cb) {
    var source = options.source || SOURCE
    var DATA_URL = `${API_URL}/sources/${source}/entries?count=1000&sort=desc`

    d3.json(DATA_URL, (res) => {
      var location = res.data[0].data.location
      var lng = location[0]
      var lat = location[1]
      API.reverseGEOCode(lat, lng, (address) => {
        // save location to the first item
        res.data[0].address = address
        cb(null, res.data)
      })
    })
  },

  fetchCityData(city, params, cb) {
    if (!city) throw new Error('city name is required')

    var ops = {
      fields: params.fields || 'temperature,light,airquality_raw,sound,humidity,dust',
      from: params.from || dateUtils.toISO(dateUtils.getPreviousDay(Date.now(), 24)),
      before: params.to || dateUtils.toISO(Date.now()),
      resolution: params.resolution || '1h',
      'over.city': city
    }

    var url = `http://sensor-api.localdata.com/api/v1/aggregations?${qs.stringify(ops)}`

    d3.json(url, (res) => {
      console.log('res', res)
      cb(res)
    })
  },

  reverseGEOCode(lat, lng, cb) {
    d3.json(`${OSM_URL}?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`, (data) => {
      cb(data)
    })
  },

  getByCityName(name, cb) {
    var cityID = cities[name]
    if (!cityID) throw new Error('city not found')
    API.getWeatherByCityID(cityID, cb)
  },

  getWeatherByCityID(id, cb) {
    d3.json(`http://api.openweathermap.org/data/2.5/weather?id=${id}`, (data) => {
      cb(data)
    })
  }
}

window.API = API

module.exports = API;

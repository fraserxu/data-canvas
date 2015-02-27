var d3 = require('d3')
var qs = require('querystring')

var Flickr = require('./flickrapi')
var dateUtils = require('./dateUtils')

var cities = require('../data/cities.json')

var SOURCE = 'ci4s0caqw000002wey2s695ph'
var API_URL = 'http://sensor-api.localdata.com/api/v1'

var flickr = new Flickr({
  api_key: "2ee749c50fd6053ff5e016cb5b483df8"
})

var API = {
  fetchCityData(city, params, cb) {
    if (!city) throw new Error('city name is required')

    let from, resolution
    if (params.dataRange == 'day') {
      from = dateUtils.toISO(dateUtils.getPreviousDay(Date.now()))
      resolution = '3h'
    } else if (params.dataRange == 'week') {
      from = dateUtils.toISO(dateUtils.getPreviousWeek(Date.now()))
      resolution = '24h'
    } else if (params.dataRange == 'month') {
      from = dateUtils.toISO(dateUtils.getPreviousMonth(Date.now()))
      resolution = '96h'
    }

    const ops = {
      fields: params.fields || 'temperature,light,airquality_raw,sound,humidity,dust',
      from: from || dateUtils.toISO(dateUtils.getPreviousDay(Date.now())),
      before: dateUtils.toISO(Date.now()),
      resolution: resolution || '1h',
      'over.city': city
    }

    d3.json(`${API_URL}/aggregations?${qs.stringify(ops)}`, (res) => {
      cb(res)
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
  },

  getFlickrUrl(city, condition, cb) {
    flickr.photos.search({
      text: `${city} ${condition}`,
      group_id: "1463451@N25"
    }, (err, result) => {
      if(err) { throw new Error(err); }
      var max = result.photos.total > 100 ? 100 : result.photos.total
      var random = Math.floor(Math.random() * max)
      var firstResult = result.photos.photo[random]
      cb(`https://farm${firstResult.farm}.staticflickr.com/${firstResult.server}/${firstResult.id}_${firstResult.secret}_n.jpg`)
    })
  }
}

window.API = API

module.exports = API;

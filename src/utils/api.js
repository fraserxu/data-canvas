var d3 = require('d3')
var qs = require('querystring')
var moment = require('moment')

var Flickr = require('./flickrapi')
var dateUtils = require('./dateUtils')

var cities = require('../data/cities.json')

var SOURCE = 'ci4s0caqw000002wey2s695ph'
var API_URL = 'http://sensor-api.localdata.com/api/v1'
var OSM_URL = 'http://nominatim.openstreetmap.org/reverse'

var flickr = new Flickr({
  api_key: "2ee749c50fd6053ff5e016cb5b483df8"
})

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

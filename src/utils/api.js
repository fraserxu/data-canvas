var d3 = require('d3')
var SOURCE = 'ci4s0caqw000002wey2s695ph'
var API_URL = 'https://localdata-sensors.herokuapp.com/api'
var OSM_URL = 'http://nominatim.openstreetmap.org/reverse'

var API = {
  fetchData(url, options, cb) {
    var source = options.source || SOURCE
    var DATA_URL = `${API_URL}/sources/${source}/entries?startIndex=0&count=5000&sort=desc`

    d3.json(DATA_URL, (data) => {
      var location = data[0].data.location
      var lng = location[0]
      var lat = location[1]
      API.reverseGEOCode(lat, lng, (address) => {
        // save location to the first item
        data[0].address = address
        cb(null, data)
      })
    })
  },

  reverseGEOCode(lat, lng, cb) {
    d3.json(`${OSM_URL}?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`, (data) => {
      cb(data)
    })
  }
}

module.exports = API;

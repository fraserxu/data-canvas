var d3 = require('d3')
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
        console.log('res', res)
        cb(null, res.data)
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

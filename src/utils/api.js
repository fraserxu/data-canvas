var d3 = require('d3')

var DATA_URL = 'https://localdata-sensors.herokuapp.com/api/sources/ci4s0caqw000002wey2s695ph/entries?startIndex=0&count=5000&sort=desc'

var API = {
  fetchData(url, options, cb) {
    d3.json(DATA_URL, function(data) {
      cb(null, data)
    })
  }
}

module.exports = API;

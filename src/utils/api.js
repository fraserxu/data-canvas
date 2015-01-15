var d3 = require('d3')


var SOURCE = 'ci4s0caqw000002wey2s695ph'
var API = 'https://localdata-sensors.herokuapp.com/api'

var DATA_URL = `${API}/sources/${SOURCE}/entries?startIndex=0&count=5000&sort=desc`

var API = {
  fetchData(url, options, cb) {
    d3.json(DATA_URL, function(data) {
      cb(null, data)
    })
  }
}

module.exports = API;

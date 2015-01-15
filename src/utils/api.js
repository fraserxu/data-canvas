var d3 = require('d3')
var SOURCE = 'ci4s0caqw000002wey2s695ph'
var API_URL = 'https://localdata-sensors.herokuapp.com/api'

var API = {
  fetchData(url, options, cb) {
    var source = options.source || SOURCE
    var DATA_URL = `${API_URL}/sources/${source}/entries?startIndex=0&count=5000&sort=desc`

    d3.json(DATA_URL, (data) => {
      cb(null, data)
    })
  }
}

module.exports = API;

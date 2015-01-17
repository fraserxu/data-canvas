var links = [
  'ci4vxorfp000l02s7nv4mlefu',
  'ci4v5wwl4000702s7t1u7rz4a',
  'ci4wvodwv000d02tcoy0qwsfi',
  'ci4vejnju000b02s70yzzonp9',
  'ci4vzm23c000o02s76ezwdgxe',
  'ci4x1uh3q000j02tcnehaazvw',
  'ci4x8lumr000l02tco6291y1u',
  'ci4v3czb7000502s7lnln7ztr',
  'ci4x0rtb9000h02tcfa5qov33',
  'ci4w1npi3000p02s7a43zws7q',
  'ci4ut5zu5000402s7g6nihdn0',
  'ci4yd6rfl000a03zzycxw5inl',
  'ci4w9izto000302tcgj9hmy9m',
  'ci4v3czb7000502s7lnln7ztr',
  'ci4w9izto000302tcgj9hmy9m',
  'ci4s0caqw000002wey2s695ph',
  'ci4z5dc2a0000032zfasduiyb',
  'ci4yfgz37000e03zzg1a6o6vy',
  'ci4y4ohu3000703zzy0fxkd5n',
  'ci4wg4xti000502tccs34dvk4',
  'ci4vy1tfy000m02s7v29jkkx4',
  'ci50huz75000003whywxrn4wx',
  'ci4vye225000n02s7rxjdfxa1',
  'ci4xkmrkk000103zzm94zdsu4',
  'ci4yfgz37000e03zzg1a6o6vy',
  'ci4xird28000003zzz1soh9fj'
]

var async = require('async')
var request = require('request')
var fs = require('fs')

function getLocation(source, cb) {
  var link = 'https://localdata-sensors.herokuapp.com/api/sources/' + source + '/entries?startIndex=0&count=1'
  request.get({url:link, json:true}, function(err, res) {
    var location = res.body[0].data.location
    getAddress(location[0], location[1], function(err, res) {
      cb(null, {
        source: source,
        address: res
      })
    })
  })
}

async.map(links, getLocation, function(err, result) {
  fs.writeFile('sensor.json', JSON.stringify(result, null, 2), function (err) {
    if (err) throw err
    console.log('It\'s saved!')
  })
})


function getAddress(lat, lng, cb) {
  var link = 'http://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lng + '&zoom=18&addressdetails=1'

  request.get({url: link, json:true}, function(err, res) {
    if (res.body.error) {
      console.log('nope...')
      var link = 'http://nominatim.openstreetmap.org/reverse?format=json&lat=' + lng + '&lon=' + lat + '&zoom=18&addressdetails=1'
      request.get({url: link, json:true}, function(err, res) {
        cb(null, res.body)
      })
    } else {
      cb(null, res.body)
    }

  })
}

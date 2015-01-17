'use strict'

var React = require('react')
var qs = require('querystring')
var Dropdown = require('react-dropdown')

var api = require('./utils/api')
var Air = require('./components/Air')
var Temperature = require('./components/Temperature')
var Dust = require('./components/Dust')
var Sound = require('./components/Sound')
var Humidity = require('./components/Humidity')
var UV = require('./components/UV')
var Light = require('./components/Light')

var App = React.createClass({

  displayName: 'App',

  getInitialState: function() {
    return {
      data: []
    };
  },

  componentDidMount() {
    try {
      var search = location.search.replace('?', '')
      var source = qs.parse(search).source
      this.fetchData('', {
        source: source
      })
    } catch (e) {
      this.fetchData('', {})
    }
  },

  fetchData(url, options) {
    api.fetchData(url, options, (err, data) => {
      if (this.isMounted()) this.setState({data: data})
    })
  },

  _onSelect(option) {
    console.log('You selected ', option.label, option.value)
    this.fetchData('', {
      source: option.value
    })
  },

  render() {
    var address = 'loading address...'
    if (this.state.data[0]) {
      address = this.state.data[0].address.display_name
    }

    var options = [
      {
        type: 'group', name: 'Shanghai', items: [
          { value: 'ci4yd6rfl000a03zzycxw5inl', label: '北京西路, 静安区, 静安区 (Jing\'an)' },
          { value: 'ci4w9izto000302tcgj9hmy9m', label: '志伟路, 高行镇, 浦东新区 (Pudong)'},
          { vlaue: 'ci4s0caqw000002wey2s695ph', label: '乌鲁木齐北路, 静安区, 静安区 (Jing\'an)'}
        ]
      },
      {
        type: 'group', name: 'San Francisco', items: [
          { value: 'ci4vy1tfy000m02s7v29jkkx4', label: 'Herb Caen Way..., Telegraph Hill' },
          { value: 'ci4ut5zu5000402s7g6nihdn0', label: 'First Samoan Congregational Church, 3715, 26th Street, Noe Valley' }
        ]
      },
      {
        type: 'group', name: 'Boston', items: []
      },
      {
        type: 'group', name: 'Geneva', items: [
        ]
      },
      {
        type: 'group', name: 'Bangalore', items: [
          { value: 'ci4x8lumr000l02tco6291y1u', label: 'HasGeek, 19th Main, Domlur 2nd Stage, Kodihalli, Bengaluru' }
        ]
      },
      {
        type: 'group', name: 'Singapore', items: [
          { value: 'ci4y4ohu3000703zzy0fxkd5n', label: 'Starville 66, Pan-Island Expressway, Chai Chee, South East Community Development Council' },
          { value: 'ci4wg4xti000502tccs34dvk4', label: 'Genome, Biopolis Drive, Biopolis, South West Community Development Council' },
          { value: 'ci4vy1tfy000m02s7v29jkkx4', label: 'Blk 28, Ghim Moh Link, Clementi, South West Community Development Council'}
        ]
      },
      {
        type: 'group', name: 'Rio de Janeiro', items: [
          { value: 'ci50huz75000003whywxrn4wx', label: 'Hospital S\u00e3o Victor, Rua Carvalho Alvim, Tijuca, Rio de Janeiro, Regi\u00e3o Metropolitana do Rio de Janeiro' },
          { value: 'ci4vye225000n02s7rxjdfxa1', label: 'Travessa São Domingos, Gragoatá, Niterói, Rio de Janeiro, Região Metropolitana do Rio de Janeiro'},
          { value: 'ci4xkmrkk000103zzm94zdsu4', label: 'Rua Firmino Gameleira, Olaria, Rio de Janeiro, Região Metropolitana do Rio de Janeiro' },
          { value: 'ci4vxorfp000l02s7nv4mlefu', label: 'Teatro Municipal Angel Viana, Avenida Maracanã, Tijuca'}
        ]
      },
      {
        type: 'group', name: 'Unknown', items: [
          { value: 'ci4yfgz37000e03zzg1a6o6vy', label: 'ci4yfgz37000e03zzg1a6o6vy' },
          { value: 'ci4xird28000003zzz1soh9fj', label: 'ci4xird28000003zzz1soh9fj' },
          { vlaue: 'ci4wvodwv000d02tcoy0qwsfi', label: 'ci4wvodwv000d02tcoy0qwsfi' },
          { value: 'ci4vzm23c000o02s76ezwdgxe', label: 'ci4vzm23c000o02s76ezwdgxe' },
          { value: 'ci4x1uh3q000j02tcnehaazvw', label: 'ci4x1uh3q000j02tcnehaazvw' },
          { value: 'ci4vzm23c000o02s76ezwdgxe', label: 'ci4vzm23c000o02s76ezwdgxe' },
          { value: 'ci4vzm23c000o02s76ezwdgxe', label: 'ci4vzm23c000o02s76ezwdgxe' },
          { value: 'ci4vzm23c000o02s76ezwdgxe', label: 'ci4vzm23c000o02s76ezwdgxe' },
          { value: 'ci4vzm23c000o02s76ezwdgxe', label: 'ci4vzm23c000o02s76ezwdgxe' },
        ]
      }
    ]

    var defaultOption = { value: 'ci4s0caqw000002wey2s695ph', label: '乌鲁木齐北路, 静安区, 静安区 (Jing\'an)'}

    return (
      <div>
        <header>
          <h1>DATA CANVAS - Sense your city - <small><i>{address}</i></small></h1>
          <section>
            <Dropdown options={options} onChange={this._onSelect} value={defaultOption} />
          </section>
          <section>
            <p>This incomplete list is from what people post in the project Facebook group, I don't know where are those sense located, so I use openstreet map service to reverse the geocode to get the rough address, I guess there will be an official place to list all the sensor data someday.</p>
            <p>It's is an experiment to load the latest <b>5000</b> data gathering from the "sense your citry" project, it's still under developermnt.</p>
            <p>When I was trying to find the address, I find that many of the geo location provided by the sensor host are in the wrong order(lat/lng) or even wrong. I hope this will also help you to find the mistake if you can't find your location in the list.</p>
            <p>Also, if you want your sensor show up but can't not find it in the list, send me an email(<a href="mailto:fraserxu@wiredcraft.com">fraserxu@wiredcraft</a>) and give me your data sourse url, I'll add it here.</p>
            <i>Last but not least, to use your own data, add "?source=YOUR_SOURCE" to the url in the address bar.</i>
          </section>
          <section>
            <i>© Made by <a href='https://fraserxu.me'>Fraser Xu</a>.</i>
          </section>
        </header>

        <Air data={this.state.data} />
        <Temperature data={this.state.data} />
        <Dust data={this.state.data} />
        <Sound data={this.state.data} />
        <Humidity data={this.state.data} />
        <UV data={this.state.data} />
        <Light data={this.state.data} />
      </div>
    )
  }

})

React.render(<App />, document.body)

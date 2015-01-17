# data-canvas-shanghai
An app to display the data from the data-canvas project

This incomplete list is from what people post in the project Facebook group, I don't know where are those sense located, so I use openstreet map service to reverse the geocode to get the rough address, I guess there will be an official place to list all the sensor data someday.

It's is an experiment to load the latest 5000 data gathering from the "sense your citry" project, it's still under developermnt.

When I was trying to find the address, I find that many of the geo location provided by the sensor host are in the wrong order(lat/lng) or even wrong. I hope this will also help you to find the mistake if you can't find your location in the list.

Also, if you want your sensor show up but can't not find it in the list, send me an email(fraserxu@wiredcraft) and give me your data sourse url, I'll add it.

Last but not least, to use your own data, add "?source=YOUR_SOURCE" to the url in the address bar.

### Development

* `make install` Install dependencies
* `make build` Build with browserify
* `make watch` Watchify
* `make clean` Clean the dist folder
* `make deploy` Push to gh-pages

### Licese
MIT

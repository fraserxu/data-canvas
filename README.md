# data-canvas-shanghai
An app to display the data from the data-canvas project

### Online Demo:

* http://fraserxu.me/data-canvas
* http://data-canvas.fraserxu.me

### Overview

This project will use serval resource from the Internet. First is the sensor data from 7 cities, then the yahoo flickr weather project to provide the background of each city, at last is the overview weather from openweathermap api. With the combine of those awesome data source, I could visualize the data into three different views(overall, specifc, and compare).

Each view will present its own aspect of the data from three different ranges(day/week/month).
 * The overall view provide an overview of weather in 7 cities, and the header background of the city will change according to the weather.
 * The specific view provide the detail sensor information from the selected city;
 * The compare view provide an view to compare the values from all cities, user could select and unselect city from the city list.

### Development

* `make install` Install dependencies
* `make build` Build with browserify
* `make watch` Watchify
* `make clean` Clean the dist folder
* `make deploy` Push to gh-pages

### Licese
MIT

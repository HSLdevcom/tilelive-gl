'use strict';

/* jshint node:true */

var mbgl = require('@mapbox/mapbox-gl-native');
var fs = require('fs');
var path = require('path');

var base = path.join(__dirname, '..');

var fileSource = new mbgl.Map({
  request: function(req, callback) {
    fs.readFile(path.join('base/path', req.url), function(err, data) {
      callback(err, { data: data });
    });
  }
});

module.exports = fileSource;

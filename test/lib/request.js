'use strict'

/* jshint node:true */

var mbgl = require('@mapbox/mapbox-gl-native')
var request = require('request')

var fileSource = {
  request: function(req) {
    request({
      url: req.url,
      encoding: null,
      gzip: true
    }, function(err, res, body) {
      if( req.canceled ) {
        return
      }
      
      if( err ) {
        req.respond(err)
      } else if( res.statusCode == 200 ) {
        var response = {}
        
        if( res.headers.modified ) { response.modified = new Date(res.headers.modified) }
        if( res.headers.expires ) { response.expires = new Date(res.headers.expires) }
        if( res.headers.etag ) { response.etag = res.headers.etag }
        response.data = body
        req.respond(null, response)
      } else {
        req.respond(new Error(JSON.parse(body).message))
      }
    })
  },
  cancel: function(req) {
    req.canceled = true
  }
}

var map = new mbgl.Map(fileSource)

module.exports = map

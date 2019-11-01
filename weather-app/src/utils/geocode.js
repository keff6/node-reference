const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoia2VmZjYiLCJhIjoiY2sxa3o1dXNoMDA5bTNubG9ucGlqaHk0eiJ9.RUmSlzIA0cHgRfcAaAtDvw&limit=1`;

  request({url, json: true}, (error, { body }) => {
    if(error) {
      callback('Unable to connect to location services')
    } else if(body.features.length === 0) {
      callback('Unable to find location')
    } else {
      const { center, place_name: location } = body.features[0];
      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        location,
      })
    }
  })
}

module.exports = geocode;
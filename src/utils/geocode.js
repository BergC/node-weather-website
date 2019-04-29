const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXNlZmFzZWZhc2RmIiwiYSI6ImNqdXJobzZuZDFiZXY0NG8xaXlucXVwN20ifQ.KbaezUMDSY8Ao_2jrU9mOA&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to Connect to location services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Please try again.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;
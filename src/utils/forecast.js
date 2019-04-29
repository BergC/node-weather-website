const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a5bc78405c6c4826fb5036edf9fb8bc2/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service at this time.', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.');
        }
    });
}

module.exports = forecast;
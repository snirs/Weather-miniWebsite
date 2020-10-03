const rp = require('request-promise');

const WEATHER_API_KEY = '094d9b5228ee8c19484261ad456b1f3d'

const weather_url = `http://api.weatherstack.com/forecast?access_key=${WEATHER_API_KEY}&query=`;


async function getForecast(lat, alt) {
    url = weather_url +  `${lat}, ${alt}`
    const res = await rp.get({
        method: 'GET',
        uri: url,
        json: true
    })
    
   return res.current;
}

module.exports = { getForecast };
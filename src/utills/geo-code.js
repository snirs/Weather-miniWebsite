const rp = require('request-promise');

const GEO_API_KEY = 'pk.eyJ1Ijoic25pcjEyIiwiYSI6ImNrZmdxaDk3eTA1M3AycnA4dG5kNXJ6dHYifQ.kqzmFGPasMZ3ZPTxOIQ9aA'

async function getGeoCode(city) {
    
    const geo_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${GEO_API_KEY}`

    const res = await rp.get({
        method: 'GET',
        uri: geo_url,
        json: true
    })

    return res.features[0]
}

module.exports = { getGeoCode };
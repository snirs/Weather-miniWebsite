const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { title } = require('process');
const forecast = require('../../weather-app/utills/forecast');
const geoCode = require('./utills/geo-code');
const foreCast = require('./utills/forecast');
const cities = require('all-the-cities');
const { createPrivateKey } = require('crypto');


const app = express();

// Express path config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../public/templates/views')
const partialsPath = path.join(__dirname, '../public/templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static dir
app.use(express.static(publicPath))


app.get('', (req, res) => {{
    res.render('index', {
        title: 'Weather',
        name: 'snir'
    })
}})

app.get('/about', (req, res) => {{
    res.render('about', {
        title: 'About',
        name: 'snir'
    })
}})

app.get('/help', (req, res) => {{
    res.render('help', {
        title: 'Help',
        name: 'snir'
    })
}})

app.get('/weather', async (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error: 'address was not provided'
        })
    }

    const { center = "unknown", place_name: location = "unknown" } = await geoCode.getGeoCode(req.query.address) || {}

    if(location === "unknown"){
        return res.send({
            error: 'Unable to understand location'
        })
    }

    const { temperature , feelslike } = await foreCast.getForecast(center[1], center[0]) 

    res.send({
        address: req.query.address,
        location : location,
        forecast: `Temperature is ${temperature} and feels like ${feelslike}`,

    })
})

app.get('*', (req, res) => {{
    res.render('404', {
    })
}})


app.listen((3001), () => {
    console.log('server is up on port 3000')
});
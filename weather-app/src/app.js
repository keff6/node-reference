const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

// Setup handlebars engine and views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.get('', (req,res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Kevin Fallas'
  })
})

app.get('/about', (req,res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Kevin Fallas'
  })
})

app.get('/help', (req,res) => {
  res.render('help', {
    title: 'Help',
    message: 'How can I help you?',
    name: 'Kevin Fallas'
  })
})

app.get('/weather', (req, res) => {
  const {address} =req.query
  if(!address) {
    return res.send({
      error: 'You must include an address to search!'
    })
  }

  geocode(address, (error, {latitude, longitude, location} = {}) => {
    if(error) {
      res.send({ error: error })
    } 
  
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        res.send({ error: error })
      } 
  
      res.send({
        forecast: forecastData,
        location,
        address,
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help article not found',
    name: 'Kevin Fallas'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'ERROR 404: Page not found',
    name: 'Kevin Fallas'
  })
})

app.listen(3030, () => {
  console.log('Server is up on port 3030')
})
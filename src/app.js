const path = require('path');
const express = require('express'); // Exposes just a single function.  Express is a function opposed to an object.  It's called to create a new Express application.
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');


const app = express(); // Calling express() must be done before creating your path (below).


// Define paths for Express config.
const publicDirPath = path.join(__dirname, '../public'); // path.join() method joins all given path segments together.
const viewsPath = path.join(__dirname, '../templates/views'); // You can use path.join() to change the default path Express looks at for your HBS files.  By default, it will use a file named view
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and views location.  App.set() is to used to provide name and value of a setting you'd like to create.
app.set('view engine', 'hbs'); // This will set-up the path for our handlebars files.  The naming of both arguments is very specific.  By default it will look for the directory named views.
app.set('views', viewsPath); // This is how we customize our views path.
hbs.registerPartials(partialsPath);

// Setup static directory to serve.
app.use(express.static(publicDirPath));


// Render allows us to render our views.  This name just needs to match with the name we used in the views folder.
app.get('', (req, res) => {
    // Render can take a second argument that's an object.  You can access these in your HTML using hbs.
    res.render('index', { 
        title: 'Weather App',
        name: 'Qreeshdoof'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Ablowt moi',
        name: 'Krawstof'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
       title: 'Help',
       name: 'Crauslawf'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ // Use return here to make sure the function stops after it runs.  Can only have one request and response, while there's a second response below.
            error: 'You must provide an address.'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            } 
            
            res.send({
                location, // You can use shorthand here.
                forecast: forecastData,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    };

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404: Help',
        name: 'Krawstof',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Klinzdof',
        errorMessage: 'Page not found.'
    });
});


// The process of starting up a server is an asynchronous process.
app.listen(3000, () => {
    console.log('Server is up');
});
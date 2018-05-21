import apicache from 'apicache';

var express = require('express'),
    compression = require('compression'),
    app = express(),
    path = require('path');
    port = process.env.PORT || 3001,
    mongoose = require('mongoose'),
    Task = require('./api/models/apiModel'), //created model loading here
    bodyParser = require('body-parser'),
    cors = require('cors'),
    trends = require('node-google-search-trends');

// Server Cache 
let cache = apicache.middleware;
app.use(cache('5 minutes'));

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://senthur:senthur8@ds263109.mlab.com:63109/blogger'); 

// compress responses
app.use(compression())
// app.use(compression({filter: shouldCompress}));

// other settings
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/apiRoutes'); //importing route
routes(app); //register the route

app.listen(port);

app.use(function(req, res) {
    res.status(404).sendFile(path.join(__dirname+'/404.html'));
});

console.log('Site list RESTful API server started on: ' + port);


function shouldCompress (req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
    }

    // fallback to standard filter function
    return compression.filter(req, res)
}
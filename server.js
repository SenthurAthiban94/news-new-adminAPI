var express = require('express'),
    app = express(),
    path = require('path');
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/apiModel'), //created model loading here
    bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://senthur:senthur8@ds263109.mlab.com:63109/blogger'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/apiRoutes'); //importing route
routes(app); //register the route

app.listen(port);

app.use(function(req, res) {
    res.status(404).sendFile(path.join(__dirname+'/404.html'));
});

console.log('Site list RESTful API server started on: ' + port);
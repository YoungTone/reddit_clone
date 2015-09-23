// Boilerplate Code

var express = requires('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-overide');
var session = require('cookie-session');
var morgan = require('morgan');
var db = require('./models');
var request = require('request');
var loginMiddleware = require("./middleware/loginHelper");
var routeMiddleware = require("./middleware/routeHelper");

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));

// Creating the session

app.use(session({
  maxAge: 3600000,
  secret: 'itsasecret',
  name: 'oatmeal'
}));

// Utilize loginMiddleware throughout the app

app.use(loginMiddleware);


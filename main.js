var http = require('http');
var path = require('path');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var sass = require('node-sass-middleware');

var host = '0.0.0.0';
var port = 8088;

// express setup
var app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    sass({
        src: path.join(__dirname, '/scss'),
        dest: path.join(__dirname, '/public/style'),
        prefix: '/style',
        debug: true,
    })
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'sdc test secret',
    resave: false,
    saveUninitialized: false,
}));

// routes
app.get('/', function(req, res) { res.render('home'); });
app.get('/strava-auth', function(req, res) { res.render('home'); });

// http server pulls it all together
var server = http.Server(app);
server.listen(port, host, function() {
    console.log('server started listening on ' + host + ':' + port);
});


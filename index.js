var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');

var app = express();

var PORT = config.port;

app.use(morgan('dev'));

mongoose.connect(config.database, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Connected to database');
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var api = require('./api')(express);
app.use('/api', api);

app.listen(PORT, function (err) {
    if (err)console.log(err);
    console.log('connected on PORT ' + PORT);
});

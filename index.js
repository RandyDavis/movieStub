var express = require("express"),
    fs = require('fs'),
    port = process.env.PORT || 2595,
    bodyParser = require('body-parser'),
    morgan = require('morgan');

var bookings = [];
 
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set("view options", {
    layout: false
});
app.use(express.static(__dirname + '/public'));
 
app.get('/', function (req, res) {
    res.render('public/index.html');
});

app.get('/movies', function(req, res) {
  var movies = require('./data/movies.json');
  res.json(movies);
});

app.post('/book', function (req, res) {
  var data = {
    'qty': req.body.qty,
    'date': req.body.date,
    'id': req.body.movie_id,
    'name': req.body.movie_name
  };
  bookings.push(data);
  // res.render('public/tmpl/bookings.html');
  res.json(bookings);
});
 
app.listen(port);
console.log('Express server running at http://localhost:' + port);
String.prototype.format = function () {
  var i = 0, args = arguments;
  return this.replace(/{}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
};

var path = require('path');
var fs = require('fs');
var express = require('express');

var indexRoutes = require('./routes/index');

var app = express();

app.set('view engine', 'html');
app.engine('html', function(path, options, callbacks){
    fs.readFile(path, 'utf-8', callback);
});

app.use(express.static(path.join(__dirname, '../client')));

app.use('/', indexRoutes);

app.use(function(err, req, res, next){
    res.status(err.status || 500);
});

module.exports = app;

'use strict';

// Load array of notes
const data = require('./db/notes');

const express = require('express');
const { PORT } = require('./config');
const { myLogger } = require('./middleware/logger');
// const morgan = require('morgan');

const app = express();
// app.use(morgan('dev'));

app.use(express.static('public'));
app.use(myLogger);

app.get('/api/notes', (req, res) => {
  if (req.query.searchTerm) {
    return res.json(data.filter(element =>
      element.title.includes(req.query.searchTerm)));
  } 
  else {
    return res.json(data);
  }
});

app.get('/api/notes/:id', (req, res) => {
  res.json(data.find(element => element.id === parseInt(req.params.id)));
});

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});





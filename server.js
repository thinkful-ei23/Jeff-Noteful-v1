'use strict';

// Load array of notes
const data = require('./db/notes');

const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.use(express.static('public'));

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

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});





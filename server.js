'use strict';

// Load array of notes
const data = require('./db/notes');

const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  res.json(data);
});

app.get('/api/notes/:id', (req, res) => {
  res.json(data.find(element => element.id === parseInt(req.params.id)));
});


app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});





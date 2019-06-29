/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const express = require('express');

const movies = require('./models/moviesTableQueries');
const directors = require('./models/directorTableQueries');

const port = process.env.PORT || 3000;
const app = express();

app.get('/api/movies', (req, res) => {
  movies.getAllMovies().then(v => res.send(v));
});

app.get('/', (req, res) => {
  res.send('Hello expressJS file for express branch test...');
});

app.listen(port, () => console.log(`Running port ${port}...`));

/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');

const directors = require('./models/directorTableQueries');
const movies = require('./models/moviesTableQueries');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

/* ------------------- API end points for movies ----------------------*/
app.get('/api/movies', (req, res) => {
  movies.getAllMovies().then(v => res.send(v));
});

/* ------------------- API end points for directors ----------------------*/
app.get('/api/directors', (req, res) => {
  directors.getAllDirectors().then(v => res.send(v));
});

app.get('/', (req, res) => {
  res.send('Hello expressJS file for express branch test...');
});

app.listen(port, () => console.log(`Running port ${port}...`));

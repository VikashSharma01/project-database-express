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

app.post('/api/movies', (req, res) => {
  // console.log(req.body);
  movies.addNewMovieToTable(req.body)
    .then((data) => {
      res.send(data);
    });
});

app.get('/api/movies/:id', (req, res) => {
  // console.log(req.params);
  movies.getAllMoviesNamesById(req.params.id)
    .then((data) => {
      res.send(data);
    });
});

app.put('/api/movies/:id', (req, res) => {
  // console.log(req.param.id);
  // console.log(req.body);
  movies.updateMovieNameWithGivenId(req.params.id, req.body)
    .then((data) => {
      res.send(data);
    });
});

app.delete('/api/movies/:id', (req, res) => {
  movies.deleteMoviesNameWithGivenId(req.params.id)
    .then((data) => {
      res.send(data);
    });
});

/* ------------------- API end points for directors ----------------------*/

app.get('/api/directors', (req, res) => {
  directors.getAllDirectors().then(v => res.send(v));
});

app.post('/api/directors', (req, res) => {
  // console.log(req.body);
  directors.addNewDirectorIntoTable(req.body)
    .then((data) => {
      res.send(data);
    });
});

app.get('/api/directors/:directorId', (req, res) => {
  // console.log(req.params);
  directors.getAllDirectorsNamesById(req.params.directorId)
    .then((data) => {
      res.send(data);
    });
});

app.put('/api/directors/:directorId', (req, res) => {
  // console.log(req.params);
  directors.updateDirectorNameWithGivenId(req.params.directorId, req.body)
    .then((data) => {
      res.send(data);
    });
});

app.delete('/api/directors/:directorId', (req, res) => {
  directors.deleteDirectorNameWithGivenId(req.params.directorId)
    .then((data) => {
      res.send(data);
    });
});

app.get('/', (req, res) => {
  res.send('Hello expressJS file for express branch test...');
});

app.listen(port, () => console.log(`Running port ${port}...`));

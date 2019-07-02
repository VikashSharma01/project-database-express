/* eslint-disable linebreak-style */
const express = require('express');
const Joi = require('@hapi/joi');
const validation = require('../utils/validate');
const movies = require('../models/moviesTableQueries');

const movieRouter = express.Router();

/* ------------------- API end points for movies ----------------------*/

movieRouter.get('/api/movies', (req, res) => {
  movies.getAllMovies().then(v => res.send(v));
});

movieRouter.post('/api/movies', (req, res) => {
  const validateMoviePost = validation.validateMoviePostRequest();
  const { error } = Joi.validate(req.body, validateMoviePost);
  // console.log(result);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  movies.addNewMovieToTable(req.body)
    .then((data) => {
      res.send(data);
    });
});

movieRouter.get('/api/movies/:id', (req, res) => {
  // console.log(req.params);
  movies.getAllMoviesNamesById(req.params.id)
    .then((data) => {
      res.send(data);
    });
});

movieRouter.put('/api/movies/:id', (req, res) => {
  const validateMoviePut = validation.validateMoviePutRequest();
  const { error } = Joi.validate(req.body, validateMoviePut);
  // console.log(result);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  movies.updateMovieNameWithGivenId(req.params.id, req.body)
    .then((data) => {
      res.send(data);
    });
});

movieRouter.delete('/api/movies/:id', (req, res) => {
  movies.deleteMoviesNameWithGivenId(req.params.id)
    .then((data) => {
      res.send(data);
    });
});

module.exports = movieRouter;

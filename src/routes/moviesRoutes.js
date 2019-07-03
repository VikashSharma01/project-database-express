/* eslint-disable linebreak-style */
const express = require('express');
const Joi = require('@hapi/joi');
const validation = require('../utils/validate');
const movies = require('../models/moviesTableQueries');

const movieRouter = express.Router();

/* ------------------- API end points for movies ----------------------*/

movieRouter.get('/', (req, res, next) => {
  movies.getAllMovies().then(v => res.send(v))
    .catch(err => next(err));
});

movieRouter.post('/', (req, res, next) => {
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
    })
    .catch(err => next(err));
});

movieRouter.get('/:id', (req, res, next) => {
  // console.log(req.params);
  movies.getAllMoviesNamesById(req.params.id)
    .then((data) => {
      if (data.length === 0) {
        res.send('Invalid ID');
      }
      res.send(data);
    })
    .catch(err => next(err));
});

movieRouter.put('/:id', (req, res, next) => {
  const validateMoviePut = validation.validateMoviePutRequest();
  const { error } = Joi.validate(req.body, validateMoviePut);
  // console.log(result);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  movies.updateMovieNameWithGivenId(req.params.id, req.body)
    .then((data) => {
      if (data.affectedRows === 0) {
        res.send('Invalid ID');
      }
      res.send(data);
    })
    .catch(err => next(err));
});

movieRouter.delete('/:id', (req, res, next) => {
  movies.deleteMoviesNameWithGivenId(req.params.id)
    .then((data) => {
      if (data.affectedRows === 0) {
        res.send('Invalid ID');
      }
      res.send(data);
    })
    .catch(err => next(err));
});

module.exports = movieRouter;

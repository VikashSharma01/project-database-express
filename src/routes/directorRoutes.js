/* eslint-disable linebreak-style */
const express = require('express');
const Joi = require('@hapi/joi');
const validation = require('../utils/validate');
const directors = require('../models/directorTableQueries');

const directorRouter = express.Router();

/* ------------------- API end points for directors ----------------------*/
directorRouter.get('/', (req, res, next) => {
  directors.getAllDirectors()
    .then(v => res.send(v))
    .catch(err => next(err));
});

directorRouter.post('/', (req, res, next) => {
  const validateDirectorPost = validation.validateDirectorPostRequest();
  const { error } = Joi.validate(req.body, validateDirectorPost);
  // console.log(result);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  directors.addNewDirectorIntoTable(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch(err => next(err));
});

directorRouter.get('/:directorId', (req, res, next) => {
  // console.log(req.params);
  directors.getAllDirectorsNamesById(req.params.directorId)
    .then((data) => {
      if (data.length === 0) {
        res.status(400).send('Invalid ID');
      }
      res.send(data);
    })
    .catch(err => next(err));
});

directorRouter.put('/:directorId', (req, res, next) => {
  const validateDirectorPut = validation.validateDirectorPutRequest();
  const { error } = Joi.validate(req.body, validateDirectorPut);
  // console.log(result);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  directors.updateDirectorNameWithGivenId(req.params.directorId, req.body)
    .then((data) => {
      if (data.affectedRows === 0) {
        res.status(400).send('Invalid ID');
      }
      res.send(data);
    })
    .catch(err => next(err));
});

directorRouter.delete('/:directorId', (req, res, next) => {
  directors.deleteDirectorNameWithGivenId(req.params.directorId)
    .then((data) => {
      // console.log(data.affectedRows);
      if (data.affectedRows === 0) {
        res.status(400).send('Invalid ID');
      }
      res.send(data);
    })
    .catch(err => next(err));
});

module.exports = directorRouter;

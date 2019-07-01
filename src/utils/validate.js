/* eslint-disable linebreak-style */
const Joi = require('@hapi/joi');

const validateMoviePostRequest = () => {
  const schema = {
    Rank: Joi.number().required(),
    Title: Joi.string().required(),
    Description: Joi.string().required(),
    Runtime: Joi.number().required(),
    Genre: Joi.string().required(),
    Rating: Joi.number().required(),
    Metascore: Joi.string().required(),
    Votes: Joi.number().required(),
    Gross_Earning_in_Mil: Joi.string().required(),
    Actor: Joi.string().required(),
    Director: Joi.string().required(),
    Year: Joi.number().required(),
  };
  return schema;
};

const validateMoviePutRequest = () => {
  const schema = {
    Rank: Joi.number(),
    Title: Joi.string(),
    Description: Joi.string(),
    Runtime: Joi.number(),
    Genre: Joi.string(),
    Rating: Joi.number(),
    Metascore: Joi.string(),
    Votes: Joi.number(),
    Gross_Earning_in_Mil: Joi.string(),
    Actor: Joi.string(),
    director_id: Joi.number(),
    Year: Joi.number(),
  };
  return schema;
};

const validateDirectorPostRequest = () => {
  const schema = {
    director_name: Joi.string().required(),
  };
  return schema;
};

const validateDirectorPutRequest = () => {
  const schema = {
    director_name: Joi.string(),
  };
  return schema;
};

module.exports = {
  validateMoviePostRequest,
  validateMoviePutRequest,
  validateDirectorPostRequest,
  validateDirectorPutRequest,
};

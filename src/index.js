/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const Joi = require('@hapi/joi');

const directorRoute = require('./routes/directorRoutes');
const movieRoute = require('./routes/moviesRoutes');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/', directorRoute);
app.use('/', movieRoute);

/* ---------------------Running localhost------------------------*/
app.get('/', (req, res) => {
  res.send('Hello expressJS file for express branch test...');
});

app.listen(port, () => console.log(`Running port ${port}...`));
/* --------------------------------------------------------------*/

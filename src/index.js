/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const morgan = require('morgan');
const Joi = require('@hapi/joi');
const winston = require('./config/winston');

const directorRoute = require('./routes/directorRoutes');
const movieRoute = require('./routes/moviesRoutes');

const port = process.env.PORT || 3000;

const app = express();

app.use(morgan('combined', { stream: winston.stream }));
app.use(express.json());
app.use('/api/directors', directorRoute);
app.use('/api/movies', movieRoute);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(err.status || 500).send('Oops... Some Internal Server Error');
  res.render('error');
});

/* ---------------------Running localhost------------------------*/
app.get('/', (req, res) => {
  res.send('Hello expressJS file for express branch test...');
});

app.listen(port, () => console.log(`Running port ${port}...`));
/* --------------------------------------------------------------*/

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
app.use('/', directorRoute);
app.use('/', movieRoute);

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // add this line to include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  // render the error page
  res.status(err.status || 500);
  req.render('error');
});

/* ---------------------Running localhost------------------------*/
app.get('/', (req, res) => {
  res.send('Hello expressJS file for express branch test...');
});

app.listen(port, () => console.log(`Running port ${port}...`));
/* --------------------------------------------------------------*/

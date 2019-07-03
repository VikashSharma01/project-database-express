/* eslint-disable linebreak-style */
/* eslint-disable max-len */

// const express = require('express');
// const morgan = require('morgan');
// const winston = require('../config/winston');

// const app = express();

// app.use(morgan('combined', { stream: winston.stream }));

// app.use((err, req, res) => {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
//   res.status(err.status || 500).send('Oops... Some Internal Server Error');
//   res.render('error');
// });

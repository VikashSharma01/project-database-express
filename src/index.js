/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const express = require('express');

const directorFunctons = ('./models/directorTableQueries.js');
const movieFunctons = ('./models/moviesTableQueries.js');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello expressJS file for express branch test...');
});

app.listen(3000, () => console.log('listening port 3000 ...'));

/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: '11VvV11@',
  database: 'mb_project_database',
  insecureAuth: true,
});

/*  |------------------------------------------|
    |-------- Questions related Movies --------|
    |------------------------------------------|
    |-- Get all movies                       --|
    |-- Get the movie with given ID          --|
    |-- Add a new movie                      --|
    |-- Update the movie with given ID       --|
    |-- Delete the movie with given ID       --|
    |------------------------------------------|
*/

const getAllMovies = () => new Promise((resolve, reject) => {
  connection.query('select rank, title from movies', (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
    connection.end();
  });
});

const getAllMoviesNamesById = id => new Promise((resolve, reject) => {
  connection.query(`select rank, title from movies where id = ${id}`, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
    connection.end();
  });
});

/* ----------------------Resolving the Promise and Getting data-------------------------*/

// getAllMovies().then(v => console.log(v));
// getAllMoviesNamesById(3).then(v => console.log(v));

/* --------------------------------------------------------------------------------------*/

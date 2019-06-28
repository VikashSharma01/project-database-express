/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable max-len */
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

const getAllMoviesNamesById = movieId => new Promise((resolve, reject) => {
  connection.query(`select * from movies where id = ${movieId}`, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
    connection.end();
  });
});

const addNewMovieToTable = (addRank, addTitle, addDescription, addRuntime, addGenre, addRating, addMetascore,
  addVotes, add_Gross_Earning_in_Mil, addDirector, addActor, addYear) => new Promise((resolve, reject) => {
  connection.query(`insert into movies(rank, title, description, runtime, genre, rating,
                   metascore, votes, gross_Earning_in_Mil, director_id, actor, year) values(
                   ${addRank}, "${addTitle}", "${addDescription}", ${addRuntime}, "${addGenre}", ${addRating},
                   "${addMetascore}", ${addVotes}, "${add_Gross_Earning_in_Mil}",
                   (select directorId from director where director_name = "${addDirector}"), "${addActor}", ${addYear})`, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
    connection.end();
  });
});

const updateMovieNameWithGivenId = (id, movieName) => new Promise((resolve, reject) => {
  connection.query(`update movies set title = "${movieName}" where id = ${id}`, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
    connection.end();
  });
});

const deleteMoviesNameWithGivenId = id => new Promise((resolve, reject) => {
  connection.query(`delete from movies where id = ${id}`, (err, res) => {
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
 addNewMovieToTable(51, "Dev-D", "A Bollywood Movie", 140, "Drama", 5.5, "NA", 1200, "NA", "Christopher Nolan" , "Abhay Deol", 2006).then(v => console.log(v));
// updateMovieNameWithGivenId(1, "Sha Red").then(v => console.log(v));
// deleteMoviesNameWithGivenId(52).then(v => console.log(v));

/* --------------------------------------------------------------------------------------*/

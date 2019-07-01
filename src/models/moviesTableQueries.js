/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const db = require('../utils/databaseAuth');

const connection = db.dbconnection();

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
  connection.query(`select id, rank, title, description, runtime, metascore, votes, gross_Earning_in_Mil ,
  director_name, actor, year from movies join director on movies.director_id = director.directorId order by rank asc`, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
    connection.end();
  });
});

const getAllMoviesNamesById = movieId => new Promise((resolve, reject) => {
  console.log(movieId);
  connection.query(`select * from movies where id = ${movieId}`, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
    connection.end();
  });
});

const addNewMovieToTable = item => new Promise((resolve, reject) => {
  // console.log(item);
  connection.query(`insert into movies(rank, title, description, runtime, genre, rating,
                   metascore, votes, gross_Earning_in_Mil, director_id, actor, year) values(
                   ${item.Rank}, "${item.Title}", "${item.Description}", ${item.Runtime}, "${item.Genre}", ${item.Rating},
                   "${item.Metascore}", ${item.Votes}, "${item.Gross_Earning_in_Mil}",
                   (select directorId from director where director_name = "${item.Director}"), "${item.Actor}", ${item.Year})`, (err, res) => {
    if (err) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(`Oops... ${err}`);
    } else {
      resolve(res);
    }
    connection.end();
  });
});

const updateMovieNameWithGivenId = (id, movieName) => new Promise((resolve, reject) => {
  connection.query(`update movies set ? where id = ${id}`, movieName, (err, res) => {
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

/* ----------------------Exporting functions-----------------------*/
module.exports = {
  getAllMovies,
  getAllMoviesNamesById,
  addNewMovieToTable,
  updateMovieNameWithGivenId,
  deleteMoviesNameWithGivenId,
};
/*-----------------------------------------------------------------*/

/* ----------------------Resolving the Promise and Getting data-------------------------*/

// getAllMovies().then(v => console.log(v));
// getAllMoviesNamesById(3).then(v => console.log(v));
// addNewMovieToTable(51, "Dev-D", "A Bollywood Movie", 140, "Drama", 5.5, "NA", 1200, "NA", "Abhay Deol" , "Abhay Deol", 2006).then(v => console.log(v));
// updateMovieNameWithGivenId(1, "Sha Red").then(v => console.log(v));
// deleteMoviesNameWithGivenId(52).then(v => console.log(v));

/* --------------------------------------------------------------------------------------*/

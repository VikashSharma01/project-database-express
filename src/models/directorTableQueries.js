/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const db = require('../utils/databaseAuth');

const connection = db.dbconnection();

/*  |------------------------------------------|
    |----- Questions related directors---------|
    |------------------------------------------|
    |-- Get all directors                    --|
    |-- Get the director with given ID       --|
    |-- Add a new director                   --|
    |-- Update the director with given ID    --|
    |-- Delete the director with given ID    --|
    |------------------------------------------|
*/

const getAllDirectors = () => new Promise((resolve, reject) => {
  connection.query('select * from director', (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
    connection.end();
  });
});

const getAllDirectorsNamesById = id => new Promise((resolve, reject) => {
  connection.query(`select director_name from director where directorId = ${id}`, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
    connection.end();
  });
});

const addNewDirectorIntoTable = newDir => new Promise((resolve, reject) => {
  connection.query(`INSERT INTO director(director_name)
               VALUES("${newDir.director_name}")`, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
    connection.end();
  });
});

const updateDirectorNameWithGivenId = (id, dirName) => new Promise((resolve, reject) => {
  // console.log(dirName);
  connection.query(`update director set ? where directorId = ${id}`, dirName, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
    connection.end();
  });
});

const deleteDirectorNameWithGivenId = id => new Promise((resolve, reject) => {
  connection.query(`delete from director where directorId = ${id}`, (err, res) => {
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
  getAllDirectors,
  getAllDirectorsNamesById,
  addNewDirectorIntoTable,
  updateDirectorNameWithGivenId,
  deleteDirectorNameWithGivenId,
};
/*-----------------------------------------------------------------*/

/* ----------------------Resolving the Promise and Getting data-------------------------*/

// getAllDirectors().then(v => console.log(v));
// getAllDirectorsNamesById(3).then(v => console.log(v));
// addNewDirectorIntoTable("Abhay Deol").then(v => console.log(v));
// updateDirectorNameWithGivenId(36, "Vikash K. Sharma").then(v => console.log(v));
// deleteDirectorNameWithGivenId(36).then(v => console.log(v));

/* --------------------------------------------------------------------------------------*/

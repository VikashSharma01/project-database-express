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
               VALUES("${newDir}")`, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
    connection.end();
  });
});

const updateDirectorNameWithGivenId = (id, dirName) => new Promise((resolve, reject) => {
  connection.query(`update director set director_name = "${dirName}" where directorId = ${id}`, (err, res) => {
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

/* ----------------------Resolving the Promise and Getting data-------------------------*/

// getAllDirectors().then(v => console.log(v));
// getAllDirectorsNamesById(3).then(v => console.log(v));
// addNewDirectorIntoTable("Abhay Deol").then(v => console.log(v));
// updateDirectorNameWithGivenId(36, "Vikash K. Sharma").then(v => console.log(v));
// deleteDirectorNameWithGivenId(36).then(v => console.log(v));

/* --------------------------------------------------------------------------------------*/

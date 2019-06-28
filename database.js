/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
const mysql = require('mysql');
const moviesDataFromJson = require('./movies_data/movies.json');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: '11VvV11@',
  database: 'mb_project_database',
  insecureAuth: true,
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  // eslint-disable-next-line no-console
  console.log('... Database connected successfully ...');
});

const droppingTable = () => new Promise((resolve, reject) => {
  connection.query('DROP TABLE IF EXISTS movies,director', (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const directorTable = () => new Promise((resolve, reject) => {
  const tableDirectorAndID = `CREATE TABLE director(
        directorId MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        director_name TEXT
      )`;
  connection.query(tableDirectorAndID, (error, res) => {
    if (error) {
      reject(error);
    } else {
      resolve(res);
    }
  });
});

const insertingInDirectorTable = () => new Promise((resolve, reject) => {
  const repeatedDirectorList = moviesDataFromJson.map(value => value.Director);
  const distinctDirectorList = [...new Set(repeatedDirectorList)];
  distinctDirectorList.forEach((value) => {
    connection.query(`insert into director(director_name) values("${value}")`, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
});

const moviesTable = () => new Promise((resolve, reject) => {
  connection.query(`create table movies(
    id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    rank int,
    title varchar(100),
    description varchar(500),
    runtime int,
    genre varchar(20),
    rating float,
    metascore varchar(30),
    votes bigint,
    gross_Earning_in_Mil varchar(30),
    director_id MEDIUMINT,
    actor varchar(100),
    year int,
    FOREIGN KEY(director_id) REFERENCES director(directorId)
    ON DELETE CASCADE
    ON UPDATE CASCADE)`, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const getDirectorsId = getingDirectorId => new Promise((resolve, reject) => {
  connection.query(`select * from director where director_name = "${getingDirectorId}"`, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res[0].directorId);
    }
  });
});

const insertingInMoviesTable = () => new Promise((resolve, reject) => {
  moviesDataFromJson.forEach((value) => {
    const a = getDirectorsId(value.Director);
    a.then((directorIds) => {
      connection.query(`insert into movies(rank, title, description, runtime, genre, rating, metascore, votes, gross_Earning_in_Mil, director_id, actor, year)
  values(${value.Rank}, "${value.Title}", "${value.Description}", ${value.Runtime}, "${value.Genre}", ${value.Rating}, "${value.Metascore}", ${value.Votes}, "${value.Gross_Earning_in_Mil}", ${directorIds}, "${value.Actor}", ${value.Year})`, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  });
});

droppingTable().then(() => {
  console.log('   => [Tables Dropped Sucessfully]');
  return directorTable();
}).then(() => {
  console.log('   => [Directors Table Created]');
  return insertingInDirectorTable();
}).then(() => {
  console.log('   => [Values Inserted in Director Table]');
  return moviesTable();
})
  .then(() => {
    console.log('   => [Movies Table Created]');
    return insertingInMoviesTable();
  })
  .then(() => {
    console.log('   => [Values Inserted in Director Table]');
    console.log('... Database Task Successfull ...');
    connection.end();
  });

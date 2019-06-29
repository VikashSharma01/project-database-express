/* eslint-disable linebreak-style */
const mysql = require('mysql');

// eslint-disable-next-line no-unused-vars
const databaseConnection = () => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '11VvV11@',
    database: 'mb_project_database',
    insecureAuth: true,
  });
  return connection;
};

module.exports.dbconnection = databaseConnection;

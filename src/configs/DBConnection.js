require("dotenv").config();
import mysql from "mysql2";

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Database connected!");
});
// var connection = mysql.createConnection({multipleStatements: true});
module.exports = connection;

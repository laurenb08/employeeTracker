//require dependencies
const mysql = require("mysql");
const util = require("util");

//create connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Murphy212!",
    database: "employee_tracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

connection.query = util.promisify(connection.query);

module.exports = connection;




var mysql = require('mysql');

var database = {};

database.connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kim_min828049',
  port: 3306,
  database: 'db',
  charset: 'utf8'
});

database.db_connection = function() {
  this.connection.connect();
}

database.getCondom = function() {
  this.connection.query('SELECT * from condom', function (err, rows, fields) {
    if (!err)
      console.log('The solution is: ', rows);
    else
      console.log('Error while performing Query.', err);
  });
}
database.end = function(){
  this.connection.end();
}

module.exports = database;
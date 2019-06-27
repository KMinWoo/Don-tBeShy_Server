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

database.sql = [
  `select time, state from coupledate join client on coupledate.number = client.couplenumber where id = ? && (time >= ? && time < ?)`,
 ];

// ` select * from coupledate join client on coupledate.number = client.couplenumber where id = ? && (time >= '2019-06' && time <'2019-07')`
database.db_connection = function() {
  this.connection.connect();
};

database.getInfo = function(type,params,res) {
  this.connection.query(this.sql[type], params, function (err, rows, fields) {
    if (!err){
      var arr = new Array();
      var json = new Object();
      for(var i = 0; i < rows.length; i++){ 
        json.date = rows[i].time;
        json.state = rows[i].state;
        arr.push(json)
      }
      res.send(arr);
    } else
      console.log('Error while performing Query.', err);
  });
};

database.end = function(){
  this.connection.end();
};

module.exports = database;
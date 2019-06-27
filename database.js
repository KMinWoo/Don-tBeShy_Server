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
  `insert into client(id, password, brithday, gender, couplenumber) values(?,?,?,false,0)`,
  `insert into client(id, password, brithday, gender, couplenumber) values(?,?,?,true,0)`,
  `select id from client where id = ?`,
  `select coupleinfo.first as id_1, coupleinfo.second as id_2, couplestate.first, couplestate.second from coupleinfo join couplestate on coupleinfo.number = couplestate.number where coupleinfo.first = ? || coupleinfo.second=?`
];

database.db_connection = function () {
  this.connection.connect();
};

database.idCheck = function (type, params, res) {
  this.connection.query(this.sql[type], [params.id, params.id], function (err, rows, fields) {
    if (!err) {
      if (rows.length === 0)
        res.send('true');
      else
        res.send('false');

    } else
      console.log('Error while performing Query.', err);
  });
};

database.getInfo = function (type, params, res) {
  this.connection.query(this.sql[type], params, function (err, rows, fields) {
    if (!err) {
      var arr = new Array();
      for (var i = 0; i < rows.length; i++) {
        var json = new Object();
        json.date = rows[i].time;
        json.state = rows[i].state;
        arr.push(json)
      }
      res.send(arr);
    } else console.log('Error while performing Query.', err);
  });
};

database.getBtn = function (type, params, res) {
  this.connection.query(this.sql[type], params, function (err, rows, fields) {
    if (!err) {
      var json = new Object();
      if(rows[0].second == 1 && rows[0].first == 1) json.state = 2;
      else json.state = rows[0].id_1 === params[0] ? rows[0].second : rows[0].id_2 === params[0] ? rows[0].first : 0;
      res.send(json);
    } else console.log('Error while performing Query.', err);
  });
};


database.insertInfo = function (type, params) {
  this.connection.query(this.sql[type], params, function (err, rows, fields) {
    if (err) {
      console.log('Error while performing Query.', err);
    }
  });
};

database.end = function () {
  this.connection.end();
};

module.exports = database;
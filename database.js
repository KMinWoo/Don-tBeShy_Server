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
  `select coupleinfo.first as id_1, coupleinfo.second as id_2, couplestate.first, couplestate.second, coupleinfo.first_physiology,coupleinfo.first_sex,coupleinfo.second_physiology,coupleinfo.second_sex from coupleinfo join couplestate on coupleinfo.number = couplestate.number where coupleinfo.first = ? || coupleinfo.second=?`,
  `update cs set state = ? where id = ?`,
  `select * from cs where number = (select couplenumber from client where client.id = ?)`,
  `update cs set state = 3 where number = (select couplenumber from client where client.id = ?)`,
  `insert into coupledate(number, time, state) values(1,?,?)`
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
      console.log(arr);
      res.send(arr);
    } else console.log('Error while performing Query.', err);
  });
};

database.getBtn = function (type, params, res) {
  this.connection.query(this.sql[type], params, function (err, rows, fields) {
    if (!err) {
      var json = new Object();
      json.state = rows[0].id === params[0] ? rows[1].state == 1 ? 2 : rows[0].state : rows[0].state == 1 ? 2 : rows[1].state;
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

database.update = function (type, params) {

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
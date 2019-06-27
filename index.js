var app = require('express')();
var server = require('http').createServer(app);
// http server를 socket.io server로 upgrade한다
var io = require('socket.io')(server);


var db = require('./database.js');

db.db_connection();
// localhost:3000으로 서버에 접속하면 클라이언트로 index.html을 전송한다
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/id', (req, res) => {
    var id = req.query.id;
    db.idCheck(3, id, res);
});



app.get('/register', (req, res) => {
    var id = req.query.id;
    var password = req.query.password;
    var brithdate = req.query.brithdate;
    var gender = req.query.gender;
    db.insertInfo(gender == 1 ? 1 : 2, [id, password, brithdate]);
});

app.get('/couple', (req, res) => {
    var id = req.query.id;
    var partner = req.query.partner;

});


app.get('/calendar', (req, res) => {
    var id = req.query.id;
    var year = req.query.year;
    var month = req.query.month;
    var date = '';
    var nextDate = '';
    if (month == 12) {
        date = year + '-' + month;
        year++;
        nextDate = (year) + '-01';
    } else {
        if (month < 10) {
            date = year + '-0' + month;
        } else {
            date = year + '-' + month;
        }
        month++;
        if (month < 9) {
            nextDate = year + '-0' + month;
        } else {
            nextDate = year + '-' + month;
        }
    }
    db.getInfo(0, [id, date, nextDate], res);
});

app.get('/abbreviation', (req, res) => {
    var physiology = req.query.physiology;
    var sex = req.query.sex;

});

app.get('/btn', (req, res) => {
    var id = req.query.id;
    db.getBtn(6, [id], res);
});

app.get('/btnclick', (req, res) => {
    var id = req.query.id;
    var state = req.query.state;
    console.log(id,state);
    if(state == 3){
        db.update(7, [id]);
        db.update(5, [0, id]);
    }
    else if(state == 4){
        db.update(5, [0, id]);
    }
    else{
        db.update(5, [state, id]);
    }
    res.send("asd");
});


// connection event handler
// connection이 수립되면 event handler function의 인자로 socket인 들어온다
io.on('connection', function(socket) {

  // 접속한 클라이언트의 정보가 수신되면
  socket.on('login', function(data) {
    console.log('Client logged-in:\n name:' + data.name + '\n userid: ' + data.userid);

    // socket에 클라이언트 정보를 저장한다
    socket.name = data.name;
    socket.userid = data.userid;

    // 접속된 모든 클라이언트에게 메시지를 전송한다
    io.emit('login', data.name );
  });

  // 클라이언트로부터의 메시지가 수신되면
  socket.on('chat', function(data) {
    console.log('Message from %s: %s', socket.name, data.msg);

    var msg = {
      from: {
        name: socket.name,
        userid: socket.userid
      },
      msg: data.msg
    };

    // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
    socket.broadcast.emit('chat', msg);

    // 메시지를 전송한 클라이언트에게만 메시지를 전송한다
    // socket.emit('s2c chat', msg);

    // 접속된 모든 클라이언트에게 메시지를 전송한다
    // io.emit('s2c chat', msg);

    // 특정 클라이언트에게만 메시지를 전송한다
    // io.to(id).emit('s2c chat', data);
  });

  // force client disconnect from server
  socket.on('forceDisconnect', function() {
    socket.disconnect();
  })

  socket.on('disconnect', function() {
    console.log('user disconnected: ' + socket.name);
  });
});



server.listen(3000, function() {
  console.log('Socket IO server listening on port 3000');
});
const express = require('express');
const app = express();
const bodyParser =require('body-parser');
const port = 3000;
const fs = require('fs');
var db = require('./database.js');
app.locals.pretty = true;
app.use(express.static('public'));
app.set('view engine', 'jade');
app.set('views', './views');// defalut
app.use(bodyParser.urlencoded({extended:false}))// post methd 데이터를 가져오기 위한 set 


app.get('/register', (req, res)=>{
    var id = req.body.id;

    var password = req.body.password;
    var brithdate = req.body.brithdate;
    var gender = req.body.gender;

    db.insertClient();
});


app.get('/calendar', (req, res)=>{
    //var id = req.body.id;
    //var date = req.body.date;
    // db(id, date);
    
    db.db_connection();
    db.getInfo(0, ['kmw811', '2019-06', '2019-07'], res);

});






app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);

});

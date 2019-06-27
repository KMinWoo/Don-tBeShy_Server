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


app.get('/id', (req, res)=>{
    var id = req.query.id;
    db.idCheck(3, id, res);
});
app.get('/register', (req, res)=>{
    var id = req.query.id;
    var password = req.query.password;
    var brithdate = req.query.brithdate;
    var gender = req.query.gender;
    db.insertInfo(gender == 1 ? 1 : 2, [id, password, brithdate]);
    res.send('check');
});

app.get('/couple', (req, res)=>{
    var id = req.query.id;
    var partner = req.query.partner;

});


app.get('/calendar', (req, res)=>{
    var id = req.query.id;
    var year = req.query.year;
    var month = req.query.month;
    var date = '';
    var nextDate ='';
    if(month == 12)
    {
        nextDate = (year) + '-01';
        year++;
        date = year + '-' + month;
    }else {
        if(month < 10){
            date = year + '-0' + month;
        }else{
            date = year + '-' + month;
        }
        month++;
        if(month < 9){
            nextDate = year + '-0' + month;
        }else{
            nextDate = year + '-' + month;
        }
    }
    db.getInfo(0, [id, date, nextDate], res);
});


app.get('/btn', (req, res)=>{
    var id = req.query.id;
    db.getBtn(4, [id, id], res);
});

app.get('/button', (req, res)=>{
    var id = req.query.id;
    var year = req.query.year;
    var month = req.query.month;
    var day = req.query.day;

});




db.db_connection();
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});

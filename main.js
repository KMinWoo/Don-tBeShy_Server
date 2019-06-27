const express = require('express');
const app = express();
const bodyParser =require('body-parser');
const port = 3000;

app.locals.pretty = true;
app.use(express.static('public'));
app.set('view engine', 'jade');
app.set('views', './views');// defalut
app.use(bodyParser.urlencoded({extended:false}))// post methd 데이터를 가져오기 위한 set 


app.get('/', (req, res) => res.send('Hello World!'));
app.get('/contraceptivemeasure', (req, res) => {
    res.send("asd");
});
app.get('/contraceptivemeasure', (req, res) => res.send('ssss!'));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});

var db = require('./database.js');
db.db_connection();
db.getCondom();

//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
// fs
var fs = require('fs');
const app = express();

var configPath =  path.resolve( __dirname, "config.json" );
var parsed = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));
var db_nm;

const env = process.env.NODE_ENV || 'development';
if(env === 'test'){
  db_nm = "elm_db_test";
} else {
  db_nm = parsed.DB;
}

//Create Connection
const conn = mysql.createConnection({
  host: parsed.HOST,
  user: parsed.USER,
  password: parsed.PASS,
  database: db_nm
});

//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set folder public as static folder for static file
app.use('/assets',express.static(__dirname + '/public'));

//route for homepage
app.get('/',(req, res) => {
  let sql = "SELECT * FROM institute_info";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    console.log(results);
    res.render('inst_view',{
      results: results
    });
  });
});

//route for insert data
app.post('/save',(req, res) => { 
  let data = {inst_name: req.body.inst_name, inst_type: req.body.inst_type,
    inst_address: req.body.inst_address, inst_city: req.body.inst_city,
    inst_state: req.body.inst_state, inst_country: req.body.inst_country,
    inst_zip: req.body.inst_zip, inst_status: req.body.inst_status};
  let sql = "INSERT INTO institute_info SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for update data
app.post('/update',(req, res) => {
  let sql = "UPDATE institute_info SET inst_name='"+req.body.inst_name+"', inst_type='"+req.body.inst_type+"', inst_address='"+req.body.inst_address+"', inst_city='"+req.body.inst_city+"', inst_state='"+req.body.inst_state+"', inst_country='"+req.body.inst_country+"', inst_zip='"+req.body.inst_zip+"', inst_status='"+req.body.inst_status+"' WHERE inst_id="+req.body.inst_id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM institute_info WHERE inst_id="+req.body.inst_id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});

//route for delete data
app.get('/delete_all',(req, res) => {
  let sql = "DELETE FROM institute_info";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});

//server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});

module.exports.app = app;

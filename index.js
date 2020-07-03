var express = require('express')
var http = require('http')
var mysql = require('mysql')
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
var dateFormat = require('dateformat')
var now = new Date();
app.set('view engine','ejs')
app.use('/js',express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/css',express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js',express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js',express.static(__dirname + '/node_modules/tether/dist/js'));

var server = app.listen(4000,function(){
    console.log('server started')
})
const con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'events'  
})
const siteTitile = "SMNode -1.0 Application";
const baseUrl = "http://localhost:4000/";
app.get('/', function (req,res){
    res.send('hi world')
    con.query("SELECT * FROM e_events ORDER BY  e_start_date DESC",function (err,result){
      res.render('pages/index',{
          siteTitile:siteTitile,
          pageTitle:"Event List",
          items:result
      })  
    })
    //Default Route look in the pages folder index, ejs , created a variable page title, and items is the result
})
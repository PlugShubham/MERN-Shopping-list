//express for shopping web api
var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());
//for fetching body data in post requests
var bodyParser = require('body-parser');

//routes module
var routes = require('./routes');

//mongoose is framework for mongoDB
var mongoose = require('mongoose');

//mlabs URI
var MONGO_URI = require('./config/mongodb').module;

//util for better logging
var util = require('util');

//connecting mongoDB 
mongoose.connect(MONGO_URI,{ useNewUrlParser: true })
.then(()=>util.log("Successfully connected to DB"))
.catch(()=>util.log("error occured in connecting to DB"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api',routes);

app.listen(5000,()=>{
    util.log("Server is listening at port 5000")
});
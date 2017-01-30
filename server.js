var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var morgan = require('morgan')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var router = express.Router()
    //use the router object with these routes ..like a function with (routes) as parameter i guess
var appRoutes = require('./app/routes/api')(router)

app.use(morgan('dev')) //morgan logs every server resqest
app.use(bodyParser.json()) //for parsing the json 
app.use(bodyParser.urlencoded({ extended: true })) //for parse application/x-www-form-urlencoded
app.use(appRoutes)

mongoose.connect('mongodb://localhost:27017/loginapp', function(err) {
    if (err) {
        console.log('not connected to the db', err)
    } else {
        console.log('connected to Mongo');
    }
})

app.listen(port, function() {
    console.log('server is running on', port)
})
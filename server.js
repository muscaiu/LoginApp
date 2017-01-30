var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var morgan = require('morgan')
var mongoose = require('mongoose')

var bodyParser = require('body-parser')

app.use(morgan('dev')) //morgan logs every server resqest
app.use(bodyParser)

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
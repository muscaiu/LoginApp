var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var morgan = require('morgan')
var mongoose = require('mongoose')
var User = require('./app/models/user')
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

//http://127.0.0.1:3000/users
app.post('/users', function(req, res) {
    var user = new User()

    user.username = req.body.username
    user.password = req.body.password
    user.email = req.body.email

    if (req.body.username === null || req.body.username == '' ||
        req.body.password === null || req.body.username == '' ||
        req.body.email === null || req.body.email === '') {
        res.send('Ensure username, email and password were provided')
    } else {
        user.save(function(err) {
            if (err) { //if user exists in the db or some other error
                res.send('Username or Email already exists')
            } else {
                res.send('user created')
            }
        })
    }
})

app.listen(port, function() {
    console.log('server is running on', port)
})
var User = require('../models/user')
var jwt = require('jsonwebtoken')
var secret = 'harrypotter'

module.exports = function(router) {
    //USER REGISTRATION ROUTE
    //http://127.0.0.1:3000/users
    router.post('/users', function(req, res) {
        var user = new User()

        user.username = req.body.username
        user.password = req.body.password
        user.email = req.body.email

        if (req.body.username === null || req.body.username === undefined || req.body.username === '' ||
            req.body.password === null || req.body.password === undefined || req.body.username === '' ||
            req.body.email === null || req.body.email === undefined || req.body.email === '') {
            res.json({ success: false, message: 'Ensure username, email and password were provided' })
        } else {
            user.save(function(err) {
                if (err) { //if user exists in the db or some other error
                    res.json({ success: false, message: 'Username or Email already exists' })
                } else {
                    res.json({ success: true, message: 'user created' })
                }
            })
        }
        console.log(req.body.username, req.body.password, req.body.email);
    })

    //USER LOGIN ROUTE
    //http://localhost:3000/api/authenticate
    router.post('/authenticate', function(req, res) {
        console.log(req.body.username, req.body.password);

        User.findOne({ username: req.body.username }).select('email username password').exec(function(err, user) {
            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Could not authenticate user' })
            } else if (user) {
                if (req.body.password) {
                    var validPassword = user.comparePassword(req.body.password)
                } else {
                    res.json({ success: false, message: 'No password provided' })
                }
                if (!validPassword) {
                    res.json({ success: false, message: 'Could not authenticate password' })
                } else {

                    //create jwt token
                    var token = jwt.sign({
                        username: user.username,
                        email: user.email
                    }, secret, {
                        expiresIn: '1h'
                    })

                    res.json({ success: true, message: 'User authenticated!', token: token })
                }
            }
        })
    })

    return router //return whatever the route is
}



// jwt.sign({
//     data: 'foobar'
// }, 'secret', { expiresIn: '1h' });
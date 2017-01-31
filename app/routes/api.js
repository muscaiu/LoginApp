var User = require('../models/user')

module.exports = function(router) {
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
    return router //return whatever the route is
}
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var InterviewSchema = new Schema({
    nomecognome: { type: String, required: true },
    sesso: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true }
})

// UserSchema.pre('save', function(next) {
//     var user = this
//         //encrypting the pass before storing it to DB  
//     bcrypt.hash(user.password, null, null, function(err, hash) {
//         if (err) return next(err)
//         user.password = hash
//         next()
//     })
// })

// UserSchema.methods.comparePassword = function(password) {
//     return bcrypt.compareSync(password, this.password) //compare the passwords
// }

module.exports = mongoose.model('Interview', InterviewSchema)
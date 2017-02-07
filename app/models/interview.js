var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var InterviewSchema = new Schema({
    nr: { type: Number },
    dataapplicazione: { type: String },
    nomecognome: { type: String },
    sesso: { type: String, uppercase: true },
    eta: { type: Number },
    tel: { type: Number },
    esito1: { type: String },
    esito2: { type: String },
    note: { type: String },
    esitocolloquio: { type: String },
    sito: { type: String },
    email: { type: String }
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
const {Schema, model} = require('mongoose')

const User = new Schema({
    email: {type: String, unique: true, require: true},
    username: {type: String, require: true},
    password: {type: String, require: true},
    birthdayDate: {type: Date, require: true},
    roles: [{type: String, ref: 'Role'}]
})

module.exports = model('User', User)
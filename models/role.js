const {Schema, model} = require('mongoose')

const Role = new Schema({
    value: {type: String, unique: true, require: true, default: "USER"}
})

module.exports = model('Role', Role)
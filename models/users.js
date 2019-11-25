const mongoose = require('mongoose')
const Schema = mongoose.Schema

const users = new Schema({
    name: String,
    amount: { type: Number, default: 0 },
})

module.exports = mongoose.model('users', users, 'users')
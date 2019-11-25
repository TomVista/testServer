const mongoose = require('mongoose')
const Schema = mongoose.Schema

const turnovers = new Schema({
    order: String,
    type: String,
    amount: { type: Number, default: 0 }
})

module.exports =  mongoose.model('turnovers', turnovers, 'turnovers')
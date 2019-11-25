const mongoose = require('mongoose')

const Schema = mongoose.Schema

const goods = new Schema({
    name: String,
    prize: { type: Number, default: 0 },
})

module.exports =  mongoose.model('goods', goods, 'goods')
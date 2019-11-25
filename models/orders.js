const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orders = new Schema({
    user:String,
    goods: String,
    count: { type: Number, default: 0 },
})

module.exports =  mongoose.model('orders', orders, 'orders')
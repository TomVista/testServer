const { ApolloServer, gql } = require('apollo-server-koa')

const users = require('../models/users')
const orders = require('../models/orders')
const turnovers = require('../models/turnovers')
const goods = require('../models/goods')

const typeDefs = gql`
type Query {
    goods:[good]
    orders:[order],
    order:order,
    turnovers:[turnover]
    users(name: String):[user]
}
type good{
    _id:String
    name:String
    prize:Float
}
type order{
    _id:String
    user:user
    good:good
    count:Int
}
type turnover{
    _id:String
    order: String
    type: String
    amount: Int
}
type user{
    _id:String
    name: String
    amount: Int
}
`

const resolvers = {
    Query: {
        goods: async (root) => {
            console.log(root)
            return await goods.find()
        },
        orders: async () => {
            return await orders.find()
        },
        turnovers: async () => {
            return await turnovers.find()
        },
        users: async (root, args) => {
            return await users.find(args)
        },
    },
    order: {
        user: async (order) => {
            return await users.findOne({ _id: order.user })
        },
        good: async (order) => {
            return await goods.findOne({ _id: order.good })
        }
    }
}

module.exports = new ApolloServer({ typeDefs, resolvers })
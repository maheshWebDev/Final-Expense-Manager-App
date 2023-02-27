const {Sequelize,DataTypes} = require('sequelize')

const dbConnection = require('../config/dbconfig');

const Order = dbConnection.define('order',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    paymentid:{
        type:DataTypes.STRING
    },
    orderid :{
        type:DataTypes.STRING
    },
    status:{
        type:DataTypes.STRING
    }
})

module.exports = Order;
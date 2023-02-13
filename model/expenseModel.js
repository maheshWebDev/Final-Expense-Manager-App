const {Sequelize,DataTypes} = require('sequelize');

const dbConnection = require('../config/dbconfig');

const Expense = dbConnection.define('expense',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports = Expense;
const Expense = require('../model/expenseModel');

const User = require('../model/userModel');

const { Op, literal } = require('sequelize');

module.exports.showLeaderboard = async(req,res)=>{

    try {
        const result = await User.findAll({
            attributes: ['name', [literal('SUM(expenses.amount)'), 'totalAmount']],
            include: [
              {
                model: Expense,
                attributes: [],
              },
            ],
            group: ['User.id', 'User.name'],
            order: [[literal('totalAmount'), 'DESC']],
          });
      
        res.status(201).json({"status":"succsess",data:{result}});
          
        
    } catch (error) {
        res.status(401).json({"error" : error.message});
    }
   
    
}
const Expense = require('../model/expenseModel');

module.exports.addExpense = async(req,res)=>{
try {
    
    console.log(req.body)
    const {name,amount,description} = req.body;

    const expense = await Expense.create({name:name,amount:amount,description:description,userId:req.user.id});
    if(!expense) return res.status(401).json({"status":"fail","message":"something went wrong"});

    res.status(200).json({"status":"success","message":"successfully created"})
    
} catch (error) {
    res.status(500).json({"status":"fail","message":"something went wrong"});
}
}

module.exports.getExpense = async(req,res)=>{
    

    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        
        console.log(req.query.page)
        const offset = (page - 1) * limit;
        console.log(offset)

        const expenses = await Expense.findAll({
            where: { userId: req.user.id },
            offset: offset,
            limit: limit,
        });

        if (expenses.length === 0) return res.status(404).json({ "status": "fail", "message": "No expenses found." });

       // Count the total number of expenses for pagination
       const totalExpenses = await Expense.count({ where: { userId: req.user.id } });

       const totalPages = Math.ceil(totalExpenses / limit);

       res.status(200).json({
           "status": "success",
           "data": expenses,
           "meta": {
               "currentPage": page,
               "totalPages": totalPages
           }
       });
    } catch (error) {
        res.status(500).json({ "status": "fail", "message": "Server error." });
    }
}

module.exports.deleteExpense = async(req,res)=>{
    try {
        // console.log(req.params)
        const id = req.params.id
      
        if(id){
          const response = await  Expense.destroy({where:{id:id,userId:req.user.id}})
          return res.status(200).json({"status":"success","message":"successfully deleted"})
        }
        res.status(401).json({"status":"fail","message":"id not found"})
        
    } catch (error) {
        res.status(501).json({"status":"fail","message":"something went wrong"})
    }
}
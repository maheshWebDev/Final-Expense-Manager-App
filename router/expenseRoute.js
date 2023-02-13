const express = require('express');

const {addExpense,getExpense,deleteExpense} = require('../controller/expenseController')

const router = express.Router();

router.post('/expenses',addExpense);

router.get('/expenses',getExpense)

router.delete('/expenses/:id',deleteExpense)

module.exports = router;
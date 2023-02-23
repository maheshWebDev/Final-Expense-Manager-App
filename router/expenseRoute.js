const express = require('express');

const {authenticate} = require('../middleware/auth')
const {addExpense,getExpense,deleteExpense} = require('../controller/expenseController')

const router = express.Router();

router.post('/expenses',authenticate,addExpense);

router.get('/expenses',authenticate,getExpense);

router.delete('/expenses/:id',authenticate,deleteExpense)

module.exports = router;
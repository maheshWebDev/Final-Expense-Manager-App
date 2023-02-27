const express = require('express');

const {buyPremiumMembership,updateStatus} = require('../controller/buyPremiumController')

const {authenticate} = require('../middleware/auth')

const router = express.Router();

router.get('/premium-membership',authenticate,buyPremiumMembership);

router.post('/update-status',authenticate,updateStatus);

module.exports = router;

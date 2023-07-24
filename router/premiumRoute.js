const express = require('express');

const {showLeaderboard} = require('../controller/premiumController')
const router = express.Router();

router.get('/leaderboard',showLeaderboard);

module.exports = router;
const express = require('express');

const router = express.Router({ mregeParams: true });

router.use('/auth', require('./auth.routes'));
router.use('/user', require('./user.routes'));
router.use('/habit', require('./habit.routes'));
router.use('/day', require('./day.routes'));
router.use('/userStreak', require('./userStreak.routes'));
router.use('/habitStreak', require('./habitStreak.routes'));
router.use('/habitStatus', require('./habitStatus.routes'));

module.exports = router;
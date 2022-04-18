const express = require('express');
const dayjs = require('dayjs');
const Day = require('../models/Day');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth.middleware');

router.post('/', auth, async (req, res) => {

  const newDay = await Day.create({
    date: dayjs().format('DD/MM/YYYY'),
    isPerfect: false,
    userId: req.user._id,
    habitStatusId: []
  })
  res.status(201).send(null);
});

router.get('/:date', async (req, res) => {});

router.patch('/:date', async (req, res) => {});

module.exports = router;

const express = require('express');
const dayjs = require('dayjs');
const Day = require('../models/Day');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth.middleware');

router.post('/', auth, async (req, res) => {
  try {
    if (!req.query.date) {
      return res.status(400).json({ message: 'Send date query' });
    }
    const day = await Day.findOne({
      userId: req.user._id,
      date: req.query.date
    });
    if (day) {
      res.status(200).json({ message: 'Date exists' });
    } else {
      await Day.create({
        date: dayjs().format('DD/MM/YYYY'),
        isPerfect: false,
        userId: req.user._id,
        habitStatusId: []
      });
      res.status(201).json({ message: 'New date created' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Try again later' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const days = await Day.find({ userId: req.user._id });
    res.status(200).json({
      days: days.map((day) => ({
        date: day.date,
        isPerfect: day.isPerfect,
        habitStatusId: day.habitStatusId
      }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Try again later' });
  }
});

router.patch('/:date', async (req, res) => {});

module.exports = router;

const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth.middleware');
const HabitStatus = require('../models/HabitStatus');

router.get('/:habitId', auth, async (req, res) => {
  const { date } = req.query;
  const { habitId } = req.params;
  try {
    if (date) {
      const habitStatus = await HabitStatus.findOne({ habitId, date });
      if (habitStatus) {
        res.status(200).json(habitStatus);
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    } else {
      const habitStatuses = await HabitStatus.find({ habitId });
      if (habitStatuses) {
        res.status(200).json(habitStatuses);
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Try again later' });
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    const update = req.body;
    const newHabitStatus = await HabitStatus.findOneAndUpdate({_id: req.params.id}, update, {
      new: true
    });
    res.status(200).json(newHabitStatus);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Try again later' });
  }
});

module.exports = router;

const express = require('express');
const Habit = require('../models/Habit.js');
const auth = require('../middleware/auth.middleware');

const router = express.Router({ mergeParams: true });

router.get('/:userId', auth, async (req, res) => {
  try {
    const list = await Habit.find({ userId: req.params.userId });
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Try again later' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const newHabit = await Habit.create(req.body);
    res.status(201).send(newHabit);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Try again later' });
  }
});

router.patch('/:id', auth, async (req, res) => {
  if (req.body.userId !== req.user._id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const newHabit = await Habit.findOneAndUpdate({_id: req.params.id}, req.body.values, {
      new: true
    });
    res.status(200).json(newHabit);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Try again later' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  if (habit.userId.toString() !== req.user._id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    await habit.remove();
    res.send(null);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Try again later' });
  }
});

module.exports = router;

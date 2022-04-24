const express = require('express');
const Habit = require('../models/Habit.js');
const auth = require('../middleware/auth.middleware');
const HabitStatus = require('../models/HabitStatus.js');
const dayjs = require('dayjs');
const Day = require('../models/Day.js');

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
    const date = dayjs().format('YYYY-MM-DD');
    const newHabit = await Habit.create(req.body);
    const newStatus = await HabitStatus.create({
      date,
      habitId: newHabit._id,
      isCompleted: false
    });
    const { habitStatusId } = await Day.findOne({ date });
    habitStatusId.push(newStatus._id);

    await Day.findOneAndUpdate({ date }, { habitStatusId });
    res.status(201).send({ habit: newHabit, habitStatus: newStatus });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Try again later' });
  }
});

router.patch('/:id', auth, async (req, res) => {
  if (req.body.userId !== req.user._id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const newHabit = await Habit.findOneAndUpdate(
      { _id: req.params.id },
      req.body.values,
      {
        new: true
      }
    );
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

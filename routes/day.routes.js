const express = require('express');
const dayjs = require('dayjs');
const Day = require('../models/Day');
const Habit = require('../models/Habit');
const HabitStatus = require('../models/HabitStatus');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth.middleware');

router.post('/', auth, async (req, res) => {
  try {
    if (!req.body.date) {
      return res.status(400).json({ message: 'Send date query' });
    }
    const day = await Day.findOne({
      userId: req.user._id,
      date: dayjs().format('DD/MM/YYYY')
    });
    if (day) {
      const statuses = await HabitStatus.find({ date: req.body.date });
      const dayWithStatuses = {...day._doc, habitStatuses: statuses }
      res.status(200).json(dayWithStatuses);
    } else {
      const habits = await Habit.find({ userId: req.user._id });
      const habitsStatuses = habits.map((habit) => ({
        isCompleted: false,
        habitId: habit._id,
        date: dayjs().format('DD/MM/YYYY')
      }));
      const statuses = await HabitStatus.create(habitsStatuses);

      const newDay = {
        date: dayjs().format('DD/MM/YYYY'),
        isPerfect: false,
        userId: req.user._id
      };

      const dbDay = {
        ...newDay,
        habitStatusId: statuses.map((status) => status._id)
      };

      const outputDay = { ...newDay, habitStatuses: statuses };

      await Day.create(dbDay);

      res.status(201).json(outputDay);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Try again later' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const days = await Day.find({ userId: req.user._id });
    res.status(200).json(days);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Try again later' });
  }
});

router.patch('/:date', async (req, res) => {});

module.exports = router;

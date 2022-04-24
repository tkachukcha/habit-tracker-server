const express = require('express');
const dayjs = require('dayjs');
const Day = require('../models/Day');
const Habit = require('../models/Habit');
const HabitStatus = require('../models/HabitStatus');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth.middleware');

router.post('/', auth, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user._id });

    const date = req.body.date;
    const { isNew, day } = await checkDay(req.user._id, date, habits);

    const resStatus = isNew ? 201 : 200;

    res.status(resStatus).json(day);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Try again later' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const { date } = req.query;
    const days = await Day.find({ userId: req.user._id });
    if (date) {
      const today = dayjs().format('YYYY-MM-DD');
      const month = date.substring(0, 7);
      const filteredDays = days.filter(
        (day) => day.date.includes(month) && day.date !== today
      );
      return res.status(200).json(filteredDays);
    }
    res.status(200).json(days);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Try again later' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const day = await Day.findById(req.params.id);
    res.status(200).json(day);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Try again later' });
  }
});

router.patch('/', auth, async (req, res) => {
  try {
    const updatedDay = await Day.findOneAndUpdate(
      { date: req.body.date, userId: req.user._id },
      { isPerfect: req.body.isPerfect },
      {
        new: true
      }
    );
    res.status(200).json(updatedDay);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Try again later' });
  }
});

async function checkDay(userId, date, habits) {
  const day = await Day.findOne({
    userId,
    date
  });
  if (day) {
    const statuses = await HabitStatus.find({ userId, date });
    return { isNew: false, day: { ...day._doc, habitStatuses: statuses } };
  } else {
    return { isNew: true, day: await createDay(userId, date, habits) };
  }
}

async function createDay(userId, date, habits) {
  const habitsStatuses = habits.map((habit) => ({
    isCompleted: false,
    habitId: habit._id,
    date
  }));

  const statuses = await HabitStatus.create(habitsStatuses);

  const newDay = {
    date,
    isPerfect: false,
    userId
  };

  const dbDay = {
    ...newDay,
    habitStatusId: statuses.map((status) => status._id)
  };

  await Day.create(dbDay);

  const outputDay = {
    ...dbDay,
    habitStatuses: statuses
  };

  return outputDay;
}

module.exports = router;

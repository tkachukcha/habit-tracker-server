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

    const todayDate = dayjs().format('DD/MM/YYYY');
    const { isNew, day } = await checkDay(req.user._id, todayDate, habits);

    const resStatus = isNew ? 201 : 200;

    res.status(resStatus).json(day);
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

router.patch('/:id', auth, async (req, res) => {
  try {
    const updatedDay = await Day.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
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
    const statuses = await HabitStatus.find({userId, date})
    return { isNew: false, day: {...day._doc, habitStatuses: statuses } };
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
    userId,
  };

  const dbDay = {
    ...newDay,
    habitStatusId: statuses.map(status => status._id)
  }

  await Day.create(dbDay);

  const outputDay = {
    ...dbDay,
    habitStatuses: statuses
  }

  return outputDay;
}

module.exports = router;

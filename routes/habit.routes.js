const express = require('express');
const Habit = require('../models/Habit.js');
const auth = require('../middleware/auth.middleware');

const router = express.Router({ mergeParams: true });

router.get('/:userId', auth, async (req, res) => {
  try {
    const list = await Habit.find({userId: req.params.userId});
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
    res
        .status(500)
        .json({ message: 'Internal server error. Try again later' });
  }
});

router.patch('/:id', async (req, res) => {});

router.delete('/:id', async (req, res) => {});

module.exports = router;

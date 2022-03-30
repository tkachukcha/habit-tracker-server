const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const list = await User.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Try again later' });
  }
});

router.get('/:id', async (req, res) => {});

router.post('/:id', async (req, res) => {});

router.patch('/:id', async (req, res) => {});

module.exports = router;

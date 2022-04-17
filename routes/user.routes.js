const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');

router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Try again later' });
  }
});

router.patch('/:id', async (req, res) => {});

module.exports = router;

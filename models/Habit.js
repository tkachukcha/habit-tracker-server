const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: String,
    color: String,
    icon: String,
    time: String,
    isActive: Boolean,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    bestStreak: Number
  },
  {
    timestamps: true
  }
);

module.exports = model('Habit', schema);

const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    startDate: Date,
    endDate: Date,
    isActive: Boolean,
    habitId: { type: Schema.Types.ObjectId, ref: 'Habit'}
  },
  {
    timestamps: true
  }
);

module.exports = model('HabitStreak', schema);

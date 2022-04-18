const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    isCompleted: Boolean,
    habitId: { type: Schema.Types.ObjectId, ref: 'Habit' },
    date: String
  },
  {
    timestamps: true
  }
);

module.exports = model('HabitStatus', schema);

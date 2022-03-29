const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    date: Date,
    isPerfect: Boolean,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    habitId: [{ type: Schema.Types.ObjectId, ref: 'Habit'}]
  },
  {
    timestamps: true
  }
);

module.exports = model('Day', schema);

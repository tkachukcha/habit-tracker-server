const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    date: String,
    isPerfect: Boolean,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    habitStatusId: [{ type: Schema.Types.ObjectId, ref: 'HabitStatus'}]
  },
  {
    timestamps: true
  }
);

module.exports = model('Day', schema);

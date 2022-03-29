const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    startDate: Date,
    endDate: Date,
    isActive: Boolean,
    userId: { type: Schema.Types.ObjectId, ref: 'User'}
  },
  {
    timestamps: true
  }
);

module.exports = model('UserStreak', schema);

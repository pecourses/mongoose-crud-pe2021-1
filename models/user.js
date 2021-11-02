const mongoose = require('mongoose');
const { Schema } = mongoose;
const { EMAIL_VALIDATION_SCHEMA } = require('./../utils/validationSchemas');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: value => EMAIL_VALIDATION_SCHEMA.isValidSync(value),
    },
    unique: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  // '2021-01-01'
  birthday: {
    type: Date,
    validate: {
      validator: date => new Date(date) < new Date(),
    },
  },
  isMarried: {
    type: Boolean,
    default: false,
  },
  workExp: {
    type: Number,
    min: 0,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

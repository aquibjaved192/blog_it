const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
 {
  name: {
   type: String,
   required: true,
  },
  profession: {
   type: String,
   required: true,
  },
  email: {
   type: String,
   required: true,
   unique: true,
  },
  password: {
   type: String,
   required: true,
   minlength: 8,
  },
  followers: {
    type: Array,
    required: false,
  },
  following: {
    type: Array,
    required: false,
  }
 },
 {
  timestamps: true,
 }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

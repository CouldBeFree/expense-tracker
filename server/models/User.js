const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: 6,
    select: false
  },
  joinDate: {
    type: Date,
    default: Date.now
  }
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

module.exports = mongoose.model('User', UserSchema);
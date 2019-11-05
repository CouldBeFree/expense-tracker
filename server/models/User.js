const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const Expenses = require('./Expenses');

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
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  incomes: [{
    type: Schema.Types.ObjectId,
    ref: 'Incomes',
    default: []
  }],
  expenses: [{
    type: Schema.Types.ObjectId,
    ref: 'Expenses',
    default: []
  }]
});

// Encrypt password
UserSchema.pre('save', async function (next) {
  if(!this.isModified('password')){
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(password){
  return await bcrypt.compare(password, this.password);
};

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Generate and reset password token
UserSchema.methods.getResetPasswordToken = async function(){
  // Generate token
  const resetToken = crypto.randomBytes(20).toLocaleString('hex');

  // Hash token  and set to resetPasswordToken field
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

UserSchema.pre('find', async function() {
  this.populate('incomes').populate('expenses');

  /*const aggr = await Expenses.aggregate(
    [
      { $group: {mon: "$user", total: { $sum: "$amount" } } }
    ]
  );*/

  let aggr;

  try{
    aggr = await Expenses.aggregate(
      [
        {
          $match: { date : { $gte: "2019-10-01", $lte: "2019-10-31"} }
        },
        {
          $group: {
            _id: {month: { $month: new Date("2019-10-01") }},
            total: { "$sum": "$amount" }
          }
        }
      ]
    );
  }catch (e) {
    console.log(e);
  }

  console.log(aggr);
});

module.exports = mongoose.model('User', UserSchema);
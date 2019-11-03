const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Expenses = new Schema({
  date: {
    type: String,
    required: [true, 'Date is required']
  },
  category: String,
  amount: Number,
  description: String
});

module.exports = mongoose.model('Expenses', Expenses);
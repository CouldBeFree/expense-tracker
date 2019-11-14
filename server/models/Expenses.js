const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const Expenses = new Schema({
  date: {
    type: String,
    required: [true, 'Date is required']
  },
  category: String,
  amount: Number,
  description: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

Expenses.post('save', async function () {
  try{
    await mongoose.models['User'].update({_id: this.user}, { $push: { expenses: this._id } })
  }catch(e){
    console.log(e);
  }
});

Expenses.pre('remove', async function () {
  try{
    await User.update({ _id: this.user }, { $pull: { expenses: this._id } })
  }catch (e) {
    console.log(e);
  }
});

module.exports = mongoose.model('Expenses', Expenses);

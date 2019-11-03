const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const Incomes = new Schema({
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

Incomes.post('save', async function () {
  try{
    await User.update({_id: this.user}, { $push: { incomes: this._id } })
  }catch(e){
    console.log(e);
  }
});

Incomes.pre('remove', async function () {
  try{
    await User.update({ _id: this.user }, { $pull: { incomes: this._id } })
  }catch (e) {
    console.log(e);
  }
});

module.exports = mongoose.model('Incomes', Incomes);
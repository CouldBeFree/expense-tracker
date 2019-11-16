const Expenses = require('../models/Expenses');
const Incomes = require('../models/Incomes');
const asyncHandler = require('../middleware/async');
const errorResponse = require('../utils/errorResponse');
const calculateTotal = require('../utils/calculateTotal');

// @desc    Get total
// @route   GET /api/v1/total
// @access  Private
exports.getTotal = asyncHandler(async (req, res, next) => {
  let expense = await calculateTotal(Expenses, req.query.date, req.user._id);
  let incomes = await calculateTotal(Incomes, req.query.date, req.user._id);
  
  incomes = incomes.length ? incomes[0].total : 0;
  expense = expense.length ? expense[0].total : 0;
  
  res.status(200).json({
    success: true,
    expenses: expense,
    incomes: incomes
  });
});

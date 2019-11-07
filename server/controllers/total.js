const Expenses = require('../models/Expenses');
const Incomes = require('../models/Incomes');
const asyncHandler = require('../middleware/async');
const errorResponse = require('../utils/errorResponse');
const calculateTotal = require('../utils/calculateTotal');

// @desc    Get total
// @route   GET /api/v1/total
// @access  Private
exports.getTotal = asyncHandler(async (req, res, next) => {
  const expense = await calculateTotal(Expenses, req.query.date, req.user._id);
  const incomes = await calculateTotal(Incomes, req.query.date, req.user._id);

  res.status(200).json({
    success: true,
    expenses: expense,
    incomes: incomes
  });
});

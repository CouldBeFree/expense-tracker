const Expenses = require('../models/Expenses');
const asyncHandler = require('../middleware/async');
const errorResponse = require('../utils/errorResponse');

// @desc    Post expenses
// @route   POST /api/v1/expenses
// @access  Private
exports.setExpense = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const expenses = await Expenses.create(req.body);

  res.status(200).json({
    success: 200,
    data: expenses
  });
});

// @desc    Update expenses
// @route   PUT /api/v1/expenses/:id
// @access  Private
exports.updateExpense = asyncHandler(async (req, res, next) => {
  let expenses = await Expenses.findById(req.params.id);

  if(!expenses){
    return next(new errorResponse(`Income not found with id of ${req.params.id}`, 404))
  }

  expenses = await Expenses.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: 200,
    data: expenses
  })
});

// @desc    Get expenses
// @route   GET /api/v1/expenses/:id
// @access  Private
exports.getExpense = asyncHandler(async (req, res, next) => {
  let expenses = await Expenses.findById(req.params.id);

  if(!expenses){
    return next(new errorResponse(`Income not found with id of ${req.params.id}`, 404))
  }

  res.status(200).json({
    success: 200,
    data: expenses
  })
});

// @desc    Remove expenses
// @route   DELETE /api/v1/expenses/:id
// @access  Private
exports.removeExpense = asyncHandler(async (req, res, next) => {
  let expenses = await Expenses.findById(req.params.id);

  if(!expenses){
    return next(new errorResponse(`Income not found with id of ${req.params.id}`, 404))
  }

  expenses.remove();

  res.status(200).json({
    success: 200,
    data: {}
  })
});

// @desc    Get incomes
// @route   GET /api/v1/expenses?date
// @access  Private
exports.getExpenses = asyncHandler(async (req, res, next) => {
  const reqQuery = { ...req.query };

  let date = reqQuery.date;
  date = date.substring(0, date.length - 3);
  const startDate = date += '-01';
  let endDate = date;
  endDate = endDate.substring(0, date.length - 3);
  endDate = endDate += '-31';

  const incomes = await Expenses.find({
    "date": { $gte: date, $lte: endDate },
    "user": req.user._id
  });

  res.status(200).json({
    success: 200,
    count: incomes.length,
    data: incomes
  })
});
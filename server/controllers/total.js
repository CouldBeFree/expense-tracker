const Expenses = require('../models/Expenses');
const Incomes = require('../models/Incomes');
const asyncHandler = require('../middleware/async');
const errorResponse = require('../utils/errorResponse');

// @desc    Get total
// @route   GET /api/v1/total
// @access  Private
exports.getTotal = asyncHandler(async (req, res, next) => {
  console.log(req.user);
});
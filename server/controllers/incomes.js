const Incomes = require('../models/Incomes');
const asyncHandler = require('../middleware/async');
const errorResponse = require('../utils/errorResponse');

// @desc    Post income
// @route   POST /api/v1/incomes
// @access  Private
exports.setIncome = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  
  const income = await Incomes.create(req.body);
  
  res.status(200).json({
    success: 200,
    data: income
  })
});

// @desc    Update income
// @route   PUT /api/v1/incomes/:id
// @access  Private
exports.updateIncome = asyncHandler(async (req, res, next) => {
  let income = await Incomes.findById(req.params.id);
  
  if(!income){
    return next(new errorResponse(`Income not found with id of ${req.params.id}`, 404))
  }
  
  income = await Incomes.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: 200,
    data: income
  })
});

// @desc    Get income
// @route   GET /api/v1/incomes/:id
// @access  Private
exports.getIncome = asyncHandler(async (req, res, next) => {
  let income = await Incomes.findById(req.params.id);
  
  if(!income){
    return next(new errorResponse(`Income not found with id of ${req.params.id}`, 404))
  }
  
  res.status(200).json({
    success: 200,
    data: income
  })
});

// @desc    Remove income
// @route   DELETE /api/v1/incomes/:id
// @access  Private
exports.removeIncome = asyncHandler(async (req, res, next) => {
  let income = await Incomes.findById(req.params.id);
  
  if(!income){
    return next(new errorResponse(`Income not found with id of ${req.params.id}`, 404))
  }
  
  income.remove();
  
  res.status(200).json({
    success: 200,
    data: {}
  })
});

// @desc    Get incomes
// @route   GET /api/v1/incomes?date
// @access  Private
exports.getIncomes = asyncHandler(async (req, res, next) => {
  const reqQuery = { ...req.query };

  let date = reqQuery.date;
  date = date.substring(0, date.length - 3);
  const startDate = date += '-01';
  let endDate = date;
  endDate = endDate.substring(0, date.length - 3);
  endDate = endDate += '-31';

  const incomes = await Incomes.find({
    "date": { $gte: date, $lte: endDate },
    "user": req.user._id
  });

  res.status(200).json({
    success: 200,
    count: incomes.length,
    data: incomes
  })
});
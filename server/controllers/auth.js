const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const errorResponse = require('../utils/errorResponse');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// @desc    Register user
// @route   POST /api/v1/register
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  
    const user = await User.create({
      username,
      email,
      password
    });
    
    const token = user.getSignedJwtToken();
    
    res.status(200).json({
      success: true,
      token
    })
});

// @desc    Login user
// @route   POST /api/v1/login
// @access  Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { password, email } = req.body;

  // Validate
  if(!password || !email){
    return next(new errorResponse('Please provide an email & password', 400));
  }

  // Check for user
  const user = await User.findOne({email}).select('+password');

  if(!user){
    return next(new errorResponse('Invalid credentials', 400));
  }

  const isMatch = await user.matchPassword(password);

  if(!isMatch){
    return next(new errorResponse('Invalid credentials', 400));
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Update password
// @route   PUT /api/v1/auth/update-password
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if(!(await user.matchPassword(req.body.currentPassword))){
    return next(new errorResponse('Password is incorrect', 401))
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Get current logged user
// @route   GET /api/v1/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  //const user = await User.findById(req.user.id);
  const user = await User.find({_id: req.user.id});
  /*const test = await User.findById(req.user.id).populate('incomes').exec((err, incomes) => {
    console.log("Populated User " + incomes);
  });*/

  res.status(200).json({
    success: true,
    data: user
  })
});

// @desc    Forgot password
// @route   POST /api/v1/auth/forgot-password
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if(!user){
    return next(new errorResponse('There is no user with this email', 404))
  }

  // Get reset token
  const resetToken = await user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create user url
  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${resetToken}`;

  const message = `Please make put request to ${resetUrl}`;

  try{
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message
    });

    res.status(200).json({success: true, data: 'Email sent'})
  }catch (e) {
    console.error(e);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new errorResponse('Email could not be sent', 500))
  }

  res.status(200).json({
    success: true,
    data: user
  })
});

// @desc    Reset password
// @route   PUT /api/v1/reset-password/:resettoken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
  .createHash('sha256')
  .update(req.params.resettoken)
  .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if(!user){
    return next(new errorResponse('Invalid token', 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordToken = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// Get token from model
const sendTokenResponse = (user, statusCode, res) => {

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  // Create token
  const token = user.getSignedJwtToken();

  res
  .status(statusCode)
  .cookie('token', token, options)
  .json({
    success: true,
    token
  })
};
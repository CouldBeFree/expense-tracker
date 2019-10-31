const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('../middleware/async');

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

exports.loginUser = asyncHandler(async (req, res) => {

});
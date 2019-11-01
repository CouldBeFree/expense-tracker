const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updatePassword, getMe, forgotPassword, resetPassword } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

/* Register user */
router.post('/register', registerUser);

/* Login user */
router.post('/login', loginUser);

/* Update password user */
router.put('/update-password', protect, updatePassword);

/* Get current user */
router.get('/me', protect, getMe);

/* Forgot password */
router.post('/forgot-password', forgotPassword);

/* Reset password */
router.put('/reset-password/:resettoken', resetPassword);

module.exports = router;
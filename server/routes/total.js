const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const { getTotal } = require('../controllers/total');

router.get('/', protect, getTotal);

module.exports = router;

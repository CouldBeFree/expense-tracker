const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { setIncome, updateIncome, getIncome, removeIncome } = require('../controllers/incomes');

router.post('/set', protect, setIncome);
router.put('/:id', protect, updateIncome);
router.get('/:id', protect, getIncome);
router.delete('/:id', protect, removeIncome);

module.exports = router;
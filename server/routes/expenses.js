const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { setExpense, updateExpense, getExpense, removeExpense, getExpenses } = require('../controllers/expenses');

router.post('/set', protect, setExpense);
router.put('/:id', protect, updateExpense);
router.get('/:id', protect, getExpense);
router.get('/', protect, getExpenses);
router.delete('/:id', protect, removeExpense);

module.exports = router;
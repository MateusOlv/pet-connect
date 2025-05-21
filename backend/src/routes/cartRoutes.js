const express = require('express');
const router = express.Router();
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/add', addToCart);
router.get('/', getCart);
router.delete('/:productId', removeFromCart);

module.exports = router;

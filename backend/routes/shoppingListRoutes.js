
const express = require('express');
const router = express.Router();
const { getShoppingLists, createShoppingList, updateShoppingList, deleteShoppingList } = require('../controllers/shoppingListController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getShoppingLists).post(protect, createShoppingList);
router.route('/:id').put(protect, updateShoppingList).delete(protect, deleteShoppingList);

module.exports = router;

const ShoppingList = require('../models/ShoppingList');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;

    const shoppingList = await ShoppingList.findById(id).populate('members');
    if (!shoppingList) {
      return res.status(404).json({ error: 'Shopping list not found.' });
    }

    res.status(200).json(shoppingList);
  } catch (err) {
    next(err);
  }
};
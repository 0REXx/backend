const ShoppingList = require('../models/ShoppingList');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;

    const shoppingList = await ShoppingList.findByIdAndDelete(id);
    if (!shoppingList) {
      return res.status(404).json({ error: 'Shopping list not found.' });
    }

    res.status(200).json({ message: 'Shopping list deleted successfully.' });
  } catch (err) {
    next(err);
  }
};
const ShoppingList = require('../models/ShoppingList');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, archived } = req.body;

    const shoppingList = await ShoppingList.findByIdAndUpdate(
      id,
      { name, description, archived },
      { new: true }
    );

    if (!shoppingList) {
      return res.status(404).json({ error: 'Shopping list not found.' });
    }

    res.status(200).json({
      message: 'Shopping list updated successfully.',
      list: shoppingList,
    });
  } catch (err) {
    next(err);
  }
};
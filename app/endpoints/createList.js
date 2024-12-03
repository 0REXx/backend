const ShoppingList = require('../models/ShoppingList');

module.exports = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const userId = req.user.id;

    const newShoppingList = new ShoppingList({
      name,
      description,
      isOwner: userId,
    });

    await newShoppingList.save();

    res.status(201).json({
      message: 'Shopping list created successfully',
      shoppingList: newShoppingList,
    });
  } catch (err) {
    next(err);
  }
};
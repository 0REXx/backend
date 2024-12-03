const Item = require('../models/Item');

module.exports = async (req, res, next) => {
  try {
    const { name, quantity, unit, category, listId } = req.body;

    const newItem = new Item({
      name,
      quantity,
      unit,
      category,
      shoppingList: listId,
    });

    await newItem.save();

    res.status(201).json({
      message: 'Item created successfully',
      item: newItem,
    });
  } catch (err) {
    next(err);
  }
};
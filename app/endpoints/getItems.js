const Item = require('../models/Item');

module.exports = async (req, res, next) => {
  try {
    const { listId } = req.query;

    const items = await Item.find({ shoppingList: listId });

    res.status(200).json({
      message: 'Items retrieved successfully',
      items,
    });
  } catch (err) {
    next(err);
  }
};
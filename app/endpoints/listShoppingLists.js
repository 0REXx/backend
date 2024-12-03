const ShoppingList = require('../models/ShoppingList');

module.exports = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;

    const skip = (page - 1) * pageSize;
    const totalItems = await ShoppingList.countDocuments();
    const lists = await ShoppingList.find().skip(skip).limit(Number(pageSize));

    res.status(200).json({
      page,
      pageSize,
      totalItems,
      lists,
    });
  } catch (err) {
    next(err);
  }
};
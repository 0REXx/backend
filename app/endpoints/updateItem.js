const Item = require('../models/Item');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity, unit, category } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, quantity, unit, category },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found.' });
    }

    res.status(200).json({
      message: 'Item updated successfully.',
      item: updatedItem,
    });
  } catch (err) {
    next(err);
  }
};
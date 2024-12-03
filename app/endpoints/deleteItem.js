const Item = require('../models/Item');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found.' });
    }

    res.status(200).json({
      message: 'Item deleted successfully.',
    });
  } catch (err) {
    next(err);
  }
};
const Member = require('../models/Member');
const ShoppingList = require('../models/ShoppingList');

module.exports = async (req, res, next) => {
  try {
    const { listId, userId, role } = req.body;

    const list = await ShoppingList.findById(listId);
    if (!list) {
      return res.status(404).json({ error: 'Shopping list not found.' });
    }

    if (!['owner', 'member'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Must be "owner" or "member".' });
    }

    const newMember = await Member.create({ userId, shoppingList: listId, role });

    res.status(201).json({
      message: 'Member added successfully.',
      member: newMember,
    });
  } catch (err) {
    next(err);
  }
};
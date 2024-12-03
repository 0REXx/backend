const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shoppingList: { type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingList', required: true },
  role: { type: String, enum: ['owner', 'member'], required: true },
});

module.exports = mongoose.model('Member', memberSchema);
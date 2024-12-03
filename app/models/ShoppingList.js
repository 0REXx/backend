const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  isOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
  archived: { type: Boolean, default: false },
});

module.exports = mongoose.model('ShoppingList', shoppingListSchema);
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  category: { type: String },
  shoppingList: { type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingList', required: true },
});

module.exports = mongoose.model('Item', itemSchema);
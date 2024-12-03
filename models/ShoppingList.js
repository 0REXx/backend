const mongoose = require('mongoose');

const ShoppingListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  items: [
    {
      name: String,
      resolved: Boolean,
      addedAt: { type: Date, default: Date.now },
    },
  ],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }],
  isArchived: { type: Boolean, default: false },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ShoppingList', ShoppingListSchema);

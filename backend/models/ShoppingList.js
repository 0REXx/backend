const mongoose = require('mongoose');

const shoppingListSchema = mongoose.Schema({
    name: { type: String, required: true },
    items: [{ type: String }],
    isOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('ShoppingList', shoppingListSchema);

const mongoose = require('mongoose');
const ShoppingList = require('../models/ShoppingList');

const getShoppingLists = async (req, res) => {
    try {
        const lists = await ShoppingList.find({ isOwner: req.user.id });
        res.json(lists);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createShoppingList = async (req, res) => {
    try {
        const { name, items } = req.body;
        const list = new ShoppingList({ name, items, isOwner: req.user.id });
        await list.save();
        res.status(201).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create shopping list' });
    }
};

const updateShoppingList = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ message: 'Invalid ID format' });
    }

    try {
        const list = await ShoppingList.findById(req.params.id);
        if (list && list.isOwner.toString() === req.user.id) {
            list.name = req.body.name || list.name;
            list.items = req.body.items || list.items;
            await list.save();
            res.json(list);
        } else {
            res.status(404).json({ message: 'List not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update shopping list' });
    }
};

const deleteShoppingList = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ message: 'Invalid ID format' });
    }

    try {
        const list = await ShoppingList.findById(req.params.id);
        if (list && list.isOwner.toString() === req.user.id) {
            await ShoppingList.deleteOne({ _id: req.params.id });
            res.json({ message: 'List removed' });
        } else {
            res.status(404).json({ message: 'List not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete shopping list' });
    }
};

module.exports = { getShoppingLists, createShoppingList, updateShoppingList, deleteShoppingList };




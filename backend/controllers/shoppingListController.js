
const ShoppingList = require('../models/ShoppingList');

const getShoppingLists = async (req, res) => {
    const lists = await ShoppingList.find({ isOwner: req.user.id });
    res.json(lists);
};

const createShoppingList = async (req, res) => {
    const { name, items } = req.body;
    const list = new ShoppingList({ name, items, isOwner: req.user.id });
    await list.save();
    res.status(201).json(list);
};

const updateShoppingList = async (req, res) => {
    const list = await ShoppingList.findById(req.params.id);
    if (list && list.isOwner.toString() === req.user.id) {
        list.name = req.body.name || list.name;
        list.items = req.body.items || list.items;
        await list.save();
        res.json(list);
    } else {
        res.status(404).json({ message: 'List not found or unauthorized' });
    }
};

const deleteShoppingList = async (req, res) => {
    const list = await ShoppingList.findById(req.params.id);
    if (list && list.isOwner.toString() === req.user.id) {
        await list.remove();
        res.json({ message: 'List removed' });
    } else {
        res.status(404).json({ message: 'List not found or unauthorized' });
    }
};

module.exports = { getShoppingLists, createShoppingList, updateShoppingList, deleteShoppingList };

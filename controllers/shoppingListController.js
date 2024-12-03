const ShoppingList = require('../models/ShoppingList');
const Participant = require('../models/Participant');

// Создание нового списка покупок
exports.createShoppingList = async (req, res) => {
  try {
    const list = await ShoppingList.create(req.body);
    res.status(201).json(list);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Получение всех списков покупок
exports.getAllShoppingLists = async (req, res) => {
  try {
    const lists = await ShoppingList.find();
    res.status(200).json(lists);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Получение конкретного списка покупок по ID
exports.getShoppingListById = async (req, res) => {
  try {
    const list = await ShoppingList.findById(req.params.id).populate('members');
    if (!list) return res.status(404).json({ message: 'List not found' });
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Добавление элемента в список покупок
exports.addItemToList = async (req, res) => {
  try {
    const list = await ShoppingList.findById(req.params.id);
    if (!list) return res.status(404).json({ message: 'List not found' });

    list.items.push({ name: req.body.name, resolved: false });
    await list.save();
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Удаление элемента из списка покупок
exports.deleteItem = async (req, res) => {
  try {
    const list = await ShoppingList.findById(req.params.listId);
    if (!list) return res.status(404).json({ message: 'List not found' });

    list.items = list.items.filter(item => item._id.toString() !== req.params.itemId);
    await list.save();
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Обновление статуса элемента в списке
exports.updateItemStatus = async (req, res) => {
  try {
    const list = await ShoppingList.findById(req.params.listId);
    if (!list) return res.status(404).json({ message: 'List not found' });

    const item = list.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.resolved = req.body.resolved;
    await list.save();
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Архивация списка покупок
exports.archiveList = async (req, res) => {
  try {
    const list = await ShoppingList.findById(req.params.id);
    if (!list) return res.status(404).json({ message: 'List not found' });

    list.isArchived = !list.isArchived;
    await list.save();
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Добавление участника к списку
exports.addParticipantToList = async (req, res) => {
  try {
    const list = await ShoppingList.findById(req.params.id);
    if (!list) return res.status(404).json({ message: 'List not found' });

    const participant = await Participant.findById(req.body.participantId);
    if (!participant) return res.status(404).json({ message: 'Participant not found' });

    list.members.push(participant._id);
    await list.save();
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Удаление участника из списка
exports.removeParticipantFromList = async (req, res) => {
  try {
    const list = await ShoppingList.findById(req.params.listId);
    if (!list) return res.status(404).json({ message: 'List not found' });

    list.members = list.members.filter(memberId => memberId.toString() !== req.params.participantId);
    await list.save();
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Получение всех участников списка
exports.getParticipantsInList = async (req, res) => {
  try {
    const list = await ShoppingList.findById(req.params.id).populate('members');
    if (!list) return res.status(404).json({ message: 'List not found' });
    
    res.status(200).json(list.members);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

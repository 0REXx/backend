const express = require('express');
const router = express.Router();
const shoppingListController = require('../controllers/shoppingListController');

router.post('/', shoppingListController.createShoppingList);
router.get('/', shoppingListController.getAllShoppingLists);
router.get('/:id', shoppingListController.getShoppingListById);

router.post('/:id/items', shoppingListController.addItemToList);
router.delete('/:listId/items/:itemId', shoppingListController.deleteItem);
router.patch('/:listId/items/:itemId', shoppingListController.updateItemStatus);

router.patch('/:id/archive', shoppingListController.archiveList);

router.post('/:id/participants', shoppingListController.addParticipantToList);
router.delete('/:listId/participants/:participantId', shoppingListController.removeParticipantFromList);
router.get('/:id/participants', shoppingListController.getParticipantsInList);

module.exports = router;


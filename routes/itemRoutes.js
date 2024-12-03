const express = require('express');
const createItem = require('../app/endpoints/createItem');
const getItems = require('../app/endpoints/getItems');
const updateItem = require('../app/endpoints/updateItem');
const deleteItem = require('../app/endpoints/deleteItem');
const { auth } = require('../app/middleware/auth');

const router = express.Router();

router.post('/create', auth, createItem);
router.get('/list', auth, getItems);
router.put('/update/:id', auth, updateItem);
router.delete('/delete/:id', auth, deleteItem);

module.exports = router;
const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController'); 
router.post('/', participantController.addParticipant);
router.delete('/:id', participantController.removeParticipant);

module.exports = router;


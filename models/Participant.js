const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isOwner: { type: Boolean, default: false },
});

module.exports = mongoose.model('Participant', ParticipantSchema);



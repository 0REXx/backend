const Participant = require('../models/Participant');

exports.addParticipant = async (req, res) => {
  try {
    const participant = await Participant.create(req.body);
    res.status(201).json(participant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeParticipant = async (req, res) => {
  try {
    const participant = await Participant.findByIdAndDelete(req.params.id);
    if (!participant) return res.status(404).json({ message: 'Participant not found' });

    res.status(200).json({ message: 'Participant removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const Member = require('../models/Member');

module.exports = async (req, res, next) => {
  try {
    const { memberId } = req.params;

    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ error: 'Member not found.' });
    }

    await member.deleteOne();

    res.status(200).json({
      message: 'Member removed successfully.',
    });
  } catch (err) {
    next(err);
  }
};
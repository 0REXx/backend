const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);

router.get('/protected', protect, (req, res) => {
    res.status(200).json({ message: 'Доступ к защищённому маршруту', user: req.user });
});

module.exports = router;

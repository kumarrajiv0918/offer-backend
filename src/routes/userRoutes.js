// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerController } = require('../controllers/user/createuserController');
const { getUsersController } = require('../controllers/user/getUsersController');
const { updateUserStatusController } = require('../controllers/user/updateStatusController');
// POST /api/auth/register
router.post('/register', registerController);
router.get('/getUsers', getUsersController);
router.put('/update/:id/status', updateUserStatusController);

module.exports = router;

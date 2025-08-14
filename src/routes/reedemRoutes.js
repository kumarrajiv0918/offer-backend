// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { addReedemController } = require('../controllers/reedem/addReedemController');
const { getAllReedemController } = require('../controllers/reedem/getAllReedemController');

// POST /api/customer/addCustomer
router.post('/addReedem', addReedemController);
router.get('/getAllReedem', getAllReedemController);

module.exports = router;

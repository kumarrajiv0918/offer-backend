// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { addCustomerController } = require('../controllers/customer/addCustomerController');
const { getCustomersController } = require('../controllers/customer/getCustomersController');
const { updateCustomerStatusController } = require('../controllers/customer/updateCustomerController');
const { getCustomerByOTPController } = require('../controllers/customer/getCustomerByOtpController');

// POST /api/customer/addCustomer
router.post('/addCustomer', addCustomerController);
router.get('/getCustomers', getCustomersController);
router.get('/getCustomerByOTP/:otp', getCustomerByOTPController);
router.put('/updateCustomer/:id/status', updateCustomerStatusController);

module.exports = router;

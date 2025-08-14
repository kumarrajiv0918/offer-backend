// routes/index.js
const express = require('express');
const router = express.Router();

// Import individual route modules
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const fileRoutes = require('./fileRoutes')
const customerRoutes = require('./customerRoutes');
const vendorRoutes = require('./vendorRoutes')
const reedemRoutes = require('./reedemRoutes');
// Mount routes
router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/file', fileRoutes);
router.use('/customer', customerRoutes);
router.use('/vendor', vendorRoutes);
router.use('/reedem', reedemRoutes);

module.exports = router;

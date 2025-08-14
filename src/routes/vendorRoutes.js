// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { getVendorByCategoriesController } = require('../controllers/vendor/getVendorBycategoriesController');
const { getAllVendors } = require('../controllers/vendor/getAllvendorController');
const { updateVendorCategoriesController } = require('../controllers/vendor/updateVendorCategoriesController');
// POST /api/vendor/addCustomer

router.post('/getVendorByCategories', getVendorByCategoriesController);
router.get('/vendors', getAllVendors);
router.put('/updateVendorCategories/:id', updateVendorCategoriesController);


module.exports = router;

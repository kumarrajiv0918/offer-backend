const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadVendorExcel, uploadCustomerExcel, getAllVendors, getAllCustomers } = require('../controllers/file/fileController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Upload vendor Excel
router.post('/upload-vendor', upload.single('file'), uploadVendorExcel);

// Upload customer Excel
router.post('/upload-customer', upload.single('file'), uploadCustomerExcel);
router.get('/vendors', getAllVendors);
router.get('/customers', getAllCustomers);

module.exports = router;

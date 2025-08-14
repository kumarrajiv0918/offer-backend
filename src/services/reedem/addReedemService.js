// services/customerService.js
const db = require('../../config/database/db');
const reedemEntity = require('../../entity/reedemEntity');
const { sendVendorOtpDataMail } = require('../../utils/mailer/vendorOtpMail');
const addReedemService = async (reedemData) => {
    const {
        otp,
        customerName,
        customerCategories,
        vendorName,
        customerId,
        vendorId,
        createdBy,
        status,
        email,
        address,
        businessRepresentative,
    } = reedemData;

    try {
        // Check if OTP already exists in RedeemRecords
        const [existingOtp] = await db.query(
            'SELECT * FROM RedeemRecords WHERE otp = ?',
            [otp]
        );

        if (existingOtp.length > 0) {
            return {
                status: false,
                message: 'This OTP has already been used.',
                data: null
            };
        }

        // Insert new redeem record
        const [result] = await db.execute(
            `INSERT INTO RedeemRecords
                (otp, customerName, customerCategories, vendorName, customerId, vendorId, status, createdBy, createdAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
            [
                otp,
                customerName,
                customerCategories,
                vendorName,
                customerId,
                vendorId,
                status || 'Completed',
                createdBy || null,
            ]
        );
        const sendMail = await sendVendorOtpDataMail({
            email,
            vendorName,
            otp,
            category: customerCategories,
            customerName,
        })
        if (!sendMail) {
            console.error('Failed to send email');
            return {
                status: false,
                message: 'Failed to send OTP email',
                data: null
            };
        }
        if (result.affectedRows === 1) {
            return {
                status: true,
                message: 'Redeem record added successfully',
                data: {
                    id: result.insertId,
                    otp,
                    customerName,
                    customerCategories,
                    vendorName,
                    customerId,
                    vendorId,
                    status: status || 'Completed',
                    createdBy: createdBy || null,
                }
            };
        } else {
            return {
                status: false,
                message: 'Failed to add redeem record.',
                data: null
            };
        }
    } catch (error) {
        console.error('Error adding redeem record:', error);
        return {
            status: false,
            message: 'Internal server error',
            error: error.message,
            data: null
        };
    }
};

module.exports = addReedemService;

// services/customerService.js
const db = require('../../config/database/db');
const customerEntity = require('../../entity/customerEntity');
const { sendCustomerOtpMail } = require('../../utils/mailer/customerOtpMail')
// Helper: generate 6-digit OTP
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Helper: ensure OTP is unique
const generateUniqueOtp = async () => {
    let otp;
    let isUnique = false;
    while (!isUnique) {
        otp = generateOtp();
        const [rows] = await db.query('SELECT id FROM customerdata WHERE otp = ?', [otp]);
        if (rows.length === 0) {
            isUnique = true;
        }
    }
    return otp;
};

// Helper: check & add OTP column if not exists
const ensureOtpColumnExists = async () => {
    const [columns] = await db.query(`SHOW COLUMNS FROM customerdata LIKE 'otp'`);
    if (columns.length === 0) {
        await db.query(`ALTER TABLE customerdata ADD COLUMN otp VARCHAR(6)`);
        console.log('✅ Added OTP column to customerdata table');
    }
};

const addCustomerService = async (userData) => {
    const {
        name,
        phoneNo,
        categories,
        location,
        message,
        email,
        submissionStatus,
        vendors = []
    } = userData;

    try {
        await ensureOtpColumnExists();

        const otp = await generateUniqueOtp();

        // Insert customer
        const [result] = await db.query(
            `INSERT INTO customerdata (name, phoneNo, categories, location, message, email, submissionStatus, otp)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, phoneNo, categories, location, message, email, submissionStatus, otp]
        );
        console.log('Customer Insert Result:', vendors);
        // Fetch newly created customer
        const [newCustomer] = await db.query('SELECT * FROM customerdata WHERE id = ?', [result.insertId]);
        if (newCustomer.length === 0) {
            return {
                status: false,
                error: 'Customer creation failed',
                data: null
            };
        }

        const customer = customerEntity(newCustomer[0]);
        const sendMail = await sendCustomerOtpMail(userData, customer.otp);
        console.log('Email sent:', sendMail);
        if (!sendMail) {
            console.error('Failed to send email');
            return {
                status: false,
                error: 'Failed to send email',
                data: null
            };
        }
        return {
            status: true,
            data: customer,
            message: `Customer registered successfully. OTP: ${otp}`
        };

    } catch (error) {
        console.error('Add Customer Service Error:', error);
        return {
            status: false,
            error: 'Internal server error',
            data: null
        };
    }
};

module.exports = addCustomerService;

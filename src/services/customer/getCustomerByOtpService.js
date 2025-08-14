const db = require('../../config/database/db');
const customerEntity = require('../../entity/customerEntity');

const getCustomerByOTPService = async (otp) => {
    try {
        // Check if OTP is already used in redeemrecords
        console.log('Checking OTP in redeemrecords:', otp);
        const redeemCheck = await otpReedem(otp);
        if (redeemCheck.status) {
            return {
                status: false,
                message: 'This OTP has already been used for a redeem.',
                data: null
            };
        }

        // Get customer info
        const [customers] = await db.query('SELECT * FROM customerdata WHERE otp = ?', [otp]);
        if (customers.length === 0) {
            return {
                status: false,
                message: 'No customer found with this OTP.',
                data: null
            };
        }

        const formattedCustomer = customers.map(customer => customerEntity(customer));

        return {
            status: true,
            data: formattedCustomer,
            message: 'Customer fetched successfully'
        };

    } catch (error) {
        console.error('Get customer Error:', error);
        return {
            status: false,
            data: null,
            message: 'Failed to fetch customer data'
        };
    }
};

const otpReedem = async (otp) => {
    try {
        const [redeemRecords] = await db.query('SELECT * FROM redeemrecords WHERE otp = ?', [otp]);
        if (redeemRecords.length > 0) {
            return {
                status: true,
                message: 'OTP already used for redeem',
                data: redeemRecords
            };
        }
        return {
            status: false,
            message: 'OTP not yet used',
            data: null
        };
    } catch (error) {
        console.error('Error checking redeem records:', error);
        return {
            status: false,
            message: 'Error checking redeem records',
            data: null
        };
    }
};

module.exports = getCustomerByOTPService;

const db = require('../../config/database/db');

const getAllReedemService = async () => {
    try {
        const [rows] = await db.execute(
            `SELECT id, otp, customerName, customerCategories, vendorName, customerId, vendorId, status FROM RedeemRecords order By id desc`);

        return {
            status: true,
            error: null,
            data: rows
        };

    } catch (error) {
        console.error('Error fetching redeem records:', error);
        return {
            status: false,
            error: 'Internal server error',
            data: null
        };
    }
};

module.exports = {
    getAllReedemService
}
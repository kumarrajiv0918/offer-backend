const db = require('../../config/database/db');
const customerEntity = require('../../entity/customerEntity');

const getCustomersService = async () => {
    try {
        const [customers] = await db.query(`
                  SELECT 
                c.id AS customerId,
                c.name AS customerName,
                c.*,
                rr.status
            FROM customerdata c
            LEFT JOIN redeemrecords rr ON rr.customerId = c.id
            ORDER BY c.id DESC;
            `);
        const formattedCustomers = customers.map(customer => customerEntity(customer));
        return {
            status: true,
            data: formattedCustomers,
            message: 'Customers fetched successfully'
        };
    } catch (error) {
        console.error('Get customer Error:', error);
        return {
            status: false,
            data: null,
            error: 'Failed to fetch customers'
        };
    }
};

module.exports = getCustomersService;

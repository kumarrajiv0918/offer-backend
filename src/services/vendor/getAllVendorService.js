const db = require('../../config/database/db');
const vendorEntity = require('../../entity/vendorEntity');

const getAllvendorService = async () => {
    try {
        const [vendors] = await db.query(`
            SELECT * FROM vendordata;
        `);

        const formattedVendors = vendors.map(vendor => vendorEntity(vendor));

        return {
            status: true,
            data: formattedVendors,
            message: 'Vendors fetched successfully'
        };
    } catch (error) {
        console.error('Get Vendors Error:', error);
        return {
            status: false,
            data: null,
            error: 'Failed to fetch Vendors'
        };
    }
};

module.exports = getAllvendorService;

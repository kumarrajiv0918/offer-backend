const db = require('../../config/database/db');
const vendorEntity = require('../../entity/vendorEntity');

const getVendorByCategoriesService = async (categories) => {
    try {
        const [vendors] = await db.query('SELECT * FROM vendordata WHERE categories= ?', [categories]);

        // Format vendor using entity and remove password field
        const formattedVendors = vendors.map(vendor => vendorEntity(vendor));
        if (!formattedVendors || formattedVendors.length === 0) {
            return {
                status: false,
                message: 'No vendors found for the given categories',
                data: []
            };
        }
        return {
            status: true,
            message: 'Vendors fetched successfully',
            data: formattedVendors

        };
    } catch (error) {
        console.error('Get vendor Error:', error);
        return {
            status: false,
            data: null,
            error: 'Failed to fetch users'
        };
    }
};

module.exports = getVendorByCategoriesService;

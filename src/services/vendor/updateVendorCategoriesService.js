const db = require('../../config/database/db');

const updateVendorCategoriesService = async (id, categories) => {
    try {
        const [existing] = await db.query('SELECT * FROM vendordata WHERE id = ?', [id]);
        if (existing.length === 0) {
            return {
                status: false,
                message: 'Vendor not found',
                data: null
            };
        }

        await db.query('UPDATE vendordata SET categories = ? WHERE id = ?', [categories, id]);

        return {
            status: true,
            message: 'Vendor categories updated successfully',
            data: { id, categories }
        };
    } catch (error) {
        console.error('Update categories Error:', error);
        return {
            status: false,
            message: 'Failed to update user categories',
            error: error.message
        };
    }
};

module.exports = updateVendorCategoriesService;

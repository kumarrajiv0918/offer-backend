const getVendorByCategoriesService = require('../../services/vendor/getVendorByCategoriesService');

const getVendorByCategoriesController = async (req, res) => {
    const { categories } = req.body;
    try {
        const result = await getVendorByCategoriesService(categories);
        if (!result.status) {
            return res.status(500).json(result[0]);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Get Vendor Controller Error:', error);
        return res.status(500).json({
            status: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = { getVendorByCategoriesController }

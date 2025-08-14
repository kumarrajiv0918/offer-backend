const updateVendorCategoriesService = require('../../services/vendor/updateVendorCategoriesService');
const { updateVendorCategoriesSchema } = require('../../validation/vendor/updateVendorCategoriesValidation');

const updateVendorCategoriesController = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: false,
                message: 'Request body is missing or empty'
            });
        }

        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: false,
                message: 'Vendor ID is required in request parameters'
            });
        }
        const { error } = updateVendorCategoriesSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                status: false,
                message: 'Validation failed',
                details: error.details.map(d => d.message)
            });
        }
        const { categories } = req.body;
        const result = await updateVendorCategoriesService(id, categories);

        if (!result.status) {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);

    } catch (err) {
        console.error('Update Vendor Categories Error:', err);
        return res.status(500).json({
            status: false,
            message: 'Server error',
            error: err.message
        });
    }
};

module.exports = { updateVendorCategoriesController };

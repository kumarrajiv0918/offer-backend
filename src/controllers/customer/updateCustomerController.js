const updateCustomerStatusService = require('../../services/customer/updateCustomerStatusService');
const { updateCustomerStatusSchema } = require('../../validation/customer/updateCustomerStatusValidation');

const updateCustomerStatusController = async (req, res) => {
    const { id } = req.params;

    const { error } = updateCustomerStatusSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message
        });
    }
    const { status } = req.body;

    try {
        const result = await updateCustomerStatusService(id, status);

        if (!result.status) {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);
    } catch (err) {
        console.error('Update Customer Status Error:', err);
        return res.status(500).json({
            status: false,
            message: 'Server error',
            error: err.message
        });
    }
};

module.exports = { updateCustomerStatusController }

// controllers/authController.js
const addCustomerService = require('../../services/customer/addCustomerService');
const { customerSchema } = require('../../validation/customer/joiAddCustomerValidation');

const addCustomerController = async (req, res) => {
    // Validate request body
    const { error } = customerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message
        });
    }

    try {
        const result = await addCustomerService(req.body);
        if (!result.status) {
            return res.status(400).json(result);
        }

        return res.status(201).json(result);
    } catch (err) {
        console.error('Customer Register Error:', err);
        return res.status(500).json({
            status: false,
            message: 'Server error',
            error: err.message
        });
    }
};

module.exports = {
    addCustomerController
};

const addReedemService = require('../../services/reedem/addReedemService');
const { reedemSchema } = require('../../validation/reedem/joiAddreedemValidation');

const addReedemController = async (req, res) => {
    // Validate request body
    const { error } = reedemSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message,
            data: null
        });
    }

    try {
        const result = await addReedemService(req.body);

        if (!result.status) {
            // If OTP is already used, return 409 Conflict
            const statusCode = result.message?.toLowerCase().includes("already") ? 409 : 400;

            return res.status(statusCode).json({
                status: false,
                message: result.message,
                data: null
            });
        }

        return res.status(201).json({
            status: true,
            message: result.message,
            data: result.data
        });
    } catch (err) {
        console.error('Add Redeem Error:', err);
        return res.status(500).json({
            status: false,
            message: 'Internal server error',
            data: null
        });
    }
};

module.exports = {
    addReedemController
};

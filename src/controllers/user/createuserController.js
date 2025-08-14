// controllers/authController.js
const registerService = require('../../services/users/addUserService');
const { registerSchema } = require('../../validation/user/joiCreateValidation');

const registerController = async (req, res) => {
    // Validate request body
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message
        });
    }

    try {
        const result = await registerService(req.body);
        if (!result.status) {
            return res.status(400).json(result);
        }

        return res.status(201).json(result);
    } catch (err) {
        console.error('Register Error:', err);
        return res.status(500).json({
            status: false,
            message: 'Server error',
            error: err.message
        });
    }
};

module.exports = {
    registerController
};

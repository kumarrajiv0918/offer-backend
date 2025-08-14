// controllers/loginController.js
const loginService = require('../../services/auth/loginService');
const { loginSchema } = require('../../validation/auth/loginValidation');

const loginController = async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message
        });
    }

    try {
        const result = await loginService(req.body);
        if (!result.status) {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);
    } catch (err) {
        console.error('Login Error:', err);
        return res.status(500).json({
            status: false,
            message: 'Server error',
            error: err.message
        });
    }
};

module.exports = { loginController } 

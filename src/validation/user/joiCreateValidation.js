// validations/authValidation.js
const Joi = require('joi');

const registerSchema = Joi.object({
    mobile: Joi.number().positive().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

module.exports = {
    registerSchema
};

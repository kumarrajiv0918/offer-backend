const Joi = require('joi');

const updateCustomerStatusSchema = Joi.object({
    status: Joi.string()
        .valid('block', 'unblock')
        .required()
        .messages({
            'any.only': 'Status must be either "block" or "unblock"',
            'any.required': 'Status is required'
        })
});

module.exports = {
    updateCustomerStatusSchema
};

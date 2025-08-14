// validations/authValidation.js
const Joi = require('joi');

const customerSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email address'
    }),
    categories: Joi.string().required().messages({
        'string.empty': 'Categories are required'
    }),
    phoneNo: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.pattern.base': 'Phone number must be a 10-digit number'
    }),
    location: Joi.string().required().messages({
        'string.empty': 'Location is required'
    }),
    message: Joi.string()
        .allow('')
        .optional()
        .messages({
            'string.base': 'Message must be a string'
        }),
    submissionStatus: Joi.string(),
    vendors: Joi.array()
        .items(
            Joi.object({
                id: Joi.number().required().messages({
                    'number.base': 'Vendor ID must be a number',
                    'any.required': 'Vendor ID is required'
                }),
                name: Joi.string().required().messages({
                    'string.base': 'Vendor name must be a string',
                    'any.required': 'Vendor name is required'
                }),
                address: Joi.string().required().messages({
                    'string.base': 'Vendor address must be a string',
                    'any.required': 'Vendor address is required'
                }),
                representativeName: Joi.string().required().messages({
                    'string.base': 'Vendor representative Name must be a string',
                    'any.required': 'Vendor representative Name is required'
                })
            })
        )
        .optional()
        .messages({
            'array.base': 'Vendors must be an array of objects'
        }),
});
module.exports = {
    customerSchema
};

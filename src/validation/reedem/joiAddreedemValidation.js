// validations/authValidation.js
const Joi = require('joi');
const { emit } = require('../../config/database/db');

const reedemSchema = Joi.object({
    otp: Joi.string().required().messages({
        'string.empty': 'OTP is required'
    }),
    customerName: Joi.string().required().messages({
        'string.empty': 'Customer name is required'
    }),
    customerCategories: Joi.string().required().messages({
        'string.empty': 'Customer categories are required'
    }),
    vendorName: Joi.string().required().messages({
        'string.empty': 'Vendor name is required'
    }),
    customerId: Joi.number().required().messages({
        'number.base': 'Customer ID must be a number'
    }),
    vendorId: Joi.number().optional(),
    status: Joi.string().required().messages({
        'string.empty': 'Status is required'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email address'
    }),
    businessRepresentative: Joi.string().optional().messages({
        'string.base': 'Business representative must be a string'
    }),
    address: Joi.string().optional().messages({
        'string.base': 'Address must be a string'
    }),

});

module.exports = {
    reedemSchema
};

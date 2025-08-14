const Joi = require('joi');

const updateVendorCategoriesSchema = Joi.object({
    categories: Joi.string()
        .required().messages({
            'string.empty': 'Categories are required'
        }),
});

module.exports = {
    updateVendorCategoriesSchema
};

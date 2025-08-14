const getCustomersService = require('../../services/customer/getCustomerService');

const getCustomersController = async (req, res) => {
    try {
        const result = await getCustomersService();
        if (!result.status) {
            return res.status(500).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Get Customers Controller Error:', error);
        return res.status(500).json({
            status: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = { getCustomersController }

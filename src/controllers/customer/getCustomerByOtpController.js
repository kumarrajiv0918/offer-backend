const getCustomerByOTPService = require('../../services/customer/getCustomerByOtpService');

const getCustomerByOTPController = async (req, res) => {
    const { otp } = req.params;

    try {
        const result = await getCustomerByOTPService(otp);

        if (!result.status) {
            // If OTP is already customer not found, return 400
            return res.status(400).json(result);
        }

        // Success
        return res.status(200).json(result);

    } catch (error) {
        console.error('Get Customer Controller Error:', error);
        return res.status(500).json({
            status: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = { getCustomerByOTPController };

const getAllvendorService = require('../../services/vendor/getAllVendorService');

const getAllVendors = async (req, res) => {
    try {
        const result = await getAllvendorService();

        res.status(200).json({
            message: result.message,
            status: result.status,
            data: result.data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            error: 'Failed to fetch vendor data'
        });
    }
};

module.exports = { getAllVendors };

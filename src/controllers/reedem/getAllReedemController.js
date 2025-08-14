const { getAllReedemService } = require('../../services/reedem/getAllReedemService');

const getAllReedemController = async (req, res) => {
    try {
        const result = await getAllReedemService();

        if (!result.status) {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);
    } catch (err) {
        console.error('Get All Redeem Error:', err);
        return res.status(500).json({
            status: false,
            message: 'Server error',
            error: err.message
        });
    }
};

module.exports = {
    getAllReedemController
};

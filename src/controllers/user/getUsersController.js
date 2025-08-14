const getUsersService = require('../../services/users/getUsersService');

const getUsersController = async (req, res) => {
    try {
        const result = await getUsersService();
        if (!result.status) {
            return res.status(500).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Get Users Controller Error:', error);
        return res.status(500).json({
            status: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = { getUsersController }

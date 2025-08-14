const db = require('../../config/database/db');

const updateUserStatusService = async (id, status) => {
    try {
        const [existing] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        if (existing.length === 0) {
            return {
                status: false,
                message: 'User not found',
                data: null
            };
        }

        await db.query('UPDATE users SET status = ? WHERE id = ?', [status, id]);

        return {
            status: true,
            message: 'User status updated successfully',
            data: { id, status }
        };
    } catch (error) {
        console.error('Update Status Error:', error);
        return {
            status: false,
            message: 'Failed to update user status',
            error: error.message
        };
    }
};

module.exports = updateUserStatusService;

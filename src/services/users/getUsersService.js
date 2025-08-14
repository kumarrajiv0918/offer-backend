const db = require('../../config/database/db');
const userEntity = require('../../entity/userEntity');

const getUsersService = async () => {
    try {
        const [users] = await db.query('SELECT * FROM users ORDER BY id DESC');

        // Format users using entity and remove password field
        const formattedUsers = users.map(user => userEntity(user));

        return {
            status: true,
            data: formattedUsers,
            message: 'Users fetched successfully'
        };
    } catch (error) {
        console.error('Get Users Error:', error);
        return {
            status: false,
            data: null,
            error: 'Failed to fetch users'
        };
    }
};

module.exports = getUsersService;

// services/loginService.js
const db = require('../../config/database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userEntity = require('../../entity/userEntity');

const loginService = async ({ email, password }) => {
    try {
        // Find user by email
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return {
                status: false,
                error: 'Invalid email or password',
                data: null
            };
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return {
                status: false,
                error: 'Invalid email or password',
                data: null
            };
        }

        // Clean user entity
        const cleanUser = userEntity(user);

        // Create JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' }
        );

        return {
            status: true,
            message: 'Login successful',
            data: cleanUser,
            token
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            status: false,
            error: 'Internal server error',
            data: null
        };
    }
};

module.exports = loginService;

// services/authService.js
const db = require('../../config/database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userEntity = require('../../entity/userEntity');

const registerService = async (userData) => {
    const {
        mobile,
        email,
        password
    } = userData;

    try {
        // Check if user already exists
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return {
                status: false,
                error: 'User already exists',
                data: null
            };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        const [result] = await db.query(
            `INSERT INTO users (mobile, email, password)
       VALUES (?, ?, ?)`,
            [mobile, email, hashedPassword]
        );

        // Fetch the newly created user
        const [newUser] = await db.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
        if (newUser.length === 0) {
            return {
                status: false,
                error: 'User creation failed',
                data: null
            };
        }

        // Convert user to entity format (removes hashed password)
        const user = userEntity(newUser[0]);

        // Generate JWT token
        const token = jwt.sign(
            { id: result.insertId, email },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' }
        );

        return {
            status: true,
            data: user,
            token,
            message: 'User registered successfully'
        };

    } catch (error) {
        console.error('Register Service Error:', error);
        return {
            status: false,
            error: 'Internal server error',
            data: null
        };
    }
};

module.exports = registerService;

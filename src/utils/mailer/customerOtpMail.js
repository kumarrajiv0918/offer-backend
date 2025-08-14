const nodemailer = require('nodemailer');
const customerOtpMailTemplate = require('../template/customerOtpMailTemplate');

/**
 * Sends an email to the user with their data.
 * @param {Object} user - The user object containing email and other data.
 * @param {string} user.email - The user's email address.
 * @param {string} user.name - The user's name.
 * @param {string} otp - OTP code to send
 * @returns {Promise} - Resolves when the email is sent.
 */
async function sendCustomerOtpMail(user, otp) {
    // Configure your SMTP transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: user.email,
        subject: `Your Exclusive Offer OTP and Vendor Details from Connect India Enterprises`,
        html: customerOtpMailTemplate({
            name: user.name,
            representativeName: user.representativeName,
            email: user.email,
            phoneNo: user.phoneNo,
            location: user.location,
            categories: user.categories,
            otp: otp,
            vendors: user.vendors || [],
            message: user.message || ''
        }),
    };

    // Send the email
    return transporter.sendMail(mailOptions);
}

module.exports = { sendCustomerOtpMail };

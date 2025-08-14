const nodemailer = require('nodemailer');
const vendorOtpVerificationTemplate = require('../template/vendorOtpMailTemplate copy');

/**
 * Sends vendor OTP email with minimal required fields.
 * @param {Object} data - Data for the vendor OTP email
 * @param {string} data.email - Vendor's email
 * @param {string} data.vendorName - Vendor's name
 * @param {string} data.otp - OTP code
 * @param {string} data.category - Vendor's category
 * @param {string} [data.customerName] - Customer's name (optional)
 * @param {string} [data.customerPhone] - Customer's phone (optional)
 */
async function sendVendorOtpDataMail({
    email,
    vendorName,
    otp,
    category,
    customerName = '',
}) {
    // Configure SMTP transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: `Your Exclusive Offer OTP from Connect India Enterprises`,
        html: vendorOtpVerificationTemplate({
            vendorName,
            otp,
            category,
            customerName,
        }),
    };

    // Send the email
    return transporter.sendMail(mailOptions);
}

module.exports = { sendVendorOtpDataMail };

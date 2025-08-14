/**
 * Generates an HTML email template for sending OTP and vendor list to customer.
 * @param {Object} params
 * @param {string} params.name - Customer's name
 * @param {string} params.email - Customer's email
 * @param {string} params.phoneNo - Customer's phone number
 * @param {string} params.location - Customer's location
 * @param {string} params.categories - Categories of interest
 * @param {Array<{businessName: string, email?: string, phoneNo?: string, address?: string, representativeName?: string}>} params.vendors
 * @param {string} [params.message] - Optional message
 * @param {string} [params.otp] - One-Time Password
 * @returns {string} HTML email template
 */
function customerOtpMailTemplate({
    name,
    email,
    phoneNo,
    location,
    categories,
    vendors = [],
    message = '',
    otp = ''
}) {
    const vendorList = vendors.length
        ? vendors.map(v => `
            <div style="margin-bottom: 15px;">
                <strong>Business Name:</strong> ${v.name || ''} <br />
                ${v.representativeName ? `<strong>Representative Name:</strong> ${v.representativeName}<br/>` : ''}
                ${v.address ? `<strong>Address:</strong> ${v.address}<br/>` : ''}
            </div >
    `).join('')
        : '<p>No vendors found.</p>';

    return `
            <h2>Dear ${name},</h2>
            <p>Thank you for showing interest in our exclusive offer through <strong>Connect India Enterprises</strong>.</p>
            
            <p>Based on your request for an offer under the <strong>${categories}</strong> category, we are pleased to share the details of our associated vendor(s). You may select any one of the vendors listed below to redeem your offer.</p>
            
            <p><strong>Your One-Time OTP:</strong> <span style="color:red; font-size: 18px;">${otp}</span></p>
            <p>Please present this OTP at the selected vendor's store to avail the discount.</p>
            
            <h3>📍 Available Shop(s) in ${categories} Category:</h3>
            ${vendorList}
            
            <h3>✅ Redemption Instructions:</h3>
            <ol>
                <li>Choose any one vendor from the list above.</li>
                <li>Visit the vendor on <strong>Saturday or Sunday only</strong>.</li>
                <li>Show the OTP mentioned above to the vendor to avail the discount.</li>
                <li>The vendor will verify your OTP with our database before processing the discount.</li>
            </ol>
            
            <p>🔔 <strong>Note:</strong> This OTP is valid for one-time use only and cannot be reused or transferred.</p>
            
            <p>If you have any questions or need assistance, feel free to contact us at <strong>+91-7898191919</strong>.</p>
            
            <p>Thank you for choosing <strong>Connect India Enterprises</strong>.<br/>
            We hope you enjoy your shopping experience!</p>
            
            <p>Warm regards,<br/>
            <strong>Connect India Enterprises Team</strong><br/>
            📞 +91-7898191919, +91-9752969749</p>
        </div >
    `;
}

module.exports = customerOtpMailTemplate;

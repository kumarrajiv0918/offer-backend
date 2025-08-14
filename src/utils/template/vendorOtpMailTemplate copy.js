/**
 * Generates an HTML email template for vendors to verify a customer's OTP.
 * @param {Object} params
 * @param {string} params.vendorName - Vendor's name
 * @param {string} params.otp - OTP for offer redemption
 * @param {string} params.category - Offer category
 * @param {string} [params.customerName] - Optional: Customer's name
 * @param {string} [params.customerPhone] - Optional: Customer's phone number
 * @returns {string} HTML email template
 */
function vendorOtpVerificationTemplate({
    vendorName,
    otp,
    category,
    customerName = '',
}) {
    return `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
            <h2>Dear ${vendorName},</h2>
            <p>Greetings from <strong>Connect India Enterprises</strong>.</p>

            <p>We are reaching out to share the <strong>One-Time Password (OTP)</strong> for a customer who has claimed an exclusive offer under your category <strong>${category}</strong>.</p>

            <p style="font-size: 16px; background: #f8f8f8; padding: 10px; border-left: 4px solid #007bff;">
                <strong>OTP for Verification:</strong> 
                <span style="color:red; font-size: 18px;">${otp}</span><br/>
                <strong>Validity:</strong> One-time use only<br/>
                <strong>Redemption Window:</strong> Saturday & Sunday only
            </p>

            ${customerName || customerPhone ? `
                <h3>Customer Details:</h3>
                <ul>
                    ${customerName ? `<li><strong>Name:</strong> ${customerName}</li>` : ''}
                </ul>
            ` : ''}

            <h3>📋 Important Guidelines:</h3>
            <ol>
                <li>The customer must present the original OTP email issued by Connect India Enterprises at the time of redemption.</li>
                <li>You must verify this OTP against the one shared in this email before processing the offer.</li>
                <li>If the OTP is incorrect or missing, the offer should <strong>not</strong> be redeemed.</li>
                <li>If the offer is redeemed without proper OTP verification, Connect India Enterprises will not be responsible for that transaction.</li>
            </ol>

            <p>If you have any questions or concerns, please contact us directly:</p>
            <p>
                📞 <strong>+91-7898191919</strong> | <strong>+91-9752969749</strong><br/>
                📧 <strong>${process.env.MAIL_USER || 'connectindia@example.com'}</strong>
            </p>

            <p>We appreciate your cooperation in ensuring a smooth and secure redemption process for our valued customers.</p>

            <p>Warm regards,<br/>
            <strong>Manoj Kumar Tiwari</strong><br/>
            Connect India Enterprises</p>
        </div>
    `;
}

module.exports = vendorOtpVerificationTemplate;

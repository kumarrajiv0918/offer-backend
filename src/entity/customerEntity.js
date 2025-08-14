const customerEntity = (customer) => {
    if (!customer) return null;

    return {
        id: customer.id,
        email: customer.email,
        name: customer.name,
        phoneNo: customer.phoneNo || null,
        categories: customer.categories || null,
        location: customer.location || null,
        message: customer.message || null,
        submissionStatus: customer.submissionStatus || null,
        otp: customer.otp || null,
        status: customer.status || null
    };
};

module.exports = customerEntity;

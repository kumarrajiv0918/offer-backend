// entities/vendorEntity.js
const vendorEntity = (vendor) => {
    if (!vendor) return null;

    return {
        id: vendor.id,
        email: vendor.email,
        businessName: vendor.businessName,
        representativeName: vendor.businessRepresentative,
        phoneNo: vendor.phoneNo,
        categories: vendor.categories,
        address: vendor.address,
        message: vendor.message,
        submissionStatus: vendor.submissionStatus,
        otp: vendor.otp
    };
};

module.exports = vendorEntity;

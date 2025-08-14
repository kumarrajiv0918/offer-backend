// entities/customerEntity.js

const reedemEntity = (reedem) => {
    if (!reedem) return null;

    return {
        id: reedem.id,
        customeName: reedem.customeName,
        customerCategories: reedem.customerCategories,
        vendorName: reedem.vendorName,
        customerId: reedem.customerId,
        vendorId: reedem.vendorId,
        status: reedem.status,
        otp: reedem.otp,
        createdBy: reedem.createdBy,
    };
};

module.exports = reedemEntity;

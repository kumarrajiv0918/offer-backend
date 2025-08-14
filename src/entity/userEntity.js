// entities/userEntity.js

const userEntity = (user) => {
    if (!user) return null;

    return {
        id: user.id,
        status: user.status,
        firstName: user.firstName,
        lastName: user.lastName,
        organizationName: user.organizationName,
        email: user.email,
        createdBy: user.createdBy,
        createdAt: user.createdAt,
        updatedBy: user.updatedBy ?? null,
        updatedAt: user.updatedAt ?? null
    };
};

module.exports = userEntity;

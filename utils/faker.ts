export const generateUser = () => ({ 
    email: `test_user_${Math.floor(Math.random() * 10000)}@example.com`, 
    password: 'Password123!' 
});

export const generateInvalidUser = () => ({ 
    email: "invalid-email",
    password: 'Password123!' 
});

export const generateMismatchedPasswords = () => ({ 
    email: `test_user_${Math.floor(Math.random() * 10000)}@example.com`, 
    password: 'Password123!', 
    confirmPassword: 'MismatchedPassword123!' 
});

export const generateExistingUser = () => ({ 
    email: "test_user_6191@example.com", 
    password: 'Password123!' 
});

export type Alert = {
    name: string;
    city: string;
    minPrice: string;
    maxPrice: string;
    minBedrooms: string;
    propertyType: string;
}

export const generateAlert = (): Alert => ({
    name: `Test Alert ${Math.floor(Math.random() * 10000)}`,
    city: "New York",
    minPrice: "500000",
    maxPrice: "1000000",
    minBedrooms: "3",
    propertyType: "House"
});

export const OldAlert: Alert = {
    name: "Test Alert 9302",
    city: "New York",
    minPrice: "500000",
    maxPrice: "1000000",
    minBedrooms: "3",
    propertyType: "House"
};
export const oldAlert: Alert = {
    "name": "Test Alert 4918",
    "city": "New York",
    "minPrice": "500000",
    "maxPrice": "1000000",
    "minBedrooms": "3",
    "propertyType": "House"
};
const validateUser = (data) => {
    const errors = {};
    if (!data.username || data.username.trim() === '') {
        errors.username = 'Username is required';
    }
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Valid email is required';
    }
    if (!data.password || data.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }
    return errors;
};

const validateShoppingList = (data) => {
    const errors = {};
    if (!data.name || data.name.trim() === '') {
        errors.name = 'Shopping list name is required';
    }
    if (!Array.isArray(data.items)) {
        errors.items = 'Items must be an array of strings';
    }
    return errors;
};

module.exports = { validateUser, validateShoppingList };

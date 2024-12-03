const formatResponse = (data, message = 'Success') => {
    return { data, message };
};

module.exports = { formatResponse };

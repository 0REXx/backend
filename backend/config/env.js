const dotenv = require('dotenv');

const loadEnv = () => {
    const result = dotenv.config();
    if (result.error) {
        throw new Error("Couldn't load environment variables. Make sure .env file exists");
    }
};

module.exports = { loadEnv };

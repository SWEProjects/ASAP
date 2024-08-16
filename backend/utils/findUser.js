const bcrypt = require('bcrypt');
/**
 * Function to check if a user with the given email and roll number exists
 * @param {string} email - The email to check
 * @param {string} roll - The roll number to check
 * @returns {Promise<boolean>} - True if the user exists, false otherwise
 */
const doesUserExist = async (Schema, email, roll) => {
    try {
        const user = await Schema.findOne({ where: { email, roll } });
        return !!user;
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw error;
    }
};

module.exports = { doesUserExist };

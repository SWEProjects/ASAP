const bcrypt = require('bcrypt');
const { User } = require('../models');
const { doesUserExist } = require("../utils/findUser");
const saltRounds = 10;

const signup = async (req, res) => {
    const { firstName, lastName, roll, semester, email, password } = req.body;

    console.log(firstName, lastName, roll, semester, email, password);

    try {
        // Ensure doesUserExist is awaited if it's asynchronous
        const userExists = await doesUserExist(User, email, roll);

        if (userExists) {
            console.log("User already exists!");
            return res.status(400).json({
                message: "USER_EXISTS"
            });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            firstName,
            lastName,
            roll,
            semester,
            email,
            password: hashedPassword
        });

        console.log('User created:', newUser);

        res.status(201).json({
            message: 'User signed up successfully!'
        });

    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({
            message: 'Error signing up user',
            error: error.message
        });
    }
};

module.exports = signup;

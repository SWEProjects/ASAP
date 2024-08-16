const validateUser = (req, res) => {
    if (req.user) {
       
        res.status(200).json({
            isLoggedIn: true,
            email: req.user.email,
            isStudent: req.user.isStudent
        });
    } else {
        res.status(401).json({
            isLoggedIn: false,
            message: "FORBIDDEN"
        });
    }
};

module.exports = validateUser;

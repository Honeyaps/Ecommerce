const jwt = require('jsonwebtoken');

const Auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ msg: "No token provided" });
    }

    const token = authHeader.split(' ')[1]; // Extract the token part

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: "Invalid token" });
        }

        req.userId = decoded.id; // Ensure your token includes the user ID
        next();
    });
};

module.exports = Auth;

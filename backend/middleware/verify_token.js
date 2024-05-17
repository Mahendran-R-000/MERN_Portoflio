const jwt = require("jsonwebtoken");
// Secret key for signing and verifying JWT tokens
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET ;

const verifyTokenMiddleware = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized. Token is missing.' });
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
        }

        // Attach the decoded payload (admin's identity information) to the request object
        req.admin = decoded;

        next();
    });
};
module.exports=verifyTokenMiddleware;
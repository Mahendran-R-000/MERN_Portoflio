// auth_middleware.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin_model');
const {verify} = require("jsonwebtoken");
require("dotenv").config();
// Secret key for signing and verifying JWT tokens
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (adminData) => {
    // Generate JWT token with admin data
    return jwt.sign({adminData }, JWT_SECRET, { expiresIn: '15m' });
};

const adminAuthMiddleware = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({ message: 'Authentication failed. Email not found.' });
        }
        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Authentication failed. Invalid password.' });
        }

        // Generate token
        const token = generateToken({ email: admin.email });

        // Make admin data and token available in the response object
        res.locals.admin = admin;
        res.locals.token = token;

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {adminAuthMiddleware,generateToken};

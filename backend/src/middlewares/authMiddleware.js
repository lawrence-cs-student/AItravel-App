const jwt = require("jsonwebtoken");

const User = require("../models/User");


const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.header.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({message: "Invalid token format"});
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        const user = User.findById(decoded.id).select("-password");

        if(!user) {
            return res.status(401).json({message: "User not found"})
        }

        req.user = user;

        next();
    } catch (err) {
        return res.status(500).json({
            message: "Network Error"
        });
    }
}

module.exports = authMiddleware;
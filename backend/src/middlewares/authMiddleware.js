
import jwt from "jsonwebtoken"
import User from '../models/User.js'
import { body, validationResult} from 'express-validator'

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({message: "Invalid token format"});
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        const user = await User.findById(decoded.id).select("-password");

        if(!user) {
            return res.status(401).json({message: "User not found"})
        }

        req.user = user;

        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        return res.status(500).json({ message: "Server error" });
    }
}



const validateSignup = [
    body("username").isString().notEmpty().withMessage("Username is required"),
    body("fullname").isString().notEmpty().withMessage("Fullname is required"),
    body("password")
        .isString()
        .notEmpty()
        .isLength({ min: 8}),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false,
                errors: errors.array() 
            });
        }
        next();
    }
]

export {authMiddleware, validateSignup}

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const {fullname, username, password} = req.body;

        const existing = await User.findOne({ username });

        if (existing) {
            return res.status(400).json({
                message: "Username already existing!"
            })
        }

        const user = await User.create({fullname, username, password});
        res.status(201).json({
            detail: "User Account Created Successfully",
            data: user
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({message: "Server Error"});
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if(!user) {
            return res.status(401).json({message : "Invalid username"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({message : "Wrong Password"});
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_KEY,
            { expiresIn: "1d"}
        );

        return res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                fullname: user.fullname
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Server Error"});
    }

}

module.exports = { signup, login };
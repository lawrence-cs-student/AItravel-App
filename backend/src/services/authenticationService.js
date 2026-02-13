
const jwt = require("jsonwebtoken");
const User = require("..models/User");
const bcrypt = require("bcrypt");
require('dotenv').config();
import { userSchema } from "../schema/userSchema"

const login = async (username, password) => {

    const jwt_key = process.env.JWT_KEY;
    const user = await User.findOne(usernmae);

    if (!user) {
        throw new Error("Invalid username!");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Password is incorrect")
    }

    const accessToken = jwt.sign(
        {id: user._id},
        jwt_key,
        {expiresIn: "1d"}
    )

    const userObject = {
        username: user.username,
        fullname: user.fullname
    }

    return {
        user: userObject,
        token: accessToken
    }
}

const signup = async (username, fullname, password) => {

    const isStrongPassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    };

    if (!isStrongPassword(password)) {
        throw new Error("Password is weak")
    }


}


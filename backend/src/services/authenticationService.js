
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from '../models/User.js';
import { ValidationError, DuplicateError, AuthenticationError, NotFoundError } from "../utils/error.js";

export const loginService = async (username, password) => {
    const user = await User.findOne({username});

    if (!user) {
        throw new NotFoundError("Invalid username!");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(user.password);
    if (!isMatch) {
        throw new AuthenticationError("Password/Username is incorrect");
        
    }
    

    const accessToken = jwt.sign(
        {id: user._id},
        process.env.JWT_KEY,
        {expiresIn: "1d"}
    );

    const userObject = {
        username: user.username,
        fullname: user.fullname
    };

    return {
        user: userObject,
        token: accessToken
    };
};

export const signupService = async (fullname, username, password) => {
    const isStrongPassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    };

    if (!isStrongPassword(password)) {
        throw new ValidationError("Password is weak.");
    }

    const isExisting = await User.findOne({username});

    if (isExisting) {
        throw new DuplicateError("Username already existing.");
    }

    const user = await User.create({
        fullname, 
        username, 
        password
    });

    return {
        data: user,
        message: "Signed up successfully"
    };
};
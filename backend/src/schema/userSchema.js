import { body} from 'express-validator';

const userSchema = [
    body("username").isString().notEmpty().withMessage("Username is required"),
    body("fullname").isString().notEmpty().withMessage("Fullname is required"),
    password("password")
        .isString()
        .notEmpty()
        .isLength({ min: 8})
]
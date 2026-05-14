
import { loginService, signupService } from '../services/authenticationService.js'


const signup = async (req, res) => {
    try {
        const {fullname, username, password} = req.body;

        const result = await signupService(fullname, username, password)

        res.status(201).json({
            detail: "User Account Created Successfully",
            data: result
        });
        
    } catch(err) {
        if (err.message === "Password is weak.") {
            return res.status(400).json({
                message: err.message,
                error: "VALIDATION_ERROR"
            })
        }

        if (err.message === "Username already existing.") {
            return res.status(409).json({
                message: err.message,
                error: "DUPLICATE_ERROR"
            })
        }

        res.status(500).json({
            message: err.message,
            error: "INTERNAL_SERVER_ERROR"
        })
    }
}
     
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required"
            });
        }

        const result = await loginService(username, password)

        res.status(200).json({
            success: true,
            data: result
        })
        
    } catch (err) {

        if (err.name === "NotFoundError") {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }

        if (err.name === "AuthenticationError")
            return res.status(404).json({
                success: false,
                message: err.message
            })

        console.error(err);
        res.status(500).json({message: "Server Error"});
    }

}

export { signup, login };
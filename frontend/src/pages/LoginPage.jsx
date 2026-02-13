import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import useUserStore from "../store/userStore";
import { MdPerson } from "react-icons/md";
import { FiLock } from "react-icons/fi";

export default function Login() {

    const navigate = useNavigate();

    const storeUser = useUserStore((state) => state.storeUser);
    
    
    const [formData, setFormData] = useState({
        username : "",
        password : ""
    })
    
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({ ...prev, [name]: value}));
    }

    const validate = () => {
        const currentErrors = {};
        if (!formData.username) {
            currentErrors.username = "Username is required"
        }

        if (!formData.password) {
            currentErrors.password = "Password is required";
        }

        return currentErrors;

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setErrors({});
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:3000/auth/login", formData, 
                {headers : {"Content-Type" : "application/json"} }
            );

            setSuccess(`User ${response.data.email} authenticated`);
            setFormData({
                username: "",
                password: ""
            })

            const token = response.data.token;
            const user = response.data.user;
            
            storeUser(token, user);

            navigate("/dashboard")
        } catch (err) {
            if (err.response?.data?.detail) {
                setErrors({api: err.response.data.detail})
            } else {
                setErrors({api: "Network Error"})
            }
        } finally {
            setLoading(false);
        }

    }

    const description = "Travelai is a smart travel companion web app that uses AI to instantly discover top attractions, nearby food spots, and essential travel details for any destination.";
    return (
        <div className="flex h-full w-full bg-white justify-center items-center flex-col">
            {success && <p className="text-green-800">{success}</p>}
            <form 
                onSubmit={handleSubmit}
                className="bg-transparent w-4/5 backdrop-blur-md h-auto max-w-md flex justify-center 
                flex-col gap-2 rounded-3xl p-5 shadow-2xl mb-2"
            >
                <h2 className="w-full text-[35px] sm:text-[50px] font-extrabold text-[#206A5D] self-center mb-1">TRAVELAI</h2>
                <p className="w-full text-[#206A5D]/70 text-sm sm:text-base mb-4">
                    {description}
                </p>

                <label className="font-medium text-[#206A5D]">Username:</label>
                <div className="relative">
                    <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        className="w-full pl-10 pr-3 py-3 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#206A5D]/40"
                    />
                </div>

                <label className="font-medium text-[#206A5D]">Password:</label>
                <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full pl-10 pr-3 py-3 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#206A5D]/40"
                    />
                </div>
                <Link 
                    className="text-[#206A5D]/80 font-semibold self-end mt-1
                        hover:underline hover:text-[#1F4068] transition-colors"
                    to="/signup"
                >
                    Signup?
                </Link>
                <button
                    disabled={loading}
                    className={`
                        w-full sm:w-auto px-6 py-3 mt-4 bg-[#206A5D] rounded-lg text-white text-md lg:text-xl font-bold transition
                        ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#1F4068]"}
                    `}
                    >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {errors.api && <p className="text-red-800">{errors.api}</p>}
            </form>

            {/* <img 
                src="../public/images/plane.png" 
                className="absolute left-0 -top-[5px] plane w-[250px]"
             /> */}
            <img 
                src="images/ship.png" 
                className="absolute left-0 -bottom-[25px] boat w-[250px] hidden md:block"
            />
        </div>
    )
}
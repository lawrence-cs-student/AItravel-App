import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import useUserStore from "../store/userStore";
import { MdPerson } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";



export default function Signup() {
    const navigate = useNavigate();

    const storeUser = useUserStore((state) => state.storeUser);
    
    
    const [formData, setFormData] = useState({
        fullname: "",
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

        if (!formData.fullname) {
            currentErrors.fullname = "Name is required!";
        }

        if (!formData.username) {
            currentErrors.username = "Username is required!";
        }

        if (!formData.password) {
            currentErrors.password = "Password is required!";
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
            const response = await axios.post("http://localhost:3000/auth/signup", formData, 
                {headers : {"Content-Type" : "application/json"} }
            );

            setSuccess(response.data.detail);
            setFormData({
                fullname: "",
                email: "",
                password: ""
            })

            const id = response.data.id;
            
            
            storeUser(id);

            navigate("/login");
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

    
    return (
        <div className="flex h-full w-full bg-white justify-center items-center flex-col">
            
            <form 
                onSubmit={handleSubmit}
                className="bg-transparent w-4/5 backdrop-blur-md h-auto max-w-md flex justify-center 
                flex-col gap-2 rounded-3xl p-5 shadow-2xl"
            >
                <h2 className="w-full text-[35px] sm:text-[35px] font-bold text-[#206A5D] self-center mb-3">Create Your Account</h2>
                {success && <p className="text-green-800">{success}</p>}

                {/* Fullname */}
                <label className="font-medium text-[#206A5D]">Fullname:</label>
                <div className="relative">
                    <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Enter your fullname"
                        className="w-full pl-10 pr-3 py-3 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#206A5D]/40"
                    />
                </div>
                {/* Username */}
                <label className="font-medium text-[#206A5D]">Username:</label>
                <div className="relative">
                    <MdAccountCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        className="w-full pl-10 pr-3 py-3 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#206A5D]/40"
                    />
                </div>
                {/* Password */}
                <label className="font-medium text-[#206A5D]">Password:</label>
                <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-3 py-3 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#206A5D]/40"
                    />
                </div>
                <Link 
                    className="text-gray-500 font-semibold self-end mt-1 hover:text-[#206A5D]"
                    to="/login"
                >
                    Login?
                </Link>
                <button
                    disabled={loading}
                    className={`
                        w-full sm:w-auto px-6 py-3 mt-4 bg-[#206A5D] rounded-lg text-white text-lg font-bold transition
                        ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#1F4068]"}
                    `}
                    >
                    {loading ? "Signing up..." : "Signup"}
                </button>

                {errors.api && <p className="text-red-800">{errors.api}</p>}
            </form>

            {/* <img 
                src="../public/images/plane.png" 
                className="absolute left-0 -top-[5px] plane w-[250px]"
             /> */}
            <img 
                src="../public/images/ship.png" 
                className="absolute left-0 -bottom-[25px] boat w-[250px]"
            />
        </div>
    )
}
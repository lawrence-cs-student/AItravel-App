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
        username: "",
        password: ""
    })

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
                { headers: { "Content-Type": "application/json" } }
            );

            setSuccess(`User ${response.data.email} authenticated`);
            setFormData({
                username: "",
                password: ""
            })

            const { token, user } = response.data.data

            storeUser(token, user);

            navigate("/dashboard/discover")
        } catch (err) {
            if (err.response?.data?.message) {
                setErrors({ api: err.response.data.message })
            } else {
                setErrors({ api: "Server Error" })
            }
        } finally {
            setLoading(false);
        }

    }

    const description = "Travelai is a smart travel companion web app that uses AI to instantly discover top attractions, nearby food spots, and essential travel details for any destination.";
    return (
        <div className="flex h-full w-full bg-white justify-center items-center flex-col">
            {success && (
                <p className="text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm mb-4">
                    {success}
                </p>
            )}
            <form
                onSubmit={handleSubmit}
                className="bg-white w-4/5 max-w-md flex flex-col gap-4 rounded-3xl p-8 shadow-xl border border-[#206A5D]/10 mb-2"
            >
                {/* Header */}
                <div className="mb-2">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-[#206A5D] tracking-tight">TRAVELAI</h2>
                    <p className="text-[#206A5D]/60 text-sm sm:text-base mt-2 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Username */}
                <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-sm text-[#206A5D]">Username</label>
                    <div className="relative">
                        <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-[#206A5D]/50" size={18} />
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#206A5D]/20
                                       bg-[#206A5D]/5 placeholder-[#206A5D]/30 text-[#1B1C25]
                                       focus:outline-none focus:ring-2 focus:ring-[#206A5D]/40 focus:border-transparent
                                       transition-all duration-200"
                        />
                    </div>
                    {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-sm text-[#206A5D]">Password</label>
                    <div className="relative">
                        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#206A5D]/50" size={16} />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#206A5D]/20
                                       bg-[#206A5D]/5 placeholder-[#206A5D]/30 text-[#1B1C25]
                                       focus:outline-none focus:ring-2 focus:ring-[#206A5D]/40 focus:border-transparent
                                       transition-all duration-200"
                        />
                    </div>
                    {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-xs text-[#206A5D]/50">Don't have an account?</span>
                    <Link
                        className="text-[#206A5D] font-semibold text-sm hover:text-[#1F4068] hover:underline transition-colors"
                        to="/signup"
                    >
                        Sign up
                    </Link>
                </div>

                <button
                    disabled={loading}
                    className={`w-full py-3 mt-1 rounded-xl text-white font-bold text-base tracking-wide transition-all duration-200
                        ${loading ? "bg-[#206A5D]/50 cursor-not-allowed" : "bg-[#206A5D] hover:bg-[#1F4068] hover:shadow-lg hover:shadow-[#206A5D]/20 active:scale-[0.98]"}`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {errors.api && (
                    <p className="text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-sm text-center">
                        {errors.api}
                    </p>
                )}
            </form>

            <img
                src="images/ship.png"
                className="absolute left-0 -bottom-[25px] boat w-[250px] hidden md:block"
            />
        </div>
    )
}
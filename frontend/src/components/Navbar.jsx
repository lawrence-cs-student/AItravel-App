
import { NavLink } from "react-router-dom"
import { FiCompass, FiLogOut } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";
import logoutService from "../service/Logout"
import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const activeLink = ({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200
        ${isActive
            ? "bg-[#206A5D] text-white shadow-md shadow-[#206A5D]/30"
            : "text-[#206A5D] hover:bg-[#206A5D]/10"}`

    const linkName = "font-semibold text-sm sm:text-base tracking-wide";

    const navigate = useNavigate();
    const handleLogout = () => {
        logoutService();
        navigate('/');
    }

    return (
        <nav className="w-fit mx-auto bg-white/80 backdrop-blur-md border border-[#206A5D]/10
                flex items-center gap-1 rounded-full shadow-lg shadow-black/10 px-2 py-2"
        >
            <NavLink to="/dashboard/discover" className={activeLink}>
                <FiCompass className="text-lg sm:text-xl" />
                <span className={linkName}>Discover</span>
            </NavLink>
            <NavLink to="/dashboard/savedAttractions" className={activeLink}>
                <FaBookmark className="text-lg sm:text-xl" />
                <span className={linkName}>Saved</span>
            </NavLink>
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-[#206A5D]
                           hover:bg-red-50 hover:text-red-500 transition-all duration-200"
            >
                <FiLogOut className="text-lg sm:text-xl" />
                <span className={linkName}>Logout</span>
            </button>
        </nav>
    )
}
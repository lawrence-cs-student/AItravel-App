
import { useState } from "react";
import { NavLink } from "react-router-dom"
import { FiCompass, FiLogOut, FiZap, FiMenu, FiX, FiMonitor } from "react-icons/fi";
import { FaBookmark, FaThLarge } from "react-icons/fa";
import logoutService from "../service/Logout"
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const activeLink = ({ isActive }) =>
        `flex items-center gap-3 md:gap-2 px-6 md:px-4 py-3 md:py-2 rounded-full transition-all duration-200 w-full md:w-auto
        ${isActive
            ? "bg-[#206A5D] text-white shadow-md shadow-[#206A5D]/30"
            : "text-[#206A5D] hover:bg-[#206A5D]/10"}`

    const linkName = "font-semibold text-base md:text-sm tracking-wide";

    const handleLogout = () => {
        logoutService();
        navigate('/');
    }

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="md:hidden fixed top-4 right-4 z-[100]">
                <button
                    onClick={toggleMenu}
                    className="p-3 bg-white/90 backdrop-blur-md border border-[#206A5D]/20 rounded-full text-[#206A5D] shadow-lg"
                >
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* Backdrop for mobile menu */}
            {isOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[80]"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <nav className={`
                ${isOpen 
                    ? "fixed top-20 left-1/2 -translate-x-1/2 w-[90%] flex flex-col p-4 opacity-100 scale-100" 
                    : "hidden md:flex md:w-fit md:mx-auto md:flex-row md:px-2 md:py-2 opacity-0 md:opacity-100 scale-95 md:scale-100"
                }
                bg-white/90 md:bg-white/80 backdrop-blur-md border border-[#206A5D]/10
                items-center gap-1 rounded-3xl md:rounded-full shadow-xl md:shadow-lg
                transition-all duration-300 ease-in-out z-[90]
            `}>
                <NavLink to="/dashboard/discover" className={activeLink} onClick={() => setIsOpen(false)}>
                    <FiCompass className="text-xl md:text-lg" />
                    <span className={linkName}>Discover</span>
                </NavLink>
                <NavLink to="/dashboard/categories" className={activeLink} onClick={() => setIsOpen(false)}>
                    <FaThLarge className="text-xl md:text-lg" />
                    <span className={linkName}>View Categories</span>
                </NavLink>
                <NavLink to="/dashboard/suggested" className={activeLink} onClick={() => setIsOpen(false)}>
                    <FiZap className="text-xl md:text-lg" />
                    <span className={linkName}>Suggested</span>
                </NavLink>
                <NavLink to="/dashboard/savedAttractions" className={activeLink} onClick={() => setIsOpen(false)}>
                    <FaBookmark className="text-xl md:text-lg" />
                    <span className={linkName}>Saved</span>
                </NavLink>
                <NavLink to="/dashboard/expenses" className={activeLink} onClick={() => setIsOpen(false)}>
                    <FiMonitor className="text-xl md:text-lg" />
                    <span className={linkName}>Expense Tracker</span>
                </NavLink>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 md:gap-2 px-6 md:px-4 py-3 md:py-2 rounded-full text-[#206A5D]
                               hover:bg-red-50 hover:text-red-500 transition-all duration-200 w-full md:w-auto mt-2 md:mt-0 text-left"
                >
                    <FiLogOut className="text-xl md:text-lg" />
                    <span className={linkName}>Logout</span>
                </button>
            </nav>
        </>
    )
}
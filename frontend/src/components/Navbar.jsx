
import { NavLink } from "react-router-dom"
import { FiCompass, FiLogOut } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";

export default function Navbar() {

    const activeLink = ({ isActive }) => 
        `group flex items-center justify-center gap-2 p-[10px] rounded-lg 
    ${isActive ? "bg-[#206A5D] text-white" : "text-[#206A5D]"}`

    const linkName = "font-bold text-[15px] sm:text-[18px] xl:text-[20px]";
    return (
        <nav className="self-end w-7/12max-w-lg bg-white mx-auto flex justify-between  
                rounded-2xl shadow-xl p-[10px] gap-[15px]"
        >
            <NavLink to="/dashboard/discover" className={activeLink}>
                <FiCompass className="sm:text-[25px]"/>
                <h1 className={linkName}>Discover</h1>
            </NavLink>
            <NavLink to="/dashboard/savedAttractions" className={activeLink}>
                <FaBookmark className="sm:text-[25px]"/>
                <h1 className={linkName}>Saved</h1>
            </NavLink>
            <NavLink to="/dashboard/logout" className={activeLink}>
                <FiLogOut className="sm:text-[25px]"/>
                <h1 className={linkName}>Logout</h1>
            </NavLink>

        </nav>
    )
}
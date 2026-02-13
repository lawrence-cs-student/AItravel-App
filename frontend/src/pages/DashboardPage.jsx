
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function DashboardPage() {

    
    return (
        <div className="w-full h-screen bg-[#EBECF1] py-[15px] flex flex-col">
            <Navbar />
            <Outlet />
        </div>
    )
}
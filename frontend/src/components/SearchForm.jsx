import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import attractionStore from "../store/attractionStore";
import useUserStore from "../store/userStore";
import { FiSearch } from "react-icons/fi";


const paragraph = `Explore destinations worldwide and discover
nearby attractions with AI-powered insights.`

export default function SearchForm() {

    const user = useUserStore((state) => state.userCredentials);
        
    const navigate = useNavigate();
    const [place, setPlace] = useState("")
    const resetAttractionList = attractionStore((state) => state.resetAttractionList);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        resetAttractionList();
          
        navigate(`/touristSpotPage/${place}`)
    }

    return (
        <section className="w-full flex justify-center bg-[#EBECF1] py-24">
            <div className="flex flex-col items-center w-full max-w-3xl px-6 text-center">

                <h1 className="text-[#206A5D] font-extrabold text-3xl sm:text-[45px] mb-4">
                    Discover Your Next Adventure
                </h1>

                <p className="text-[#206A5D]/70 text-lg sm:text-xl mb-[15px] max-w-2xl">
                    {paragraph}
                </p>

                <form
                    onSubmit={handleSubmit}
                    className=" w-full flex items-center gap-4 bg-white rounded-3xl p-2 sm:p-3
                        shadow-lg shadow-[#206A5D]/20 relative"
                >
                    <FiSearch 
                        className="absolute left-5 text-[#1B1C25] text-md sm:text-xl"
                    />
                    <input
                        className=" flex-1 outline-none text-[#1B1C25] text-md sm:text-lg bg-[#EBECF1]
                        placeholder:text-[#206A5D]/60 h-full rounded-2xl pl-[35px] py-[2px]
                        focus:outline-none focus:ring-2 focus:ring-[#206A5D]/40
                        sm:py-[5px]"
                        placeholder="Search a city/region/country"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="bg-[#206A5D] text-white px-5 py-2 rounded-full
                            font-semibold text-md sm:text-lg hover:bg-[#1F4068]
                            transition-all duration-300 sm:px-8 sm:py-3"
                    >
                        Explore
                    </button>
                </form>

                {!user && (
                    <Link
                        to="/login"
                        className="
                            mt-6 text-[#206A5D] font-semibold hover:underline hover:text-[#1F4068] 
                            transition-colors text-sm md:text-lg"
                        >
                        Login To Access More Features?
                    </Link>
                )}
        </div>
    </section>

    )
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import getCategoryIcon from "../utilities/getCategory";



export default function Card({spot}) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/map/${spot.id}`)
    }

    const Icon = getCategoryIcon(spot?.category);
    const [saved, setSaved] = useState(false);

    const handleSave = (e) => {
        e.stopPropagation();
        setSaved(prev => !prev);
    }

    return (
        <div
            onClick={handleClick}
            className="group relative w-full bg-white rounded-2xl flex flex-col cursor-pointer overflow-hidden
                       border border-[#206A5D]/10 hover:border-[#206A5D]/30
                       shadow-sm hover:shadow-xl hover:shadow-[#206A5D]/10
                       transition-all duration-300 hover:-translate-y-1"
        >
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#206A5D] to-[#206A5D]/30
                            scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

            <div className="p-5 flex flex-col gap-3">
                <div className="flex justify-between items-start gap-2">
                    <h1 className="text-[#1B1C25] text-lg sm:text-xl font-bold line-clamp-1 leading-tight">
                        {spot.name}
                    </h1>
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={handleSave}
                            className={`p-2 rounded-xl transition-all duration-300
                                ${ saved
                                    ? "bg-red-50 text-red-500"
                                    : "bg-[#206A5D]/10 text-[#206A5D]/40 hover:text-red-400 hover:bg-red-50"
                                }`}
                        >
                            <FaHeart size={16} className={`transition-transform duration-200 ${saved ? "scale-110" : "scale-100"}`} />
                        </button>
                        {Icon && (
                            <div className="bg-[#206A5D]/10 group-hover:bg-[#206A5D] rounded-xl p-2 transition-all duration-300">
                                <Icon size={18} className="text-[#206A5D] group-hover:text-white transition-colors duration-300" />
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-[#1B1C25]/55 text-sm sm:text-base line-clamp-2 leading-relaxed flex-1">
                    {spot.shortDescription}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-[#EBECF1]">
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#206A5D]" />
                        <span className="text-[#206A5D] text-xs sm:text-sm font-semibold">{spot.city}</span>
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium text-white bg-[#206A5D]/80
                                    group-hover:bg-[#206A5D] px-2.5 py-1 rounded-full transition-colors duration-300">
                        {spot.category}
                    </span>
                </div>
            </div>
        </div>
    )
}
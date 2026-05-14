import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import getCategoryIcon from "../utilities/getCategory";
import axios from "axios"
import useUserStore from "../store/userStore";


export default function Card({ spot, setMessage, savedAt = null, spotId, isSavedDestination = false }) {

    const { userToken } = useUserStore();
    const navigate = useNavigate();


    const destinationData = spot.destination || spot;
    const actualSpotId = spotId || spot._id || destinationData._id;


    const handleClick = () => {
        navigate(`/map/${actualSpotId}`)
    }

    const Icon = getCategoryIcon(destinationData?.category);


    const [saved, setSaved] = useState(() => {
        if (isSavedDestination) return true;
        if (savedAt) return true;
        return false;
    });

    const [isLoading, setIsLoading] = useState(false);

    // Save destination
    async function saveData() {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/destination/saveDestination`,
                destinationData,
                { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userToken}` } }
            );
            if (setMessage) setMessage(response.data.message);
            return response.data;
        } catch (error) {
            console.log("Failed to save", error);
            throw error;
        }
    }

    // Unsave destination
    async function unsaveData() {
        try {
            const response = await axios.delete(
                `http://localhost:3000/destination/unsaveDestination/${actualSpotId}`,
                { headers: { 'Authorization': `Bearer ${userToken}` } }
            );
            if (setMessage) setMessage(response.data.message);
            return response.data;
        } catch (error) {
            console.log("Failed to unsave", error);
            throw error;
        }
    }

    const handleSave = async (e) => {
        e.stopPropagation();

        if (isLoading) return;

        setIsLoading(true);

        try {
            if (saved) {
                await unsaveData();
                setSaved(false);
            } else {
                await saveData();
                setSaved(true);
            }
        } catch (error) {
            if (setMessage) {
                setMessage(error.response?.data?.message || "Failed to process request");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div
            onClick={handleClick}
            className="group relative w-full bg-white rounded-2xl flex flex-col cursor-pointer overflow-hidden
                       border border-[#206A5D]/10 hover:border-[#206A5D]/30
                       shadow-sm hover:shadow-xl hover:shadow-[#206A5D]/10
                       transition-all duration-300 hover:-translate-y-1"
        >

            <div className="h-1 w-full bg-gradient-to-r from-[#206A5D] to-[#206A5D]/30
                            scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

            <div className="p-5 flex flex-col gap-3">
                <div className="flex justify-between items-start gap-2">
                    <h1 className="text-[#1B1C25] text-lg sm:text-xl font-bold line-clamp-1 leading-tight">
                        {destinationData.name}
                    </h1>
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className={`p-2 rounded-xl transition-all duration-300
                                ${saved
                                    ? "bg-red-50 text-red-500 hover:bg-red-100"
                                    : "bg-[#206A5D]/10 text-[#206A5D]/40 hover:text-red-400 hover:bg-red-50"
                                }
                                ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                                `}
                        >
                            <FaHeart
                                size={16}
                                className={`transition-all duration-200 ${saved ? "scale-110" : "scale-100"}
                                    ${isLoading ? "animate-pulse" : ""}
                                `}
                            />
                        </button>
                        {Icon && (
                            <div className="bg-[#206A5D]/10 group-hover:bg-[#206A5D] rounded-xl p-2 transition-all duration-300">
                                <Icon size={18} className="text-[#206A5D] group-hover:text-white transition-colors duration-300" />
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-[#1B1C25]/55 text-sm sm:text-base line-clamp-2 leading-relaxed flex-1">
                    {destinationData.shortDescription}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-[#EBECF1]">
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#206A5D]" />
                        <span className="text-[#206A5D] text-xs sm:text-sm font-semibold">{destinationData.city}</span>
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium text-white bg-[#206A5D]/80
                                    group-hover:bg-[#206A5D] px-2.5 py-1 rounded-full transition-colors duration-300">
                        {destinationData.category}
                    </span>
                </div>
            </div>
        </div>
    )
}
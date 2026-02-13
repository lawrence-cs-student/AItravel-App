
import { useNavigate } from "react-router-dom";
import getCategoryIcon from "../utilities/getCategory";



export default function Card({spot}) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/map/${spot.id}`)
    }

    const Icon = getCategoryIcon(spot?.category);

    return (
        <div
            className="w-full rounded-lg 
                p-5 flex flex-col cursor-pointer max-h-[200px] bg-white"
            onClick={handleClick}
        >
            <div className="flex justify-between items-center mt-auto">
                <h1 className="text-[#1B1C25] text-lg sm:text-xl xl:text-2xl font-bold mb-3 line-clamp-1">
                    {spot.name}
                </h1>
                <div className="bg-[#206A5D] rounded-full p-1">
                    {Icon && <Icon size={22} color="#EBECF1" />}
                </div>
            </div>
            {/* Spot Name */}
            

            {/* Short Description */}
            <p className="text-[#1B1C25]/80 font-semibold mb-4 clamp-2 text-sm sm:text-lg xl:text-lg">
                {spot.shortDescription}
            </p>

            {/* Bottom row */}
            <div className="bg-[#EBECF1] rounded-full">
                <h2 className="text-[#206A5D] text-md sm:text-lg font-semibold 
                    p-2"
                >
                    {spot.city}
                </h2>
            </div>
        </div>
    )
}
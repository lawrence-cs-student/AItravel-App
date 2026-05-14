import { useParams, useNavigate } from "react-router-dom"
import { FiArrowLeft, FiClock, FiMapPin, FiDollarSign } from "react-icons/fi";
import { MdRestaurant } from "react-icons/md";
import MapViewer from "../components/MapViewer";
import attractionStore from "../store/attractionStore";
import getCategoryIcon from "../utilities/getCategory";

export default function TouristMapPage() {

    const { spotId } = useParams();
    const navigate = useNavigate();
    const touristSpots = attractionStore((state) => state.attractionList);
    const spot = touristSpots.find(s => s._id === spotId);

    if (!spot) return <p>Loading spot or spot not found...</p>;

    const destination = spot.destination;
    const foodOptions = destination.nearbyFoodOptions;
    const Icon = getCategoryIcon(destination?.category);

    const handleMakePlan = () => {
        navigate(`/ai-travel-planner`,
            { state: { destinationData: destination } }
        );
    }

    return (
        <div className="grid sm:grid-cols-[2fr_1fr] h-screen bg-[#EBECF1]">

            {/* Map */}
            <div className="relative">
                <MapViewer spot={destination} />
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 z-[999] flex items-center gap-2 bg-white/90 backdrop-blur-sm
                               text-[#1F4068] font-semibold text-sm px-4 py-2 rounded-full shadow-md
                               hover:bg-white transition-all duration-200"
                >
                    <FiArrowLeft size={16} /> Back
                </button>
            </div>

            {/* Sidebar */}
            <div className="w-full p-5 flex flex-col gap-4 overflow-y-auto">

                {/* Spot Header */}
                <div className="bg-[#1F4068] rounded-2xl p-5 flex flex-col gap-3 shadow-md">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <p className="text-[#EBECF1]/50 text-xs font-medium uppercase tracking-widest mb-1">Tourist Spot</p>
                            <h1 className="text-[#EBECF1] font-bold text-2xl sm:text-3xl leading-tight">
                                {destination.name}
                            </h1>
                        </div>
                        {Icon && (
                            <div className="shrink-0 bg-white/10 rounded-xl p-2">
                                <Icon size={22} className="text-[#EBECF1]" />
                            </div>
                        )}
                    </div>

                    <p className="text-[#EBECF1]/75 text-sm leading-relaxed">
                        {destination.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                        <span className="flex items-center gap-1.5 bg-white/10 text-[#EBECF1] text-xs font-medium px-3 py-1.5 rounded-full">
                            <FiMapPin size={12} /> {destination.city}
                        </span>
                        <span className="bg-white/10 text-[#EBECF1] text-xs font-medium px-3 py-1.5 rounded-full">
                            {destination.category}
                        </span>
                    </div>
                </div>

                {/* Visit Details */}
                <div className="bg-white rounded-2xl p-5 flex flex-col gap-3 shadow-sm border border-[#206A5D]/10">
                    <h3 className="text-[#1F4068] font-bold text-base">Visit Details</h3>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between py-2 border-b border-[#EBECF1]">
                            <span className="flex items-center gap-2 text-[#1B1C25]/60 text-sm">
                                <FiClock size={14} className="text-[#206A5D]" /> Duration
                            </span>
                            <span className="text-[#1B1C25] text-sm font-semibold text-right">{destination.suggestedVisitDuration}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-[#EBECF1]">
                            <span className="flex items-center gap-2 text-[#1B1C25]/60 text-sm">
                                <FiClock size={14} className="text-[#206A5D]" /> Hours
                            </span>
                            <span className="text-[#1B1C25] text-sm font-semibold text-right">{destination.openingHours}</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span className="flex items-center gap-2 text-[#1B1C25]/60 text-sm">
                                <FiDollarSign size={14} className="text-[#206A5D]" /> Price
                            </span>
                            <span className="text-[#1B1C25] text-sm font-semibold text-right">{destination.priceRange}</span>
                        </div>
                    </div>
                </div>

                {/* Nearby Food */}
                <div className="bg-white rounded-2xl p-5 flex flex-col gap-3 shadow-sm border border-[#206A5D]/10">
                    <h3 className="flex items-center gap-2 text-[#1F4068] font-bold text-base">
                        <MdRestaurant size={16} className="text-[#206A5D]" /> Nearby Food
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {Array.isArray(foodOptions) && foodOptions.map((option, index) => (
                            <span
                                key={index}
                                className="px-3 py-1.5 bg-[#206A5D]/10 text-[#206A5D] text-xs font-semibold rounded-full
                                           hover:bg-[#206A5D] hover:text-white transition-all duration-200 cursor-default"
                            >
                                {option}
                            </span>
                        ))}
                    </div>
                </div>
                {/* AI Travel Plan Maker */}
                <div className="bg-white rounded-2xl p-5 flex flex-col gap-3 shadow-sm border border-[#206A5D]/10">
                    <h3 className="text-[#1F4068] font-bold text-base">AI-Powered Travel Plan Maker</h3>
                    <p className="text-[#1B1C25]/60 text-sm">Get a personalized itinerary for your trip</p>
                    <button 
                        className="bg-[#206A5D] text-white px-4 py-2 rounded-full"
                        onClick={handleMakePlan}
                    >
                        Create a Plan
                    </button>
                </div>

            </div>
        </div>
    )
}
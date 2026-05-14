import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { 
  FaMapMarkerAlt, FaClock, FaUtensils, FaHotel, FaCamera, 
  FaCar, FaWalking, FaPlane, FaCalendarAlt, FaUsers, 
  FaDollarSign, FaStar, FaRegClock,
  FaTag, FaInfoCircle, FaExternalLinkAlt, FaCoffee
} from "react-icons/fa";
import getCategoryIcon from "../utilities/getCategory";

export default function TravelPlanPage() {
    const location = useLocation();
    const destination = location.state?.destinationData || null;
    const [travelPlan, setTravelPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTravelPlan = async () => {
            if (!destination) return;
            
            setLoading(true);
            setError(null);
            `${import.meta.env.VITE_API_URL}/travel-plan/generate`
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/travel-plan/generate`, {
                    destination: destination
                });
                setTravelPlan(response.data);
            } catch (err) {
                console.error("Failed to fetch travel plan:", err);
                setError("Failed to generate AI travel plan. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchTravelPlan();
    }, [destination]);

    const CategoryIcon = getCategoryIcon(destination?.category) || FaCamera;

    if (!destination) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#EBECF1]">
                <div className="text-center">
                    <p className="text-[#1F4068] text-lg">No destination data available</p>
                    <button 
                        onClick={() => window.history.back()}
                        className="mt-4 px-6 py-2 bg-[#206A5D] text-white rounded-lg hover:bg-[#1A564B] transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-[#EBECF1] gap-4">
                <div className="w-12 h-12 border-4 border-[#206A5D] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[#1F4068] font-bold text-xl animate-pulse">AI is crafting your perfect travel plan...</p>
                <p className="text-[#1F4068]/60 text-sm">This might take a few seconds</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-[#EBECF1] gap-4">
                <div className="bg-red-100 p-8 rounded-3xl border border-red-200 text-center shadow-xl">
                    <p className="text-red-600 font-bold text-xl mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-[#206A5D] text-white rounded-xl hover:bg-[#1A564B] transition-all"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row h-screen bg-[#EBECF1] overflow-y-auto md:overflow-hidden">
            {/* LEFT SIDE - Destination Details */}
            <div className="w-full md:w-1/2 md:overflow-y-auto bg-white shadow-lg">
                <div className="p-8">
                    {/* Header Image Placeholder with Category Icon */}
                    <div className="w-full h-64 bg-gradient-to-br from-[#206A5D] to-[#1F4068] rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative z-10 text-center">
                            <CategoryIcon size={64} className="text-white mx-auto mb-4 opacity-90" />
                            <p className="text-white text-sm opacity-75">{destination.category}</p>
                        </div>
                    </div>

                    {/* Destination Title */}
                    <h1 className="text-3xl font-bold text-[#1F4068] mb-2">
                        {destination.name}
                    </h1>
                    
                    {/* Location & Details Row */}
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 text-[#206A5D]">
                            <FaMapMarkerAlt size={16} />
                            <span className="text-sm font-medium">{destination.city}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#206A5D]">
                            <FaRegClock size={16} />
                            <span className="text-sm font-medium">{destination.suggestedVisitDuration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#206A5D]">
                            <FaTag size={16} />
                            <span className="text-sm font-medium">{destination.priceRange}</span>
                        </div>
                    </div>

                    {/* Category & Opening Hours Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#206A5D]/10 text-[#206A5D] rounded-full text-sm font-semibold">
                            <CategoryIcon size={14} />
                            <span>{destination.category}</span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1F4068]/10 text-[#1F4068] rounded-full text-sm font-semibold">
                            <FaClock size={14} />
                            <span>{destination.openingHours || "Hours vary"}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-[#1F4068] mb-3 flex items-center gap-2">
                            <FaInfoCircle className="text-[#206A5D]" />
                            About
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            {destination.shortDescription || `A beautiful ${destination.category?.toLowerCase() || 'spot'} located in ${destination.city}. Perfect for visitors looking to explore and enjoy the local attractions.`}
                        </p>
                    </div>

                    {/* Key Information Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="bg-[#EBECF1] p-4 rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 mb-2">
                                <FaClock className="text-[#206A5D]" />
                                <span className="text-sm font-semibold text-[#1F4068]">Best Time to Visit</span>
                            </div>
                            <p className="text-sm text-gray-600">{travelPlan?.bestTimeToVisit || "Morning hours"}</p>
                        </div>
                        <div className="bg-[#EBECF1] p-4 rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 mb-2">
                                <FaCalendarAlt className="text-[#206A5D]" />
                                <span className="text-sm font-semibold text-[#1F4068]">Duration</span>
                            </div>
                            <p className="text-sm text-gray-600">{travelPlan?.duration || "Flexible"}</p>
                        </div>
                        <div className="bg-[#EBECF1] p-4 rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 mb-2">
                                <FaDollarSign className="text-[#206A5D]" />
                                <span className="text-sm font-semibold text-[#1F4068]">Price Range</span>
                            </div>
                            <p className="text-sm text-gray-600">{destination.priceRange || "Contact for pricing"}</p>
                        </div>
                        <div className="bg-[#EBECF1] p-4 rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 mb-2">
                                <FaUsers className="text-[#206A5D]" />
                                <span className="text-sm font-semibold text-[#1F4068]">Best For</span>
                            </div>
                            <p className="text-sm text-gray-600">All ages, Families, Solo travelers</p>
                        </div>
                    </div>

                    {/* Highlights / Suggested Activities */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-[#1F4068] mb-3 flex items-center gap-2">
                            <FaStar className="text-[#206A5D]" />
                            Highlights & Activities
                        </h2>
                        <ul className="space-y-2">
                            {travelPlan?.activities?.map((activity, index) => (
                                <li key={index} className="flex items-start gap-2 text-gray-600">
                                    <div className="w-1.5 h-1.5 bg-[#206A5D] rounded-full mt-2"></div>
                                    <span>{activity}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Location Coordinates */}
                    {(destination.latitude && destination.longitude) && (
                        <div className="bg-gradient-to-r from-[#206A5D]/5 to-[#1F4068]/5 p-4 rounded-lg">
                            <h3 className="text-sm font-semibold text-[#1F4068] mb-2">Location</h3>
                            <p className="text-xs text-gray-500">
                                📍 Coordinates: {destination.latitude}, {destination.longitude}
                            </p>
                            {/* <button className="mt-2 text-xs text-[#206A5D] hover:underline flex items-center gap-1">
                                <FaExternalLinkAlt size={10} />
                                View on Google Maps
                            </button> */}
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT SIDE - Travel Plan */}
            <div className="w-full md:w-1/2 md:overflow-y-auto bg-[#EBECF1]">
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-[#1F4068] mb-6 flex items-center gap-2">
                        <FaPlane className="text-[#206A5D]" />
                        Your Travel Plan
                    </h2>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                        <div className="bg-white p-3 rounded-lg text-center">
                            <FaRegClock className="text-[#206A5D] mx-auto mb-1" />
                            <p className="text-xs text-gray-500">Est. Time</p>
                            <p className="text-sm font-semibold text-[#1F4068]">{travelPlan?.estimatedTime}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg text-center">
                            <FaDollarSign className="text-[#206A5D] mx-auto mb-1" />
                            <p className="text-xs text-gray-500">Entry Fee</p>
                            <p className="text-sm font-semibold text-[#1F4068]">{destination.priceRange === "Free" ? "Free" : "Paid"}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg text-center">
                            <FaWalking className="text-[#206A5D] mx-auto mb-1" />
                            <p className="text-xs text-gray-500">Activity Level</p>
                            <p className="text-sm font-semibold text-[#1F4068]">Light to Moderate</p>
                        </div>
                    </div>

                    {/* Detailed Itinerary */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-[#1F4068] mb-4 flex items-center gap-2">
                            <FaClock className="text-[#206A5D]" />
                            Suggested Itinerary
                        </h3>
                        <div className="space-y-4">
                            {travelPlan?.dailyItinerary?.map((item, idx) => (
                                <div key={idx} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-[#206A5D] text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm flex-shrink-0">
                                            {item.time.split(' ')[0]}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-[#1F4068] mb-1">{item.activity}</h4>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Food Recommendations */}
                    {travelPlan?.nearbyFood && travelPlan.nearbyFood.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-[#1F4068] mb-4 flex items-center gap-2">
                                <FaUtensils className="text-[#206A5D]" />
                                Nearby Food Options
                            </h3>
                            <div className="space-y-2">
                                {travelPlan.nearbyFood.map((food, idx) => (
                                    <div key={idx} className="bg-white p-3 rounded-lg flex items-center gap-3">
                                        <FaCoffee className="text-[#206A5D]" />
                                        <span className="text-gray-700">{food}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Travel Tips */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-[#1F4068] mb-4 flex items-center gap-2">
                            <FaInfoCircle className="text-[#206A5D]" />
                            Travel Tips
                        </h3>
                        <ul className="space-y-2">
                            {travelPlan?.tips?.map((tip, idx) => (
                                <li key={idx} className="bg-white p-3 rounded-lg flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#206A5D] rounded-full mt-2"></div>
                                    <span className="text-sm text-gray-600">{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Transportation */}
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="text-xl font-semibold text-[#1F4068] mb-4 flex items-center gap-2">
                            <FaCar className="text-[#206A5D]" />
                            Getting There & Around
                        </h3>
                        <ul className="space-y-2">
                            {travelPlan?.transportation?.map((transport, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-gray-600">
                                    {idx === 0 && <FaWalking className="text-[#206A5D]" />}
                                    {idx === 1 && <FaCar className="text-[#206A5D]" />}
                                    {idx === 2 && <FaCar className="text-[#206A5D]" />}
                                    <span>{transport}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
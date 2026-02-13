import { useParams } from "react-router-dom"
import { useEffect } from "react";
import MapViewer from "../components/MapViewer";
import attractionStore from "../store/attractionStore";

export default function TouristMapPage() {

    const { spotId } = useParams();
    const touristSpots = attractionStore((state) => state.attractionList);
    const spot = touristSpots.find(s => s.id === Number(spotId));
    const foodOptions = spot.nearbyFoodOptions;

    if (!spot) return <p>Loading spot or spot not found...</p>;

    return (
        <div className="grid sm:grid-cols-[2fr_1fr] h-screen">
            
            <MapViewer spot={spot} />

            <div className="w-full p-6 flex flex-col gap-6">

                
                <div className="w-full bg-[#1F4068] rounded-2xl p-6 shadow-lg flex flex-col gap-4">
                    
                    <div>
                    <h1 className="text-[#EBECF1] font-bold text-3xl">
                        {spot.name}
                    </h1>
                    <p className="text-[#EBECF1]/90 text-lg mt-1">
                        {spot.shortDescription}
                    </p>
                    </div>

                    
                    <div className="flex flex-wrap gap-4 text-[#EBECF1] text-md">
                    <span>
                        <strong>Category:</strong> {spot.category}
                    </span>
                    <span>
                        <strong>City:</strong> {spot.city}
                    </span>
                    </div>

                    
                    <div className="mt-4">
                    <h2 className="text-[#A5FFD6] font-semibold text-xl mb-3">
                        🍽 Nearby Food Options
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {Array.isArray(foodOptions) &&
                        foodOptions.map((option, index) => (
                            <span
                            key={index}
                            className="px-4 py-2 bg-[#2A4F7A] text-[#EBECF1] text-sm rounded-full hover:bg-[#3A6EA5] transition"
                            >
                            {option}
                            </span>
                        ))}
                    </div>
                    </div>
                </div>

                
                <div className="w-full bg-[#206A5D] rounded-2xl p-6 shadow-md flex flex-col gap-4">

                <h3 className="text-[#A5FFD6] font-semibold text-xl">
                    ℹ️ Visit Details
                </h3>

                <div className="flex flex-col gap-3 text-[#EBECF1]">
                    
                    <div className="flex justify-between gap-4">
                    <span className="text-[#CFFFE5] text-md">
                        Suggested Duration
                    </span>
                    <span className="font-medium text-right">
                        {spot.suggestedVisitDuration}
                    </span>
                    </div>

                    <div className="flex justify-between gap-4">
                    <span className="text-[#CFFFE5] text-md">
                        Opening Hours
                    </span>
                    <span className="font-medium text-right">
                        {spot.openingHours}
                    </span>
                    </div>

                    <div className="flex justify-between gap-4">
                    <span className="text-[#CFFFE5] text-md">
                        Price Range
                    </span>
                    <span className="font-medium text-right">
                        {spot.priceRange}
                    </span>
                    </div>

                </div>
                </div>


            </div>

            
        </div>
    )
}
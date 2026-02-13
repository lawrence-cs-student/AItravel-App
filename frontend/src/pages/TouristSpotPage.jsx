
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import GlassLoader from "../components/GlassLoader";
import attractionStore from "../store/attractionStore";

export default function TouristSpotPage() {
    
    const { place } = useParams();

    // For setting and storing of tourist spots
    const setAttractionList = attractionStore((state) => state.setAttractionList)
    const touristSpots = attractionStore((state) => state.attractionList)

    
    const [fetchError, setFetchError] = useState("");
    const [loading, setLoading] = useState(false);

    const getTouristSpots = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:3000/destination/generateAttractions", {
                params: { query: place }
            });
            
            const attractions = response.data.attractions;
            setAttractionList(attractions);
        } catch (err) {
            setFetchError (
                err.response?.data?.detail
                    ? err.response.data.detail :
                    "Network Error"
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!place) return;

        if (touristSpots.length === 0) {
            getTouristSpots();
        }
        

    }, [place]);

    

    return (
        <div className="w-full h-full bg-[#1B1C25]">
            <div className="h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                lg:grid-cols-4 gap-5 p-16 auto-rows-min">
                {loading ? (
                     <div className="col-span-full flex justify-center items-center min-h-[300px]">
                        <GlassLoader />
                    </div>
                ) : (
                    touristSpots?.map((spot, index) => (
                        <Card key={index} spot={spot} />
                    ))
                )}
            </div>
        </div>
    );

}
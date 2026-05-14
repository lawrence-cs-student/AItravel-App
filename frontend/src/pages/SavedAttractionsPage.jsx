import Card from "../components/Card";
import { useState, useEffect } from "react";
import axios from 'axios';
import useUserStore from "../store/userStore";
import GlassLoader from "../components/GlassLoader";
import attractionStore from "../store/attractionStore";

export default function SavedAttractionsPage() {

    const [savedAttractions, setSavedAttractions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)
    const { userToken } = useUserStore.getState();



    const fetchSavedAttractions = async () => {

        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/destination/getSaveDestinations", {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            })

            setSavedAttractions(response.data.spots);
            attractionStore.getState().setAttractionList(response.data.spots);
        } catch (error) {
            setError(error?.response?.data?.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchSavedAttractions();
    }, [])

    return (
        <div className="overflow-y-auto flex flex-col gap-5 p-16">
            <div>
                <h1 className="text-3xl font-bold mb-1">Saved Attractions</h1>
                <p className="text-gray-500">All the spots you've saved for later.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-min">
            {isLoading ? (
                <GlassLoader />
            ) : (error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                savedAttractions && savedAttractions.length > 0 ? (
                    savedAttractions.map((spot) => (
                         <Card key={spot._id} spot={spot.destination} savedAt={spot.savedAt} spotId={spot._id} setMessage={() => {}}/>
                    ))
                ) : (
                    <p className="text-black col-span-full">No Saved Attractions</p>
                )
            ))}
            </div>
        </div>

    )
}
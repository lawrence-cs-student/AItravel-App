
import Card from "../components/Card"
import Axios from "axios"
import { useState, useEffect } from "react"
import GlassLoader from "../components/GlassLoader";
import attractionStore from "../store/attractionStore";

const PER_PAGE = 12;

export default function SuggestionPage() {

    const [suggestedSpots, setSuggestedSpots] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    `${import.meta.env.VITE_API_URL}/destination/getSuggestedSpots`
    const fetchSuggestedSpots = async () => {
        setIsLoading(true)
        try {
            const response = await Axios.get(`${import.meta.env.VITE_API_URL}/destination/getSuggestedSpots`);
            setSuggestedSpots(response.data.spots);
            attractionStore.getState().setAttractionList(response.data.spots);

        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchSuggestedSpots();
    }, [])

    const totalPages = Math.ceil((suggestedSpots?.length || 0) / PER_PAGE);
    const paginated = (suggestedSpots || []).slice((page - 1) * PER_PAGE, page * PER_PAGE);

    return (
        <div className="overflow-y-auto flex flex-col gap-5 p-16">
            <div>
                <h1 className="text-3xl font-bold mb-1">Suggested Spots</h1>
                <p className="text-gray-500">Discover handpicked travel destinations we think you'll love.</p>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                    <GlassLoader />
                </div>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-min">
                        {paginated.map((spot) => (
                            <Card key={spot._id} spot={spot.destination} spotId={spot._id} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 pt-4">
                            <button
                                onClick={() => setPage(p => Math.max(p - 1, 1))}
                                disabled={page === 1}
                                className="px-4 py-2 rounded-full text-sm font-semibold text-[#206A5D] bg-white border border-[#206A5D]/20
                                           hover:bg-[#206A5D] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`w-9 h-9 rounded-full text-sm font-semibold transition-all duration-200
                                        ${page === p
                                            ? "bg-[#206A5D] text-white shadow-md"
                                            : "bg-white text-[#206A5D] border border-[#206A5D]/20 hover:bg-[#206A5D]/10"
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}

                            <button
                                onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                                disabled={page === totalPages}
                                className="px-4 py-2 rounded-full text-sm font-semibold text-[#206A5D] bg-white border border-[#206A5D]/20
                                           hover:bg-[#206A5D] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
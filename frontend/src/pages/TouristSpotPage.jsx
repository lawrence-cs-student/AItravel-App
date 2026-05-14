
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import GlassLoader from "../components/GlassLoader";
import attractionStore from "../store/attractionStore";

const PER_PAGE = 12;

export default function TouristSpotPage() {

    const { place } = useParams();

    const setAttractionList = attractionStore((state) => state.setAttractionList)
    const touristSpots = attractionStore((state) => state.attractionList)

    const [fetchError, setFetchError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [page, setPage] = useState(1);

    const getTouristSpots = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:3000/destination/getAttractions", {
                params: { query: place }
            });
            const attractions = response.data.spots;
            setAttractionList(attractions);
            console.log('atr', attractions)
        } catch (err) {
            setFetchError(
                err.response?.data?.message
                    ? err.response.data.message
                    : "Network Errors"
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

    const totalPages = Math.ceil((touristSpots?.length || 0) / PER_PAGE);
    const paginated = (touristSpots || []).slice((page - 1) * PER_PAGE, page * PER_PAGE);

    return (
        <div className="w-full h-full bg-[#EBECF1] flex flex-col">
            {!loading && touristSpots.length > 0 && (
                <div className="px-4 sm:px-8 md:px-12 lg:px-16 pt-8 pb-2">
                    <p className="text-[#206A5D]/60 text-xs sm:text-sm font-medium uppercase tracking-widest">Explore</p>
                    <h1 className="text-[#1B1C25] text-xl sm:text-2xl md:text-3xl font-extrabold">
                        Top places from <span className="text-[#206A5D]">{place}</span>
                    </h1>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                            gap-3 sm:gap-4 lg:gap-5
                            p-4 sm:p-8 md:p-12 lg:p-16 pt-4 sm:pt-6 auto-rows-min">
                {loading ? (
                    <div className="col-span-full flex justify-center items-center min-h-[300px]">
                        <GlassLoader />
                    </div>
                ) : paginated.length === 0 && !fetchError ? (
                    <div className="col-span-full flex flex-col items-center justify-center min-h-[300px] gap-3">
                        <div className="bg-[#206A5D]/10 rounded-full p-5">
                            <span className="text-4xl">🗺️</span>
                        </div>
                        <p className="text-[#1B1C25] font-bold text-lg">No spots found</p>
                        <p className="text-[#1B1C25]/50 text-sm text-center max-w-xs">
                            We couldn't find any tourist spots for <span className="text-[#206A5D] font-semibold">{place}</span>. Try searching a different destination.
                        </p>
                    </div>
                ) : (
                    paginated.map((spot) => (
                        <Card
                            key={spot._id}
                            spot={spot}
                            spotId={spot._id}
                            setMessage={setMessage}
                        />
                    ))
                )}
                {fetchError && (
                    <div className="col-span-full">
                        <p className="text-red-500 text-center text-sm">{fetchError}</p>
                    </div>
                )}
            </div>

            {!loading && totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 py-6">
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
        </div>
    );
}
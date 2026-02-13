import Card from "../components/Card"

export default function SavedAttractionsPage() {

    const sampleSpot = {
        id: "spot_001",
        name: "Mount Fuji",
        shortDescription: "Japan’s iconic mountain offering breathtaking views, hiking trails, and cultural significance.",
        city: "Fujinomiya",
        category: "Nature",
        latitude: "35.3606",
        longitude: "138.7274",
    };

    return (
        <div className="h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
            lg:grid-cols-4 gap-5 p-16 auto-rows-min"
        >
            <Card spot={sampleSpot}/>
            <Card spot={sampleSpot}/>
            <Card spot={sampleSpot}/>
            <Card spot={sampleSpot}/>
            <Card spot={sampleSpot}/>
        </div>

    )
}
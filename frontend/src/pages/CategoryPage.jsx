import getCategoryIcon from "../utilities/getCategory";

const categories = [
    { name: "Waterfall", description: "Natural cascading water formations, great for scenic views and nature photography." },
    { name: "Beach", description: "Sandy or rocky shorelines ideal for swimming, sunbathing, and water activities." },
    { name: "Island", description: "Landmasses surrounded by water offering unique ecosystems and secluded getaways." },
    { name: "Historical", description: "Sites and landmarks that hold significant historical and cultural importance." },
    { name: "Nature", description: "Natural environments including forests, rivers, and open landscapes for exploration." },
    { name: "Park", description: "Public green spaces designed for recreation, relaxation, and outdoor activities." },
    { name: "Viewpoint", description: "Elevated spots offering panoramic views of landscapes, cities, or natural scenery." },
    { name: "Mountain", description: "High-altitude terrain perfect for hiking, climbing, and breathtaking vistas." },
    { name: "Religious", description: "Sacred sites including temples, churches, mosques, and shrines of cultural significance." },
    { name: "Adventure", description: "Destinations offering thrilling activities like zip-lining, rappelling, and extreme sports." },
    { name: "Museum", description: "Institutions preserving and showcasing art, history, science, and cultural artifacts." },
    { name: "Lake", description: "Inland bodies of water ideal for boating, fishing, and peaceful retreats." },
    { name: "Cultural", description: "Places that celebrate local traditions, arts, festivals, and community heritage." },
    { name: "Resort", description: "Leisure destinations offering accommodation, amenities, and recreational facilities." },
    { name: "Heritage", description: "Preserved sites recognized for their outstanding historical or architectural value." },
    { name: "ThemePark", description: "Entertainment complexes featuring rides, shows, and themed attractions for all ages." },
    { name: "Promenade", description: "Scenic walkways along waterfronts, parks, or city centers for leisurely strolls." },
    { name: "Garden", description: "Curated outdoor spaces showcasing plants, flowers, and landscape design." },
    { name: "Wildlife", description: "Sanctuaries and reserves where native animals can be observed in natural habitats." },
    { name: "Farm", description: "Agricultural destinations offering agri-tourism, fresh produce, and rural experiences." },
];

export default function CategoryPage() {
    return (
        <div className="overflow-y-auto flex flex-col gap-6 p-16">
            <div>
                <p className="text-[#206A5D]/60 text-sm font-medium uppercase tracking-widest">Browse</p>
                <h1 className="text-[#1B1C25] text-2xl sm:text-3xl font-extrabold">Destination Categories</h1>
                <p className="text-[#1B1C25]/50 text-sm mt-1">Explore the types of destinations available and what each one offers.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map(({ name, description }) => {
                    const Icon = getCategoryIcon(name);
                    return (
                        <div
                            key={name}
                            className="group bg-white rounded-2xl p-5 flex flex-col gap-3
                                       border border-[#206A5D]/10 hover:border-[#206A5D]/30
                                       shadow-sm hover:shadow-md hover:shadow-[#206A5D]/10
                                       transition-all duration-200 hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-[#206A5D]/10 group-hover:bg-[#206A5D] rounded-xl p-2.5 transition-all duration-300">
                                    {Icon && <Icon size={20} className="text-[#206A5D] group-hover:text-white transition-colors duration-300" />}
                                </div>
                                <h2 className="text-[#1B1C25] font-bold text-base">{name}</h2>
                            </div>
                            <p className="text-[#1B1C25]/55 text-sm leading-relaxed">{description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

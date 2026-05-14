
import mongoose from "mongoose";


const destinationSchema = new mongoose.Schema({
    destination: {
        name: String,
        shortDescription: String,
        latitude: String,
        longitude: String,
        city: String,
        category: String,
        suggestedVisitDuration: String,
        openingHours: String,
        priceRange: String,
        nearbyFoodOptions: [String]
    },


}, {
    collection: 'destinations'
})


export default mongoose.model("destination", destinationSchema);
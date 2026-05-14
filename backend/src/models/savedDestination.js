
import mongoose from "mongoose";

const savedDestinationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

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

    savedAt: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: "savedDestinations"
});


export default mongoose.model("savedDestination", savedDestinationSchema);
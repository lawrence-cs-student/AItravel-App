
import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
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
});


export default mongoose.model("Destination", destinationSchema);
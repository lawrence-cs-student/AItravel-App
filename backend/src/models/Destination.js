
const mongoose = require("mongoose");

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

module.exports = mongoose.model("destination", destinationSchema);

import savedDestination from "../models/savedDestination.js"
import destination from "../models/destination.js"
import User from "../models/User.js"

import { ValidationError, NotFoundError, DuplicateError } from "../utils/error.js"


const getAttractions = async (query) => {
    try {
        if (!query) {
            throw new ValidationError("City or Category is required")
        }

        const destinations = await destination.find({
            $or: [
                { 'destination.category': { $regex: query, $options: "i" } },
                { 'destination.city': { $regex: query, $options: "i" } }  
            ]
        });

        return destinations;
    } catch (error) {
        throw new Error (`Failed to get attractions: ${error.message}`)
    }
}


// Saving Destinations
const saveDestination = async (userId, destinationData) => {

    if (!userId) {
        throw new ValidationError("User Id Required" );
    }

    if (!destinationData) {
        throw new ValidationError("Destination Data Required");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new NotFoundError("User not found");
    }

    const existingDestination = await savedDestination.findOne({
        userId: userId,
        "destination.latitude": destinationData.latitude,
        "destination.longitude": destinationData.longitude
    })

    if (existingDestination) {
        throw new DuplicateError("Destination already saved");
    }

    const newDestination = await savedDestination.create({
        userId: userId,
        destination: destinationData,
    }); 

    return newDestination;
}

const unsaveDestination = async (destinationId) => {
    if (!destinationId) {
        throw new ValidationError("Destination Id Required")
    }

    const deletedDestination = await savedDestination.findByIdAndDelete(destinationId);

    if (!deletedDestination) {
        throw new NotFoundError("Destination not found")
    }

    return deletedDestination;
}

const fetchAttractions = async (query) => {
    try {
        if (!query) {
        throw new NotFoundError("Query must not be empty")
    }

    const destination = await destination.find({
        $or: [
            {'destination.city' : query },
            {'destination.category' : query }
        ]
    })

    return destination;

    } catch (error) {
        throw new Error(`Failed to get attractions: ${error.message}`)
    }
}

// Fetching Saved Destinations Based on User
const fetchSavedDestinations = async (userId) => {
    try {
        if (!userId) {
            throw new ValidationError("User Id Required");
        }

        const user = await User.findById(userId);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        const destinations = await savedDestination.find({userId: userId});

        return destinations;
    } catch (error) {
        throw new Error("Fetching of saved destination failed: ", error.message)
    }
    
}

// Fetching Saved Destinations Based on User Category Filter
const fetchFilteredDestination = async (userId, filter) => {
    try {
        if (!userId) {
            throw new ValidationError("User Id Required");
        }

        const user = await User.findById(userId)

        if (!user) {
            throw new NotFoundError("User not found");
        }

        const destinations = await savedDestination.find({
            userId: userId,
            $or: [
                { 'destination.category': filter },
                { 'destination.city': filter }
            ]
        });

            return destinations
        } catch (error) {
            throw new Error("Fetching of filtered saved destination failed.", error.message)
        }
    }

const getSuggestedDestinations = async (limit = 24) => {
    try {
        const totalCount = await destination.countDocuments();
        console.log(`Total documents in collection: ${totalCount}`);
        
        if (totalCount === 0) {
            console.log('Collection is empty! Need to seed data.');
            return [];
        }

        const randomSpots = await destination.aggregate([
            { $sample: { size: limit } }
        ])
        return randomSpots;
    } catch (error) {
        throw new Error(`Failed to get random spots: ${error.message}`)
    }
}   


export default {
    getAttractions,
    saveDestination,
    unsaveDestination,
    fetchSavedDestinations,
    fetchFilteredDestination,
    getSuggestedDestinations
}



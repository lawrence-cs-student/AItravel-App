const getTouristSpots = require("../services/getTouristSpots");
const Destination = require("../models/destination");

const User = require("../models/User")


const generateAttractions = async (req, res) => {
    const {query} = req.query;
    console.log("request recieved: ", query)
    
    try {
        const touristSpots = await getTouristSpots(query);
        console.log(touristSpots)
        res.json({
            attractions: touristSpots
        });

    } catch(err) {
        res.status(500).json({error: err.message});
    }
}


const saveDestination = async (req, res) => {
    try {
        const destination = await Destination.create({
            userId: req.user.id,
            ...req.body
        })

        res.status(201).json(destination);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }

}

const getSaveDestinations = async (req, res) => {
    try {

        const savedDestinations = await Destination.find({ userId: req.user.id})

        res.status(200).json(savedDestinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { generateAttractions, saveDestination, getSaveDestinations };
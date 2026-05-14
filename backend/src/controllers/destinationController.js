
import DestinationService from "../services/destinationService.js";

const getAttractions = async (req, res) => {
    const { query } = req.query;
    console.log("request recieved: ", query)
    
    try {
        const touristSpots = await DestinationService.getAttractions(query);
        res.json({
            success: true,
            spots: touristSpots,
            message: "Tourist Spot Generated Successfully"
        });

    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

const saveDestination = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = req.body;

        const destination = await DestinationService.saveDestination(userId, data);

        res.status(201).json({
            success: true,
            message: "Destination saved successfully",
            spots: destination
        })

    } catch(error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        } 

        if (error.name === "NotFoundError") {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        }

        if (error.name === "DuplicateError") {
            return res.status(409).json({
                success: false,
                message: error.message
            })
        }

        console.error('Unexpected error in saveDestination:', error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}

const getSaveDestinations = async (req, res) => {
    try {

        const savedDestinations = await DestinationService.fetchSavedDestinations(req.user.id);
        
        res.status(200).json({
            success: true,
            count: savedDestinations.length,
            message: "Saved Destinations Retrieved Successfully",
            spots: savedDestinations
        });
         
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        } 

        if (error.name === "NotFoundError") {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const unsaveDestination = async (req, res) => {
    try {
        const spotId = req.params.id;
        const unsavedDestination = await DestinationService.unsaveDestination(spotId);

        res.status(200).json({
            success: true,
            message: "Spot Unsaved Successfully",
            spotName: unsavedDestination.destination.name
        });

    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(401).json({
                success: false,
                message: error.message
            })
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const getSuggestedDestination = async (req, res) => {
    try {
        const suggestedDestinations = await DestinationService.getSuggestedDestinations();
        res.status(200).json({
            success: true,
            count: suggestedDestinations.length,
            message: "Suggested Destinations Retrieved Successfully",
            spots: suggestedDestinations
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        } 

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export { getAttractions, saveDestination, getSaveDestinations, getSuggestedDestination, unsaveDestination};
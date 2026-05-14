import generateTravelPlan from "../services/travelPlanService.js";

const travelPlanController = async (req, res) => {
    const { destination } = req.body;

    if (!destination) {
        return res.status(400).json({ message: "Destination data is required" });
    }

    try {
        const plan = await generateTravelPlan(destination);
        res.status(200).json(plan);
    } catch (error) {
        console.error("Error in travelPlanController:", error);
        res.status(500).json({ message: "Failed to generate travel plan", error: error.message });
    }
}

export default travelPlanController;

const express = require("express");
const router = express.Router();

const { generateAttractions, saveDestination, getSaveDestinations } = require("../controllers/destinationController")
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/generateAttractions", generateAttractions);
router.post("/saveDestination", authMiddleware, saveDestination);
router.get("/getSaveDestinations", authMiddleware, getSaveDestinations);

module.exports = router;
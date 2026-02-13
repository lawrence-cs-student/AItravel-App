
const {GoogleGenerativeAI} = require("@google/generative-ai");

async function getTouristSpots(place) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);   
    const model = genAI.getGenerativeModel({model : "gemini-2.5-flash-lite"})

const prompt = `
    Give me only the top 5 tourist attractions in ${place}.

    RULES:
    - The "id" field MUST be a number (auto-increment starting from 1).
    - Return ONLY valid JSON.
    - Do NOT include explanations or extra text.
    - nearbyFoodOptions MUST be an array of at least 5 specific restaurant or eatery names near the attraction.
    - The "category" field MUST be ONE of the following values ONLY:
    ["Historical", "Nature", "Museum", "Religious", "Entertainment", "Beach", "Shopping", "Adventure", "Cultural"]

    - The "latitude" and "longitude" fields MUST be:
    ✔ Decimal numbers ONLY (example: 13.7349, -122.4194)
    ✔ No degree symbols (°)
    ✔ No compass directions (N, S, E, W)
    ✔ Use negative values for South and West
    ❌ Do NOT return strings like "13.7349° N" or "122.4194 W"
    ❌ Do NOT return text or units

    Return the response in the following JSON format:

    [
    {
        "id": 1,
        "name": "",
        "shortDescription": "",
        "latitude": 0,
        "longitude": 0,
        "city": "",
        "category": "",
        "suggestedVisitDuration": "",
        "openingHours": "",
        "priceRange": "",
        "nearbyFoodOptions": [
        "",
        "",
        "",
        "",
        ""
        ]
    }
    ]
`;



    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanText = text.replace(/```json|```/g, "").trim();


    try {
        const touristSpots = JSON.parse(cleanText);
        return touristSpots;
    } catch(error) {
        console.error("Failed to parse JSON from Gemini", error);
        return [];
    }
}

module.exports = getTouristSpots;
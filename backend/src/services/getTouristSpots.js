import axios from 'axios';

async function getTouristSpots(place) {
    if (!process.env.GROQ_API_KEY) {
        console.error("GROQ_API_KEY is not set in .env file!");
        return [];
    }

    try {
        console.log(`Fetching tourist spots for: ${place} `);
        
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama-3.3-70b-versatile',
                   
                messages: [
                    {
                        role: 'user',
                        content: `
                            Give me only the top 12 tourist attractions in ${place}.

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

                            Return the response in the following JSON format:

                            [
                            {
                                "id": 1,
                                "name": "",
                                "shortDescription": "",
                                "latitude": 0,
                                "longitude": 0,
                                "city": "${place}",
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
                        `
                    }
                ],
                max_tokens: 2000,
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log("✅ Free model response received!");
        
        
        const content = response.data.choices[0].message.content;
        const cleanText = content.replace(/```json|```/g, "").trim();
        const touristSpots = JSON.parse(cleanText);
        
        console.log(`✅ Successfully parsed ${touristSpots.length} tourist spots`);
        return touristSpots;
        
    } catch (error) {
        if (error.response) {
            console.error("❌ Groq API Error:");
            console.error("Status:", error.response.status);
            console.error("Data:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error("❌ Error:", error.message);
        }
        return [];
    }
}

export default getTouristSpots;
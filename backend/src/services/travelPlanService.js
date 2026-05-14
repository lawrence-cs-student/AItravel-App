import axios from 'axios';

async function generateTravelPlan(destination) {
    if (!process.env.GROQ_API_KEY) {
        console.error("GROQ_API_KEY is not set in .env file!");
        throw new Error("API Key missing");
    }

    try {
        console.log(`Generating AI travel plan for: ${destination.name}`);
        
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama-3.3-70b-versatile',
                messages: [
                    {
                        role: 'user',
                        content: `
                            Generate a highly detailed and engaging travel plan for the following destination:
                            Name: ${destination.name}
                            City: ${destination.city}
                            Category: ${destination.category}
                            Description: ${destination.shortDescription}
                            Suggested Visit Duration: ${destination.suggestedVisitDuration}
                            Price Range: ${destination.priceRange}

                            RULES:
                            - Return ONLY valid JSON.
                            - Do NOT include explanations, extra text, or markdown formatting outside the JSON.
                            - The "dailyItinerary" MUST be a detailed array of objects with "time", "activity", and "description".
                            - The "activities" MUST be an array of at least 5 specific things to do at this location.
                            - The "tips" MUST be an array of practical advice (e.g., clothes to wear, best photo spots, local customs).
                            - The "nearbyFood" MUST be an array of specific restaurant names or food types found nearby.
                            - The "transportation" MUST be an array of at least 3 ways to reach or move around the area.

                            Return the response in the following JSON format:

                            {
                                "duration": "e.g., Half Day Trip or 1 Day Trip",
                                "budget": "e.g., Free Entry or PHP 500-1000",
                                "bestTimeToVisit": "e.g., Early morning to catch the sunrise...",
                                "estimatedTime": "e.g., 2-3 hours",
                                "activities": [
                                    "Specific activity 1",
                                    "Specific activity 2",
                                    "..."
                                ],
                                "dailyItinerary": [
                                    {
                                        "time": "8:00 AM",
                                        "activity": "Detailed activity name",
                                        "description": "Engaging description of what to do"
                                    }
                                ],
                                "tips": [
                                    "Practical tip 1",
                                    "Practical tip 2",
                                    "..."
                                ],
                                "nearbyFood": [
                                    "Specific restaurant or dish 1",
                                    "..."
                                ],
                                "transportation": [
                                    "Mode of transport 1",
                                    "..."
                                ]
                            }
                        `
                    }
                ],
                max_tokens: 2500,
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const content = response.data.choices[0].message.content;
        const cleanText = content.replace(/```json|```/g, "").trim();
        const travelPlan = JSON.parse(cleanText);
        
        console.log(`✅ Successfully generated travel plan for ${destination.name}`);
        return travelPlan;
        
    } catch (error) {
        console.error("❌ Groq API Error generating travel plan:", error.message);
        throw error;
    }
}

export default generateTravelPlan;
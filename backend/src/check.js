const axios = require('axios');
require('dotenv').config();

async function findFreeModels() {
    try {
        console.log("🔍 Searching for completely FREE models on OpenRouter...\n");
        
        const response = await axios.get('https://openrouter.ai/api/v1/models', {
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
            }
        });
        
        const allModels = response.data.data;
        
        // Find models with zero cost for both input AND output
        const freeModels = allModels.filter(model => {
            const inputPrice = parseFloat(model.pricing.prompt);
            const outputPrice = parseFloat(model.pricing.completion);
            return inputPrice === 0 && outputPrice === 0;
        });
        
        console.log(`✅ Found ${freeModels.length} completely FREE models\n`);
        console.log("=" .repeat(60));
        
        if (freeModels.length === 0) {
            console.log("No completely free models found right now.");
            console.log("\nHere are the CHEAPEST models (almost free):");
            
            // Sort by price and show cheapest
            const cheapest = [...allModels]
                .sort((a, b) => parseFloat(a.pricing.prompt) - parseFloat(b.pricing.prompt))
                .slice(0, 10);
            
            cheapest.forEach(model => {
                const inputPrice = parseFloat(model.pricing.prompt);
                const outputPrice = parseFloat(model.pricing.completion);
                console.log(`\n📌 ${model.id}`);
                console.log(`   Input: $${inputPrice}/1K tokens`);
                console.log(`   Output: $${outputPrice}/1K tokens`);
                console.log(`   Context: ${model.context_length.toLocaleString()} tokens`);
            });
        } else {
            // Display all free models
            freeModels.forEach(model => {
                console.log(`\n✅ ${model.id}`);
                console.log(`   Context: ${model.context_length.toLocaleString()} tokens`);
                console.log(`   Description: ${model.description || 'No description'}`);
                console.log('---');
            });
        }
        
        // Also check for models with "free" in description or name
        console.log("\n🔎 Models with 'free' in description:");
        const freeInDesc = allModels.filter(model => 
            model.description?.toLowerCase().includes('free') || 
            model.id.toLowerCase().includes('free')
        );
        
        freeInDesc.forEach(model => {
            const inputPrice = parseFloat(model.pricing.prompt);
            const outputPrice = parseFloat(model.pricing.completion);
            console.log(`\n📌 ${model.id}`);
            console.log(`   Price: $${inputPrice}/in, $${outputPrice}/out`);
            console.log(`   ${model.description?.substring(0, 100)}...`);
        });
        
    } catch (error) {
        console.error("❌ Error fetching models:", error.message);
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        }
    }
}

findFreeModels();
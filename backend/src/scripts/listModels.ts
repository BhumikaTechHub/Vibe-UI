import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from '@google/generative-ai';

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("❌ No API Key found in .env");
        process.exit(1);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    try {
        console.log("🔍 Querying available Gemini models...");
        // Note: The Node SDK might not expose listModels directly on the main class in all versions, 
        // but let's try the common pattern or just infer from a simple generate test if listing fails.
        // Actually, for the specific @google/generative-ai package, we can't easily "list" models via a simple method in older versions,
        // but let's try the standard verify with a fallback list of candidates.
        
        // Since list_models isn't always exposed in the high-level SDK, we'll try to 'ping' a few known ones.
        const candidates = [
            "gemini-3-flash-preview",
            "gemini-2.5-flash",
            "gemini-2.0-flash-exp",
            "gemini-1.5-flash",
            "gemini-1.5-flash-001",
            "gemini-1.5-flash-002",
            "gemini-1.5-pro",
            "gemini-pro",
            "gemini-1.0-pro"
        ];

        console.log("\nTesting Model Availability:");
        for (const modelName of candidates) {
            process.stdout.write(`Testing ${modelName}... `);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                await model.generateContent("Test");
                console.log("✅ AVAILABLE");
            } catch (error: any) {
                if (error.message.includes("404")) {
                    console.log("❌ Not Found (404)");
                } else if (error.message.includes("429") || error.message.includes("503") || error.message.includes("500")) {
                    console.log("⚠️ Rate Limited (Exists!)");
                } else {
                    console.log(`❌ Error: ${error.message.split('\n')[0]}`);
                }
            }
        }

    } catch (error: any) {
        console.error("Fatal Error:", error);
    }
}

listModels();

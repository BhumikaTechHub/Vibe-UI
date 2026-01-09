import dotenv from 'dotenv';
import path from 'path';

// Load env from parenet backend folder
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { generateUI } from './services/gemini';

const testGemini = async () => {
    console.log("🧪 Testing Gemini Integration...");

    if (!process.env.GEMINI_API_KEY) {
        console.error("❌ No API Key found in env. Please set GEMINI_API_KEY in backend/.env");
        process.exit(1);
    }

    const mockInput = {
        manifest: {
            goal: "checkout",
            requiredElements: ["price", "pay_button"]
        },
        vibe: "urgent_dense",
        userState: "rushed"
    };

    try {
        console.log("📤 Sending prompt...");
        const result = await generateUI(mockInput);
        console.log("✅ Gemini Response Received:");
        console.log(JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("❌ Test Failed:", error);
    }
};

testGemini();

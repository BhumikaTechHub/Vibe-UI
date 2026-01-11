import dotenv from 'dotenv';
dotenv.config();
import { generateUI } from '../services/gemini';

async function verifyDay8And9() {
    console.log("🔍 Verifying Day 8 & 9: Gemini Service & Validation...");
    
    // Mock Input
    const input = {
        manifest: {
            goal: "checkout",
            requiredElements: ["shipping", "payment"],
            constraints: { maxSteps: 3 }
        },
        vibe: "urgent_dense",
        userState: "rushed"
    };

    try {
        console.log("🤖 Calling generateUI() service directly...");
        const result = await generateUI(input);

        if (result && result.uiSchema) {
            console.log("✅ Day 8 Success: Gemini returned data.");
            // Day 9 Check: If we got here, Zod validation passed (generateUI throws if invalid).
            console.log("✅ Day 9 Success: Output passed Zod Schema Validation.");
            console.log("📄 UI Type:", result.uiSchema.type);
        } else {
            console.error("❌ Failed: Result was empty or invalid.");
            process.exit(1);
        }
    } catch (error: any) {
        console.error("❌ Failed:", error.message);
        process.exit(1);
    }
}

verifyDay8And9();

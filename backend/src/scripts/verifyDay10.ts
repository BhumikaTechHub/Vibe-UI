import axios from 'axios';

async function verifyDay10() {
    console.log("🔍 Verifying Day 10: Gemini Integration...");
    const baseUrl = 'http://localhost:3001';

    const payload = {
        manifest: {
            goal: "checkout",
            requiredElements: ["shipping", "payment", "submit"],
            constraints: { maxSteps: 3 }
        },
        vibe: "urgent_dense",
        userState: "rushed"
    };

    try {
        console.log("📡 Sending request to /api/generate (this calls Gemini)...");
        const start = Date.now();
        const res = await axios.post(`${baseUrl}/api/generate`, payload);
        const duration = Date.now() - start;

        if (res.status === 200 && res.data.uiSchema) {
            console.log(`✅ Success! Gemini replied in ${duration}ms.`);
            console.log("📄 UI Schema Type:", res.data.uiSchema.type);
            console.log("📄 Explanation:", res.data.explanation);
            console.log("\n✨ Day 10 is COMPLETE.");
        } else {
            console.error("❌ Unexpected response structure:", res.data);
        }
    } catch (err: any) {
        console.error("❌ Request Failed:", err.message);
        if (err.response) {
            console.error("   Status:", err.response.status);
            console.error("   Data:", err.response.data);
        }
    }
}

verifyDay10();

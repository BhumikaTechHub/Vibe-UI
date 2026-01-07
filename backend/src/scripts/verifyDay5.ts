import axios from 'axios';

async function verifyDay5() {
    console.log("🔍 Verifying Day 5: Backend API Skeleton...");
    const baseUrl = 'http://localhost:3001';
    let errors = 0;

    // Test /api/analyze
    try {
        const analyzeRes = await axios.post(`${baseUrl}/api/analyze`, { signals: [] });
        if (analyzeRes.status === 200 && analyzeRes.data.userState) {
            console.log("✅ /api/analyze is reachable and returns valid structure.");
        } else {
            console.error("❌ /api/analyze returned unexpected response:", analyzeRes.data);
            errors++;
        }
    } catch (err: any) {
        console.error("❌ Failed to reach /api/analyze:", err.message);
        errors++;
    }

    // Test /api/generate
    try {
        const generateRes = await axios.post(`${baseUrl}/api/generate`, { manifestId: 'checkout', userState: 'calm' });
        if (generateRes.status === 200 && generateRes.data.uiSchema) {
            console.log("✅ /api/generate is reachable and returns valid structure.");
        } else {
            console.error("❌ /api/generate returned unexpected response:", generateRes.data);
            errors++;
        }
    } catch (err: any) {
        console.error("❌ Failed to reach /api/generate:", err.message);
        errors++;
    }

    if (errors === 0) {
        console.log("\n✨ SUCCESS: Backend API Skeleton is valid.");
        process.exit(0);
    } else {
        console.error(`\nFAILED: Found ${errors} errors.`);
        process.exit(1);
    }
}

verifyDay5();

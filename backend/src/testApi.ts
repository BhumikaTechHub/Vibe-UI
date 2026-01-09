import axios from 'axios';

const runTest = async () => {
    console.log("🧪 Testing /api/generate Endpoint...");

    const payload = {
        manifest: {
            goal: "checkout",
            requiredElements: ["price", "pay_button"]
        },
        vibe: "urgent_dense",
        userState: "rushed"
    };

    try {
        const response = await axios.post('http://localhost:3001/api/generate', payload);
        console.log("✅ Response Status:", response.status);
        console.log("📄 Response Data:", JSON.stringify(response.data, null, 2));
    } catch (error: any) {
        console.error("❌ Test Failed:");
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error(`Data: ${JSON.stringify(error.response.data)}`);
        } else {
            console.error(error.message);
        }
    }
};

runTest();

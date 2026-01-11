import axios from 'axios';

async function verifyDay15() {
    console.log("🔍 Verifying Day 15: Scalability (Dashboard Page)...");

    const payload = {
        manifest: { 
            goal: "dashboard_overview", 
            requiredElements: ["server_uptime", "error_rate_graph", "active_users_kpi"], 
            constraints: { density: "high", information_hierarchy: "strict" } 
        },
        vibe: "urgent_dense",
        userState: "rushed"
    };

    try {
        const response = await axios.post('http://localhost:3001/api/generate', payload);
        
        if (response.status === 200 && response.data.uiSchema) {
            console.log("✅ Dashboard Generation Successful");
            console.log("📄 UI Schema Type:", response.data.uiSchema.type);
            
            // Check if it respected the goal (heuristically)
            const jsonStr = JSON.stringify(response.data.uiSchema);
            if (jsonStr.includes("server_uptime") || jsonStr.toLowerCase().includes("uptime") || jsonStr.toLowerCase().includes("status")) {
                 console.log("✅ Content matches 'Dashboard' intent.");
            } else {
                 console.log("⚠️ Content might be generic, but valid JSON returned.");
            }
            
        } else {
            console.error("❌ Failed: Invalid response structure");
            process.exit(1);
        }

    } catch (error: any) {
        console.error("❌ Request failed:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
        }
        process.exit(1);
    }
}

verifyDay15();

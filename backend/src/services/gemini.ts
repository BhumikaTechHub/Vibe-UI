import { GoogleGenerativeAI } from '@google/generative-ai';
import { SYSTEM_PROMPT } from '../lib/systemPrompt';
import { GeminiResponseSchema } from '../lib/uiSchema';

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.warn("⚠️ GEMINI_API_KEY is missing via process.env! AI features will fail.");
}

const genAI = new GoogleGenerativeAI(apiKey || 'MISSING_KEY');
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp", // Or gemini-1.5-flash if preferred for speed
    generationConfig: {
        responseMimeType: "application/json"
    }
});

export interface GeminiInput {
    manifest: any;
    vibe: string;
    userState: string;
}



export const generateUI = async (input: GeminiInput) => {
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set.");
    }

    const prompt = `
    GENERATE UI FOR:
    - Manifest: ${JSON.stringify(input.manifest)}
    - Vibe: ${input.vibe}
    - User State: ${input.userState}
    
    Recall the laws: JSON only. Whitelisted components only.
    `;

    try {
        const result = await model.generateContent([SYSTEM_PROMPT, prompt]);
        const response = await result.response;
        const text = response.text();

        // 1. Clean the output (Gemini sometimes wraps JSON in markdown code blocks)
        const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();

        // 2. Parse JSON
        let json;
        try {
            json = JSON.parse(cleanText);
        } catch (e) {
            console.error("❌ Gemini returned invalid JSON:", cleanText);
            throw new Error("Gemini returned invalid JSON string.");
        }

        // 3. Validate against Schema
        const validation = GeminiResponseSchema.safeParse(json);

        if (!validation.success) {
            console.error("❌ Gemini Output Validation Failed:", JSON.stringify(validation.error.format(), null, 2));
            console.error("Received:", JSON.stringify(json, null, 2));
            throw new Error("Gemini output violated UI Schema constraints.");
        }

        console.log("✅ Gemini Output Validated Successfully");
        return validation.data;

    } catch (error) {
        console.error("Gemini Generation Exception:", error);
        throw error;
    }
};

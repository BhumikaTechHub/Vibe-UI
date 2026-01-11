import { FastifyRequest, FastifyReply } from 'fastify';
import { generateUI, GeminiInput } from '../services/gemini';
import { memoryCache } from '../lib/memoryCache';

export async function generateHandler(request: FastifyRequest, reply: FastifyReply) {
    console.log("🚀 Generate endpoint hit");

    const body = request.body as any;

    if (!body || !body.manifest || !body.vibe || !body.userState) {
        return reply.code(400).send({
            error: "Missing required fields: manifest, vibe, or userState"
        });
    }

    const input: GeminiInput = {
        manifest: body.manifest,
        vibe: body.vibe,
        userState: body.userState
    };

    const cacheKey = memoryCache.generateKey(input.manifest.goal, input.vibe, input.userState);
    const cachedResponse = memoryCache.get(cacheKey);

    if (cachedResponse) {
        console.log(`⚡ Serving from cache: ${cacheKey}`);
        return cachedResponse;
    }



    try {
        console.log(`🤖 Invoking Gemini for vibe: ${input.vibe}...`);
        const result = await generateUI(input);
        
        memoryCache.set(cacheKey, result);

        console.log("✅ Generation successful");
        return result;
    } catch (error) {
        console.error("❌ Generation failed:", error);
        return reply.code(500).send({
            error: "AI Generation Failed",
            details: (error as Error).message
        });
    }
}

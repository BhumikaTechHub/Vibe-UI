import { FastifyRequest, FastifyReply } from 'fastify';

import { selectVibe } from '../lib/vibeSelector';
import { UserState } from '../types/userState';

export async function analyzeHandler(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as any;
    console.log("Analyze endpoint hit. Signals:", body?.signals?.length || 0);

    // Mock User State Inference (In real app, we'd analyze signals)
    // For Day 13 demo, we simply trust the client's explicit state if provided, or default to calm
    const inferredState: UserState = body.userState || 'calm';
    const currentVibe = body.currentVibe;
    const manifestId = body.manifestId || 'checkout';

    const recommendedVibe = selectVibe(inferredState, manifestId, currentVibe);

    return {
        userState: inferredState,
        vibe: recommendedVibe,
        explanation: `Analyzed state: ${inferredState}. Recommendation: ${recommendedVibe}`
    };
}

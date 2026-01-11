import { GeminiResponse } from './uiSchema';

interface CacheEntry {
    data: GeminiResponse;
    timestamp: number;
}

// Simple in-memory cache
// key -> { data, timestamp }
const cache = new Map<string, CacheEntry>();

const TTL_MS = 1000 * 60 * 60; // 1 hour TTL for demo purposes

export const memoryCache = {
    get: (key: string): GeminiResponse | null => {
        const entry = cache.get(key);
        if (!entry) return null;

        if (Date.now() - entry.timestamp > TTL_MS) {
            cache.delete(key);
            return null;
        }

        console.log(`⚡ Cache HIT for [${key}]`);
        return entry.data;
    },

    set: (key: string, data: GeminiResponse) => {
        console.log(`💾 Cache STORE for [${key}]`);
        cache.set(key, {
            data,
            timestamp: Date.now()
        });
    },

    generateKey: (manifestGoal: string, vibe: string, userState: string) => {
        // Create a unique key based on the input parameters
        return `${manifestGoal}::${vibe}::${userState}`;
    },

    clear: () => {
        cache.clear();
        console.log('🧹 Cache cleared');
    }
};

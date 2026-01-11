import { VibeType } from './vibes';
import { UserState } from '../types/userState';

/**
 * Deterministically selects a Vibe based on the User's State and Page Context.
 * 
 * Rules:
 * - Rushed -> Urgent/Dense (Efficiency)
 * - Confused -> Calm/Guided (Clarity)
 * - Frustrated -> Error/Recovery (Empathy)
 * - Low Confidence -> Confidence Boost (Reassurance)
 * - Default -> Calm/Guided
 */
export function selectVibe(state: UserState, manifestId: string, currentVibe?: VibeType): VibeType {
    // 1. Vibe Freeze Logic (Day 13)
    // If we are in "checkout" and the user is just "confused" (not angry), stick to the current vibe.
    // This prevents jarring layout shifts.
    if (manifestId === 'checkout' && currentVibe === 'urgent_dense') {
        if (state === 'confused' || state === 'unknown') {
            console.log(`🧊 Vibe Freeze Active: Keeping ${currentVibe} despite ${state} state.`);
            return currentVibe;
        }
    }

    // 2. Safety Override
    // If user is frustrated, ALWAYS switch to recovery, no matter what.
    if (state === 'frustrated') {
        return 'error_recovery';
    }

    // 3. Map State to Vibe (Standard Logic)
    switch (state) {
        case 'rushed':
            return 'urgent_dense';

        case 'confused':
            return 'calm_guided';

        case 'low_confidence':
            return 'confidence_boost';

        case 'calm':
        case 'unknown':
        default:
            return 'calm_guided';
    }
}

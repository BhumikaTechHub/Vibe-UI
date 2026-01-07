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
export function selectVibe(state: UserState, manifestId: string): VibeType {
    // 1. Handle hard overrides based on manifest if needed (reserved for future)
    // For now, manifestId is unused but kept for interface stability.

    // 2. Map State to Vibe
    switch (state) {
        case 'rushed':
            return 'urgent_dense';

        case 'confused':
            return 'calm_guided';

        case 'frustrated':
            return 'error_recovery';

        case 'low_confidence':
            return 'confidence_boost';

        case 'calm':
        case 'unknown':
        default:
            return 'calm_guided';
    }
}

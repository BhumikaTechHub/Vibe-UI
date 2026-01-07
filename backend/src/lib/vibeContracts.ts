import { VibeType } from './vibes';

export interface VibeContract {
    id: VibeType;
    pricing: 'loose' | 'compact' | 'breathable';
    tone: 'reassuring' | 'direct' | 'concise' | 'encouraging';
    maxPrimaryActions: number;
    forbiddenElements: string[];
    animationSpeed: 'slow' | 'fast' | 'balanced'; // Added for extra thoroughness
}

export const vibeContracts: Record<VibeType, VibeContract> = {
    calm_guided: {
        id: 'calm_guided',
        pricing: 'loose',
        tone: 'reassuring',
        maxPrimaryActions: 1,
        forbiddenElements: ['countdown_timer', 'urgent_badges', 'popups'],
        animationSpeed: 'slow'
    },
    urgent_dense: {
        id: 'urgent_dense',
        pricing: 'compact',
        tone: 'direct',
        maxPrimaryActions: 2,
        forbiddenElements: ['decorative_images', 'long_descriptions'],
        animationSpeed: 'fast'
    },
    error_recovery: {
        id: 'error_recovery',
        pricing: 'breathable',
        tone: 'concise',
        maxPrimaryActions: 1,
        forbiddenElements: ['upsell_banners', 'navigation_links'],
        animationSpeed: 'balanced'
    },
    confidence_boost: {
        id: 'confidence_boost',
        pricing: 'breathable',
        tone: 'encouraging',
        maxPrimaryActions: 1,
        forbiddenElements: ['complexity', 'technical_jargon'],
        animationSpeed: 'balanced'
    }
};

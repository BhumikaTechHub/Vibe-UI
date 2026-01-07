import { selectVibe } from '../lib/vibeSelector';
import { UserState } from '../types/userState';
import { VibeType } from '../lib/vibes';

console.log("🔍 Verifying Day 4: Vibe Selection Logic...");

let errors = 0;

interface TestCase {
    state: UserState;
    expected: VibeType;
}

const testCases: TestCase[] = [
    { state: 'rushed', expected: 'urgent_dense' },
    { state: 'confused', expected: 'calm_guided' },
    { state: 'frustrated', expected: 'error_recovery' },
    { state: 'low_confidence', expected: 'confidence_boost' },
    { state: 'calm', expected: 'calm_guided' },
    { state: 'unknown', expected: 'calm_guided' }
];

testCases.forEach(({ state, expected }) => {
    const result = selectVibe(state, 'checkout'); // Any manifest ID work

    if (result !== expected) {
        console.error(`❌ Failed: State '${state}' -> Expected '${expected}', got '${result}'`);
        errors++;
    } else {
        console.log(`✅ Passed: State '${state}' -> '${result}'`);
    }
});

// Determinism Check
const determinismTest = selectVibe('rushed', 'checkout');
if (selectVibe('rushed', 'checkout') !== determinismTest) {
    console.error("❌ Failed: Determinism check (same input returned different output)");
    errors++;
} else {
    console.log("✅ Passed: Determinism check");
}

if (errors === 0) {
    console.log("\n✨ SUCCESS: Vibe Selection Logic is valid and deterministic.");
    process.exit(0);
} else {
    console.error(`\nFAILED: Found ${errors} errors.`);
    process.exit(1);
}

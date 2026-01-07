import { ALL_VIBES } from '../lib/vibes';
import { vibeContracts } from '../lib/vibeContracts';

console.log("🔍 Verifying Day 3: Vibes & Contracts...");

let errors = 0;

ALL_VIBES.forEach(vibe => {
    const contract = vibeContracts[vibe];

    if (!contract) {
        console.error(`❌ Missing contract for vibe: ${vibe}`);
        errors++;
        return;
    }

    if (contract.id !== vibe) {
        console.error(`❌ ID mismatch for vibe: ${vibe}`);
        errors++;
    }

    if (!contract.forbiddenElements || !Array.isArray(contract.forbiddenElements)) {
        console.error(`❌ Invalid forbiddenElements for vibe: ${vibe}`);
        errors++;
    }

    console.log(`✅ Verified contract: ${vibe} (${contract.tone}, ${contract.pricing})`);
});

if (errors === 0) {
    console.log("\n✨ SUCCESS: All Vibe Contracts are valid and strictly typed.");
    process.exit(0);
} else {
    console.error(`\nFAILED: Found ${errors} errors.`);
    process.exit(1);
}

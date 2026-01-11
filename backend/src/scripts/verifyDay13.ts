import { selectVibe } from '../lib/vibeSelector';

function verifyDay13() {
    console.log("🔍 Verifying Day 13: Vibe Freeze Logic...");
    let errors = 0;

    // Test 1: Standard Case (No Freeze)
    const t1 = selectVibe('confused', 'dashboard');
    if (t1 === 'calm_guided') console.log("✅ Standard: Confused -> Calm");
    else { console.error(`❌ Failed: Expected calm_guided, got ${t1}`); errors++; }

    // Test 2: Sticky Vibe (Freeze in Checkout)
    // User is in Urgent mode, gets Confused. Should STAY Urgent.
    const t2 = selectVibe('confused', 'checkout', 'urgent_dense');
    if (t2 === 'urgent_dense') console.log("✅ Freeze: Checkout + Urgent + Confused -> Urgent (FROZEN)");
    else { console.error(`❌ Failed: Expected urgent_dense (Frozen), got ${t2}`); errors++; }

    // Test 3: Safety Override
    // User is Frustrated. Should break freeze and go to Recovery.
    const t3 = selectVibe('frustrated', 'checkout', 'urgent_dense');
    if (t3 === 'error_recovery') console.log("✅ Override: Checkout + Frustrated -> Error Recovery");
    else { console.error(`❌ Failed: Expected error_recovery, got ${t3}`); errors++; }

    if (errors === 0) {
        console.log("\n✨ Day 13 COMPLETE: Vibe Freeze works.");
    } else {
        console.error(`\nFAILED: ${errors} errors found.`);
        process.exit(1);
    }
}

verifyDay13();

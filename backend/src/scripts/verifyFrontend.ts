import fs from 'fs';
import path from 'path';

function verifyDay6And7() {
    console.log("🔍 Verifying Day 6 & 7 (Frontend Integrity)...");

    const frontendPath = path.resolve(__dirname, '../../../frontend/src');
    const checks = [
        { name: 'DynamicRenderer', path: 'components/DynamicRenderer.tsx' },
        { name: 'useBehaviorTracking', path: 'hooks/useBehaviorTracking.ts' },
        { name: 'Signals Logic', path: 'utils/signalMath.ts' }
    ];

    let missing = 0;
    checks.forEach(check => {
        const fullPath = path.join(frontendPath, check.path);
        if (fs.existsSync(fullPath)) {
            console.log(`✅ Found ${check.name}`);
        } else {
            console.error(`❌ MISSING ${check.name} at ${check.path}`);
            missing++;
        }
    });

    if (missing === 0) {
        console.log("✨ Day 6 & 7 Verification Passed (Files verified).");
    } else {
        console.error("❌ Verification Failed: Missing files.");
        process.exit(1);
    }
}

verifyDay6And7();

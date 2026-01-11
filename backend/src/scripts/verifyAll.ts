import { exec } from 'child_process';
import util from 'util';
import path from 'path';

const execPromise = util.promisify(exec);

async function runScript(scriptName: string) {
    console.log(`\n---------------------------------------------------`);
    console.log(`🚀 Running ${scriptName}...`);
    console.log(`---------------------------------------------------`);
    try {
        const { stdout, stderr } = await execPromise(`npx ts-node src/scripts/${scriptName}`, {
            cwd: path.resolve(__dirname, '../../')
        });
        console.log(stdout);
        if (stderr) console.error(stderr);
        return true;
    } catch (error: any) {
        console.error(`❌ ${scriptName} FAILED`);
        console.error(error.stdout);
        console.error(error.stderr);
        return false;
    }
}

async function verifyAll() {
    console.log("Health Check: Starting Full System Verification (Day 0-10)");
    
    const results = {
        'Day 3 (Contracts) ': await runScript('verifyDay3.ts'),
        'Day 4 (Logic/Vibes)': await runScript('verifyDay4.ts'),
        'Day 5 (API Routes)': await runScript('verifyDay5.ts'),
        'Day 6/7 (Frontend)': await runScript('verifyFrontend.ts'),
        'Day 10 (Gemini AI)': await runScript('verifyDay10.ts'),
        'Day 11 (Caching)': await runScript('verifyDay11.ts'),
        'Day 13 (Vibe Freeze)': await runScript('verifyDay13.ts'),
        'Day 15 (Dashboard)': await runScript('verifyDay15.ts')
    };

    console.log(`\n===================================================`);
    console.log(`📊 FINAL REPORT`);
    console.log(`===================================================`);
    let allPassed = true;
    for (const [name, passed] of Object.entries(results)) {
        console.log(`${passed ? '✅' : '❌'} ${name}`);
        if (!passed) allPassed = false;
    }

    if (allPassed) {
        console.log("\n✨ ALL SYSTEMS OPERATIONAL. Ready for Day 11.");
    } else {
        console.log("\n⚠️ Some systems failed checks. Review logs above.");
    }
}

verifyAll();

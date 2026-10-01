import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const contract = resolve(import.meta.dirname, '..');
const android = resolve(process.env.OTT_ANDROID_DIR ?? '../ott-android');
const env = { ...process.env, OTT_CONTRACT_DIR: contract };
execFileSync(
  './gradlew',
  [
    ':core:network:test',
    ':core:data:testDebugUnitTest',
    '--init-script',
    resolve(contract, 'android-tests/include.init.gradle'),
    '--no-daemon',
  ],
  { cwd: android, env, stdio: 'inherit' },
);
process.stdout.write('Android serializer and shared B04 fixture checks passed.\n');

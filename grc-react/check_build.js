const { execSync } = require('child_process');
try {
  const output = execSync('npx vite build', { cwd: 'c:/Users/neeti/Desktop/GRC Tool/grc-react', encoding: 'utf-8' });
  console.log('BUILD SUCCESS:\n', output);
} catch (e) {
  console.log('BUILD FAILED:\n', e.stdout);
  console.log('STDERR:\n', e.stderr);
}

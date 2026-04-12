const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  for (const name of fs.readdirSync(dir)) {
    const filePath = path.join(dir, name);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (stat.isFile() && filePath.endsWith('route.ts')) {
      results.push(filePath);
    }
  }
  return results;
}

const base = path.join(process.cwd(), 'src', 'app', 'api');
const files = walk(base);
let changed = 0;
for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  if (!/\bfetch\(/.test(text)) continue;

  let updated = false;

  if (!text.includes('import { upstreamFetch } from "@/lib/upstream";')) {
    const importMatch = text.match(/^(import .*(?:\r?\n|\n))+?/);
    if (importMatch) {
      const imports = importMatch[0];
      const insertPos = imports.lastIndexOf('\n');
      text = text.slice(0, insertPos) + '\nimport { upstreamFetch } from "@/lib/upstream";' + text.slice(insertPos);
    } else {
      text = 'import { upstreamFetch } from "@/lib/upstream";\n' + text;
    }
    updated = true;
  }

  const replaced = text.replace(/\bfetch\(/g, 'upstreamFetch(');
  if (replaced !== text) {
    text = replaced;
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(file, text, 'utf8');
    changed++;
  }
}
console.log('Updated files:', changed);

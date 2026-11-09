import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
const css = fs.readFileSync(path.join(root,'styles.css'),'utf8');
const mockups = JSON.parse(fs.readFileSync(path.join(root,'data/mockups.json'),'utf8'));
const fail = (message) => { throw new Error(message); };

if (mockups.length !== 100) fail(`Expected 100 mockups; found ${mockups.length}`);
for (const [index,item] of mockups.entries()) {
  if (item.number !== index+1) fail(`Incorrect mockup number at ${index}`);
  if (!fs.existsSync(path.join(root,item.file))) fail(`Missing ${item.file}`);
  if (!html.includes(`./${item.file}`)) fail(`Not displayed: ${item.file}`);
}
for (const asset of html.matchAll(/(?:src|href)="\.\/([^"]+)"/g)) {
  if (!fs.existsSync(path.join(root,asset[1]))) fail(`Missing linked file: ${asset[1]}`);
}
for (const asset of css.matchAll(/url\('\.\/([^']+)'\)/g)) {
  if (!fs.existsSync(path.join(root,asset[1]))) fail(`Missing CSS asset: ${asset[1]}`);
}
if ((html.match(/class="chapter"/g)||[]).length !== 11) fail('Expected 11 chapters');
if ((html.match(/class="mock-card"/g)||[]).length !== 100) fail('Expected 100 image cards');
if (/data:(image|font)\//.test(html+css)) fail('Embedded assets remain in source');
console.log('OK: 11 chapters, 100 individual mockups, all local references exist.');

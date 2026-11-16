import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import './check.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root,'dist');
fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});
for (const name of ['index.html','styles.css','app.js','Burger-Zoghali-Gradient-Logo-Demo.html']) fs.copyFileSync(path.join(root,name),path.join(out,name));
fs.mkdirSync(path.join(out, 'scripts'), {recursive: true});
for (const name of ['new-logo-pages.js']) fs.copyFileSync(path.join(root, 'scripts', name), path.join(out, 'scripts', name));
for (const name of ['fonts','mockups','reference']) fs.cpSync(path.join(root,'assets',name),path.join(out,'assets',name),{recursive:true});
console.log(`Built static site: ${out}`);

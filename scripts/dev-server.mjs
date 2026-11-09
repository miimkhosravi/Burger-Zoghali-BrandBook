import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT || 5173);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.webp':'image/webp', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.ttf':'font/ttf' };
const watcher = `<script>let v=null;setInterval(async()=>{try{const n=await (await fetch('/__version',{cache:'no-store'})).text();if(v!==null&&v!==n)location.reload();v=n}catch{}},1000)</script>`;

function latest(dir) {
  let value = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes:true })) {
    if (entry.name === 'dist' || entry.name === 'node_modules' || entry.name === '.git') continue;
    const full = path.join(dir, entry.name);
    value = Math.max(value, entry.isDirectory() ? latest(full) : fs.statSync(full).mtimeMs);
  }
  return value;
}

http.createServer((req,res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  if (url.pathname === '/__version') {
    res.writeHead(200, { 'Content-Type':'text/plain', 'Cache-Control':'no-store' });
    res.end(String(latest(root))); return;
  }
  const requested = url.pathname === '/' ? '/index.html' : decodeURIComponent(url.pathname);
  const file = path.resolve(root, `.${requested}`);
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404); res.end('Not found'); return;
  }
  const type = types[path.extname(file).toLowerCase()] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type':type, 'Cache-Control':'no-store' });
  if (file.endsWith('index.html')) res.end(fs.readFileSync(file, 'utf8').replace('</body>', `${watcher}</body>`));
  else fs.createReadStream(file).pipe(res);
}).listen(port, '0.0.0.0', () => console.log(`Brandbook: http://localhost:${port}`));

// usage: node render.js <draw.js> <out.png> [scale]
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), http = require('http');
const root = path.join(__dirname, 'www');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.woff': 'font/woff' };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(req.url.split('?')[0]) === '/' ? 'index.html' : decodeURIComponent(req.url.split('?')[0]));
  fs.readFile(p, (err, data) => { if (err) { res.writeHead(404); res.end(); return; } res.writeHead(200, { 'Content-Type': types[path.extname(p)] || 'application/octet-stream' }); res.end(data); });
});
(async () => {
  await new Promise(r => server.listen(0, r));
  const port = server.address().port;
  const [code, out, scale] = [fs.readFileSync(process.argv[2], 'utf8'), process.argv[3], Number(process.argv[4] || 1)];
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 1100 } });
  const logs = [];
  page.on('console', m => logs.push(m.type() + ': ' + m.text()));
  page.on('pageerror', e => logs.push('pageerror: ' + e.message));
  await page.goto(`http://localhost:${port}/`);
  await page.waitForFunction(() => window.editor, null, { timeout: 30000 });
  const result = await page.evaluate(async ({ code, scale }) => {
    const fn = new Function('editor', 'createShapeId', 'toRichText', `return (async () => { ${code} })()`);
    let ret;
    try { ret = await fn(window.editor, window.createShapeId, window.toRichText); } catch (e) { return { error: String(e && e.stack || e) }; }
    const ids = [...window.editor.getCurrentPageShapeIds()];
    const img = await window.editor.toImage(ids, { format: 'png', background: true, scale, padding: 24 });
    const buf = new Uint8Array(await img.blob.arrayBuffer());
    let bin = ''; for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode.apply(null, buf.subarray(i, i + 0x8000));
    return { ret, n: ids.length, w: img.width, h: img.height, b64: btoa(bin) };
  }, { code, scale });
  if (result.error) { console.log('ERROR', result.error); }
  else { fs.writeFileSync(out, Buffer.from(result.b64, 'base64')); console.log('shapes', result.n, 'size', result.w, 'x', result.h, 'ret', JSON.stringify(result.ret)); }
  console.log(logs.filter(l => !l.includes('Download the React DevTools')).slice(0, 15).join('\n'));
  await browser.close(); server.close();
})();

/**
 * Renders public/og.jpg (1200x630): the moving ground from components/Fluid.tsx drawn once, the lock-up, the
 * headline. Run from the repo root with Playwright on NODE_PATH:
 *   NODE_PATH=~/Claude/code/wetrio-web-site/node_modules node tools/og.cjs
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const fluid = fs.readFileSync(path.join(root, "components/Fluid.tsx"), "utf8");
const VERT = fluid.match(/const VERT = `([\s\S]*?)`;/)[1];
const FRAG = fluid.match(/const FRAG = `([\s\S]*?)`;/)[1];
const wordmark = fs.readFileSync(path.join(root, "public/brand/wetrio-white.svg"), "utf8");
const devlab = fs.readFileSync(path.join(root, "public/brand/devlab-blue.svg"), "utf8");

const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>
  body{margin:0;width:1200px;height:630px;background:#050609;font-family:Inter,system-ui,sans-serif;position:relative;overflow:hidden;color:#f4f5f7}
  canvas{position:absolute;inset:0;width:1200px;height:630px}
  .scrim{position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,6,9,.94) 0%,rgba(5,6,9,.8) 42%,rgba(5,6,9,.1) 78%,rgba(5,6,9,0) 100%)}
  .logo{position:absolute;left:72px;top:64px;display:inline-flex;flex-direction:column;align-items:flex-end;gap:5px}
  .logo svg:first-child{height:34px;width:auto}.logo svg:last-child{height:20px;width:auto}
  .text{position:absolute;left:72px;top:196px}
  h1{margin:0;font-size:56px;line-height:1.06;letter-spacing:-.03em;font-weight:500}
  h1 span{color:#3b82f6}
  p{margin:26px 0 0;font-size:25px;line-height:1.4;color:#a3a9b6;max-width:760px}
  .url{position:absolute;right:72px;bottom:56px;font-size:22px;color:rgba(255,255,255,.72)}
</style></head><body>
<canvas id="c" width="600" height="315"></canvas>
<div class="scrim"></div>
<div class="logo">${wordmark}${devlab}</div>
<div class="text"><h1>Architecture, design,<br>engineering and<br>launch <span>by one team.</span></h1><p>A design studio's dev lab: interfaces people want to use, code that holds in production.</p></div>
<div class="url">wetrio.dev</div>
<script>
const gl=document.getElementById('c').getContext('webgl',{preserveDrawingBuffer:true});
const sh=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))console.error(gl.getShaderInfoLog(o));return o};
const p=gl.createProgram();gl.attachShader(p,sh(gl.VERTEX_SHADER,${JSON.stringify(VERT)}));gl.attachShader(p,sh(gl.FRAGMENT_SHADER,${JSON.stringify(FRAG)}));gl.linkProgram(p);gl.useProgram(p);
const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
const l=gl.getAttribLocation(p,'p');gl.enableVertexAttribArray(l);gl.vertexAttribPointer(l,2,gl.FLOAT,false,0,0);
gl.viewport(0,0,600,315);gl.uniform2f(gl.getUniformLocation(p,'res'),600,315);gl.uniform1f(gl.getUniformLocation(p,'seed'),0.3);gl.uniform1f(gl.getUniformLocation(p,'dim'),1);gl.uniform1f(gl.getUniformLocation(p,'t'),52);
gl.drawArrays(gl.TRIANGLES,0,6);window.__drawn=true;
</script></body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => window.__drawn === true);
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(root, "public/og.jpg"), type: "jpeg", quality: 90 });
  await browser.close();
  console.log("public/og.jpg written");
})().catch((e) => { console.error(e); process.exit(1); });

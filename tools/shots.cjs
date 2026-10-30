/**
 * Refreshes the product screenshots in public/products (the Products section shows them as they are):
 *   site-home.jpg         wetr.io's home page, full height, 1440 wide
 *   analyzer-filled.jpg   wetr.io/analyzer with a deck attached and a brief typed (nothing is sent)
 *   analyzer-result.jpg   a result page, scrolled to the score (RESULT_URL: a result of our own deck)
 *   portal-overview.jpg   the client portal's overview in the light theme (PORTAL_URL: a demo-mode portal)
 *
 *   NODE_PATH=~/Claude/wetrio-web-site/node_modules RESULT_URL=https://wetr.io/analyzer/r/<id> \
 *   PORTAL_URL=http://localhost:3400 DECK="/path/to/our-deck.pdf" node tools/shots.cjs [site|analyzer|portal]
 */
const path = require("path");
const { chromium } = require("playwright");

const out = path.resolve(__dirname, "../public/products");
const only = process.argv[2];
const want = (k) => !only || only === k;

async function quiet(page) {
  // the cookie banner, the wetria bar and the wetria offer card: not part of the product's picture
  for (const t of ["Essential only", "Accept all"]) {
    const b = page.getByRole("button", { name: t });
    if (await b.count()) { await b.first().click().catch(() => {}); break; }
  }
  for (const sel of ['button[aria-label="Close"]', 'button[aria-label="Dismiss"]', 'button[aria-label*="lose" i]']) {
    const b = page.locator(sel);
    const n = await b.count();
    for (let i = 0; i < n; i++) await b.nth(i).click({ timeout: 1500 }).catch(() => {});
  }
  await page.evaluate(() => {
    for (const el of document.querySelectorAll('[class*="OfferPopup"], [data-offer], [aria-label*="wetria" i]')) {
      if (el instanceof HTMLElement && /New from WeTrio/.test(el.textContent || "")) el.remove();
    }
    for (const el of document.querySelectorAll("div, aside, section")) {
      if (el instanceof HTMLElement && /^New from WeTrio: wetria/.test((el.textContent || "").trim()) && el.getBoundingClientRect().width < 500) { el.remove(); break; }
    }
  });
  await page.waitForTimeout(400);
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();

  if (want("site")) {
    await page.goto("https://wetr.io/", { waitUntil: "networkidle", timeout: 120000 });
    await quiet(page);
    // every section reveals itself on scroll: walk the page slowly, then show whatever is still hidden
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 260)); }
      await new Promise((r) => setTimeout(r, 1500));
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1200);
    await page.evaluate(() => {
      for (const el of document.querySelectorAll("body *")) {
        const cs = getComputedStyle(el);
        if (cs.opacity === "0" || (el.style.opacity && Number(el.style.opacity) < 1)) { el.style.opacity = "1"; }
        if (el.style.transform && /translate|scale/.test(el.style.transform)) el.style.transform = "none";
      }
    });
    await page.waitForTimeout(600);
    await quiet(page);
    await page.screenshot({ path: `${out}/site-home.jpg`, type: "jpeg", quality: 86, fullPage: true });
    console.log("site-home.jpg", await page.evaluate(() => document.body.scrollHeight));
  }

  if (want("analyzer")) {
    await page.goto("https://wetr.io/analyzer", { waitUntil: "networkidle", timeout: 120000 });
    await quiet(page);
    if (process.env.DECK) {
      await page.setInputFiles("input[type=file]", process.env.DECK);
      await page.waitForTimeout(2500);
    }
    await page.fill("textarea", "A sales deck for a B2B design studio. We present it to marketing directors; it has to win a first call.");
    await page.waitForTimeout(600);
    await quiet(page);
    await page.screenshot({ path: `${out}/analyzer-filled.jpg`, type: "jpeg", quality: 86 });
    console.log("analyzer-filled.jpg");
    if (process.env.RESULT_URL) {
      await page.goto(process.env.RESULT_URL, { waitUntil: "networkidle", timeout: 120000 });
      // the result is fetched after the page: wait for the score
      await page.waitForFunction(() => /\/100/.test(document.body.innerText), null, { timeout: 60000 });
      await page.waitForTimeout(1500);
      await quiet(page);
      // the score sits a screen or two down the page: cut the full page around it
      const top = await page.evaluate(() => {
        // the big score: ScoreCard prints «/100» as a span of its own; the status line under the box says «81/100» in one piece
        const el = [...document.querySelectorAll("span")].filter((e) => (e.textContent || "").trim() === "/100").pop();
        // 420px above the score: the file card above it and «What's already working» beside it fit the frame
        return el ? Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY) - 420) : 0;
      });
      await page.screenshot({ path: `${out}/analyzer-result.jpg`, type: "jpeg", quality: 86, fullPage: true, clip: { x: 0, y: top, width: 1440, height: 900 } });
      console.log("analyzer-result.jpg", page.url());
    }
  }

  if (want("portal") && process.env.PORTAL_URL) {
    const base = process.env.PORTAL_URL.replace(/\/$/, "");
    await page.goto(`${base}/login`, { waitUntil: "networkidle", timeout: 120000 });
    await page.fill("input[type=email]", "mia@nordhaus.example");
    await page.locator("button[type=submit]").first().click();
    await page.waitForTimeout(1500);
    const code = page.locator('input[autocomplete="one-time-code"], input[inputmode="numeric"], input[name="code"]').first();
    await code.fill("12345678"); // a full code signs in by itself; the button is for a typed one
    await page.waitForURL((u) => !/\/login/.test(u.toString()), { timeout: 15000 }).catch(async () => {
      await page.locator("button[type=submit]").first().click({ timeout: 5000 }).catch(() => {});
      await page.waitForURL((u) => !/\/login/.test(u.toString()), { timeout: 15000 }).catch(() => {});
    });
    await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 120000 });
    await page.evaluate(() => { document.documentElement.classList.remove("dark"); try { localStorage.setItem("theme", "light"); } catch {} });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${out}/portal-overview.jpg`, type: "jpeg", quality: 86, clip: { x: 0, y: 0, width: 1440, height: 900 } });
    console.log("portal-overview.jpg", page.url());
  }

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });

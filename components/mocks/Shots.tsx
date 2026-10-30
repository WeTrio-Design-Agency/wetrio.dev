/* eslint-disable @next/next/no-img-element -- screenshots of our own products, shown as they are */

/**
 * Windows that show a product as it is, from a screenshot of the live thing (Kirill, 30.10: «в точности как они
 * сделаны»): wetr.io scrolling through its home page, the client portal's overview, the Analyzer with its result.
 * The pictures live in public/products and are refreshed with tools/shots.cjs.
 */

const FRAME = "relative overflow-hidden rounded-xl shadow-[0_40px_90px_rgba(0,0,0,0.65)] ring-1 ring-white/10";

/** wetr.io's home page, 1440 wide, scrolled top to bottom and back over half a minute. */
export function SiteWindow() {
  return (
    <div className={`${FRAME} h-[960px] w-[1440px] bg-white`} aria-hidden="true">
      <img src="/products/site-home.jpg" alt="" width={1440} height={8351} className="site-scroll block w-full" />
    </div>
  );
}

/** The client portal's overview, in the light theme. */
export function PortalWindow() {
  return (
    <div className={`${FRAME} h-[960px] w-[1440px] bg-[#f8fafc]`} aria-hidden="true">
      <img src="/products/portal-overview.jpg" alt="" width={1440} height={960} className="block w-full" />
    </div>
  );
}

/** Analyzer on wetr.io: the page with a deck attached, then the result, in turn. */
export function AnalyzerWindow() {
  return (
    <div className={`${FRAME} h-[900px] w-[1440px] bg-white`} aria-hidden="true">
      <img src="/products/analyzer-filled.jpg" alt="" width={1440} height={900} className="absolute inset-0 block w-full" />
      <img src="/products/analyzer-result.jpg" alt="" width={1440} height={900} className="analyzer-swap absolute inset-0 block w-full" />
    </div>
  );
}

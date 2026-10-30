/* eslint-disable @next/next/no-img-element */

/**
 * The platform's own glow behind its home screen, copied as it is (wetrio-ai `components/shared/HomeGlow.tsx` and the
 * wt-breathe keyframes of its globals.css; images from its public/brand): two 900px squares turned -135°, blue on
 * the left and pink over it on the right, breathing on 23s and 31s cycles (Kirill, 29.10: «фон экрана как на
 * платформе»). `wide` is the platform's lg placement, used inside the scaled desktop window.
 */
export function AppGlow({ wide }: { wide: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-70">
      <style>{`
        @keyframes wa-breathe-a {
          0%, 100% { transform: translate(-50%, -50%) rotate(-135deg) scale(1);     opacity: 0.56; }
          30%      { transform: translate(-46%, -47%) rotate(-135deg) scale(1.07);  opacity: 0.64; }
          62%      { transform: translate(-43%, -42%) rotate(-135deg) scale(1.12);  opacity: 0.6; }
          82%      { transform: translate(-46%, -45%) rotate(-135deg) scale(1.05);  opacity: 0.58; }
        }
        @keyframes wa-breathe-b {
          0%, 100% { transform: translate(-50%, -50%) rotate(-135deg) scale(1.04);  opacity: 0.6; }
          26%      { transform: translate(-47%, -46%) rotate(-135deg) scale(0.98);  opacity: 0.54; }
          58%      { transform: translate(-44%, -43%) rotate(-135deg) scale(0.93);  opacity: 0.62; }
          80%      { transform: translate(-47%, -47%) rotate(-135deg) scale(0.99);  opacity: 0.57; }
        }
        .wa-breathe-a { transform: translate(-50%, -50%) rotate(-135deg) scale(1); opacity: 0.56; animation: wa-breathe-a 23s cubic-bezier(0.45, 0, 0.55, 1) infinite; will-change: transform, opacity; }
        .wa-breathe-b { transform: translate(-50%, -50%) rotate(-135deg) scale(1.04); opacity: 0.6; animation: wa-breathe-b 31s cubic-bezier(0.45, 0, 0.55, 1) infinite; will-change: transform, opacity; }
        @media (prefers-reduced-motion: reduce) { .wa-breathe-a, .wa-breathe-b { animation: none; } }
      `}</style>
      <img
        src="/wetria/brand/platform/glow-a.webp"
        alt=""
        width={900}
        height={900}
        className={wide ? "wa-breathe-a absolute top-[-40px] left-[41.07%] aspect-square h-auto w-[81%] max-w-none" : "wa-breathe-a absolute top-[-40px] left-[46%] aspect-square h-auto w-[204%] max-w-none"}
      />
      <img
        src="/wetria/brand/platform/glow-b.webp"
        alt=""
        width={900}
        height={900}
        className={wide ? "wa-breathe-b absolute top-[-80px] left-[61.19%] aspect-square h-auto w-[70%] max-w-none" : "wa-breathe-b absolute top-[-80px] left-[68%] aspect-square h-auto w-[176%] max-w-none"}
      />
    </div>
  )
}

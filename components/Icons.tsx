type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function Spark({ className = "h-3 w-3" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10 5.4-.6 9.4-4.6 10-10Z" />
    </svg>
  );
}

export function Check({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

export function Plus({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Minus({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function ArrowUpRight({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/* Glyphs for the stack grid and the diagram. Named by what they stand for. */
const GLYPHS: Record<string, React.ReactNode> = {
  code: <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-10-2 12" />,
  atom: (
    <>
      <circle cx="12" cy="12" r="1.5" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
    </>
  ),
  type: <path d="M5 6V4h14v2M12 4v16m-3 0h6" />,
  wind: <path d="M4 8h9a2.5 2.5 0 1 0-2.5-2.5M4 12h13a3 3 0 1 1-3 3M4 16h7a2 2 0 1 1-2 2" />,
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="8" ry="3" />
      <path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  card: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18M7 15h3" />
    </>
  ),
  cloud: <path d="M7 18a4 4 0 0 1-.6-8A6 6 0 0 1 18 9.5 4 4 0 0 1 17.5 18H7Z" />,
  rocket: <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 15l-3-3 2.5-2.5c3-3 6.5-4.5 10.5-4.5 0 4-1.5 7.5-4.5 10.5L12 18l-3-3Zm5-4a1 1 0 1 0 0-.1" />,
  box: <path d="M12 3 3 7.5v9L12 21l9-4.5v-9L12 3Zm0 9L3 7.5M12 12l9-4.5M12 12v9" />,
  sparkles: <path d="M12 3c.5 4 3 6.5 7 7-4 .5-6.5 3-7 7-.5-4-3-6.5-7-7 4-.5 6.5-3 7-7ZM5 17c.2 1.2 1 2 2.2 2.2C6 19.4 5.2 20.2 5 21.4c-.2-1.2-1-2-2.2-2.2C4 19 4.8 18.2 5 17Z" />,
  flask: <path d="M9 3h6M10 3v6l-5.5 9.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 9V3M7.5 15h9" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  bot: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M12 4v4M9 13h.01M15 13h.01M9 17h6" />
    </>
  ),
  chat: <path d="M4 5h16v11H9l-5 4V5Z" />,
  wrench: <path d="M14.5 6.5a4 4 0 0 0 5 5L9 22l-3-3L16.5 8.5a4 4 0 0 0-2-2Zm0 0L19 2" />,
  server: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="1.5" />
      <rect x="3" y="13" width="18" height="7" rx="1.5" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </>
  ),
  layers: <path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 4 9 5 9-5" />,
};

export function Glyph({ name, className = "h-5 w-5" }: IconProps & { name: keyof typeof GLYPHS }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      {GLYPHS[name]}
    </svg>
  );
}

export type GlyphName = keyof typeof GLYPHS;

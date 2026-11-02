import { Fragment, type ReactNode } from "react";

/**
 * A heading in the admin's rich-heading format (lib/content.ts): plain text, <em>…</em> for the dimmed words, <br>
 * for a line break. Parsed into React nodes, never set as HTML: any other tag is dropped and its text kept. The
 * dimmed words are the same `h-dim` span the sections drew by hand, so the page's own headings render as before.
 */

const TAG = /<\/?[a-zA-Z][^>]*>/g;

const decode = (s: string) =>
  s.indexOf("&") === -1
    ? s
    : s
        .replace(/&nbsp;/g, "\u00a0")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#0*39;|&apos;/g, "'")
        .replace(/&amp;/g, "&");

export function Rich({ text, dim = "h-dim" }: { text: string; dim?: string }) {
  const out: ReactNode[] = [];
  let em: ReactNode[] | null = null;
  let last = 0;
  let key = 0;
  const push = (node: ReactNode) => (em ?? out).push(node);
  const close = () => {
    if (em) out.push(<span key={key++} className={dim}>{em}</span>);
    em = null;
  };

  for (const m of text.matchAll(TAG)) {
    if (m.index > last) push(decode(text.slice(last, m.index)));
    last = m.index + m[0].length;
    const tag = m[0].toLowerCase();
    if (/^<br\b/.test(tag)) push(<br key={key++} />);
    else if (/^<em\b/.test(tag)) em ??= [];
    else if (tag === "</em>") close();
  }
  if (last < text.length) push(decode(text.slice(last)));
  close();

  return <Fragment>{out}</Fragment>;
}

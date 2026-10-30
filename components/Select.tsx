"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";

export type Option = { id: string; label: string };

/**
 * A select built on the page, as the contact form on wetr.io has it (Kirill, 30.10: «дропдауны не нативные, а
 * собраны на странице»): a combobox button and a listbox under it. Arrows move the choice, Enter and Space open and
 * close, Escape closes, a click outside closes. When the list would run past the bottom of its clipping panel or the
 * screen, it opens upward instead.
 */
export function Select({
  id,
  value,
  onChange,
  options,
  placeholder,
  className = "",
  invalid,
}: {
  id: string;
  value: string;
  onChange: (id: string) => void;
  options: Option[];
  placeholder: string;
  className?: string;
  invalid?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [up, setUp] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const listId = useId();
  const chosen = options.find((o) => o.id === value);

  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", away);
    return () => document.removeEventListener("mousedown", away);
  }, [open]);

  // Which way to open: down unless the list would be cut by the panel that clips it (data-clip) or by the screen.
  useLayoutEffect(() => {
    if (!open || !box.current || !list.current) return;
    const b = box.current.getBoundingClientRect();
    const h = list.current.offsetHeight + 8;
    const clip = box.current.closest<HTMLElement>("[data-clip]")?.getBoundingClientRect();
    const floor = Math.min(window.innerHeight, clip?.bottom ?? Infinity);
    const ceiling = Math.max(0, clip?.top ?? 0);
    setUp(b.bottom + h > floor && b.top - h > ceiling);
  }, [open]);

  const move = (step: 1 | -1) => {
    const i = options.findIndex((o) => o.id === value);
    const next = i < 0 ? (step > 0 ? 0 : options.length - 1) : (i + step + options.length) % options.length;
    onChange(options[next].id);
  };

  return (
    <div ref={box} className="relative">
      <button
        id={id}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-invalid={invalid || undefined}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            return;
          }
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            if (!open) setOpen(true);
            else move(e.key === "ArrowDown" ? 1 : -1);
          }
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
        className={`${className} flex items-center justify-between text-left ${chosen ? "" : "text-white/40"}`}
      >
        <span className="truncate">{chosen ? chosen.label : placeholder}</span>
        <svg
          viewBox="0 0 24 24"
          className={`ml-3 h-4 w-4 shrink-0 text-white/60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          ref={list}
          id={listId}
          role="listbox"
          aria-labelledby={id}
          className={`absolute z-30 w-full overflow-hidden rounded-lg bg-card py-1 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)] ring-1 ring-white/15 ${
            up ? "bottom-[calc(100%+6px)]" : "top-[calc(100%+6px)]"
          }`}
        >
          {options.map((o) => {
            const on = o.id === value;
            return (
              <li
                key={o.id}
                role="option"
                aria-selected={on}
                onClick={() => {
                  onChange(o.id);
                  setOpen(false);
                }}
                className={`cursor-pointer px-4 py-2.5 text-sm transition-colors ${on ? "bg-accent/15 text-foreground" : "text-foreground hover:bg-white/5"}`}
              >
                {o.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

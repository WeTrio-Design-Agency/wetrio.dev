/* eslint-disable react-hooks/set-state-in-effect -- ported as it is from wetr.io, whose lint allows it */
"use client"

/* eslint-disable @next/next/no-img-element -- a film of the product: plain images, sized by their boxes */

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  ArrowUp,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Download,
  Expand,
  EyeOff,
  FileSearch,
  FileSpreadsheet,
  FileText,
  History,
  LayoutTemplate,
  Loader2,
  Mic,
  MoreHorizontal,
  Palette,
  Paperclip,
  SlidersHorizontal,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Wand2,
} from "lucide-react"
import { LUMEN, LUMEN_BRIEF, slide } from "@/lib/wetria/decks"
import { AppGlow } from "@/components/wetria/AppGlow"
import { cn } from "@/lib/wetria/utils"

/**
 * The app inside the fold's window, playing one task from the home screen to the finished deck (Kirill, 29.10:
 * «как у нас в интерфейсе»). Every piece is the platform's own markup, read from its code, not drawn by eye:
 * - home (`designer/DesignerChat.tsx`, `Composer.tsx`, `components/ui/FileChip.tsx`): the greeting, the glass plate
 *   with the ready requests over the box, the box with its file chips, text and the row of controls, and the five
 *   service cards under it, three and two, white with the chosen one held by a ring; the block centred on the glow;
 * - the task (`designer/FullJob.tsx`, `ResultChat.tsx`): the conversation in a 420px column with the task's header
 *   (back, title, download, versions, more), the request as the person's bubble, the run as the chat's own lines
 *   (done grey with a check, the one in hand with the spinner and the agent's notes), then the agent's answer with
 *   the thumbs and the box under it; the deck on the right: while it runs the status line with «N of 10 redrawn»
 *   and every slide in a grid, each turning from the original to its new version; once done the After / Side by
 *   side / Stacked switch, the numbered thumbnails on the left and the slide large, the report's tabs under it.
 * Colours are the platform's tokens as hex (text #0b1120 / #475569 / #5d6b7d, subtle #f1f5f9, borders #e2e8f0 /
 * #d0d5dc, ink #2563eb, success #0da86e). The slides are a real run (Lumen, job 37fdcd67dadc).
 *
 * One clock drives it all and runs only while on screen; with less motion asked for it shows the finished task.
 * Nothing in it is a control. Phones get the platform's phone layout: its top bar, the requests scrolling off the
 * edge, the service cards in two columns; in the task, the deck under the header.
 */

export type ScenePhase = "compose" | "running" | "done"

/* the moments of a loop, in ms */
const TYPE_AT = 900
const TYPE_MS = 26
const FILES_AT = TYPE_AT + LUMEN_BRIEF.length * TYPE_MS + 250
const CURSOR_IN = FILES_AT + 600
const AT_CARD = CURSOR_IN + 800
const PICK = AT_CARD + 140
const START_LABEL = PICK + 300
const TO_START = PICK + 600
const AT_START = TO_START + 750
const TASK = AT_START + 450
const READ_DONE = TASK + 2200
const SLIDE_MS = 650
const EDIT_DONE = READ_DONE + LUMEN.slides * SLIDE_MS
const CHECK_DONE = EDIT_DONE + 1400
// once done, a moment on the answer, then Side by side on its own: the chat folds away and the slides turn
const PAIR = CHECK_DONE + 1600
const PAIR_SLIDE_MS = 1900
const PAIR_SLIDES = 4
const FADE = PAIR + PAIR_SLIDES * PAIR_SLIDE_MS + 2200
const LOOP = FADE + 500
const STILL = CHECK_DONE + 2000

const STEPS = ["Starting", "Reading the deck", "Editing slides", "Final check"] as const
const NOTES = [
  "Reading the deck: 10 slides, 6 charts to build from the Excel.",
  "Slide 2: the six bracketed figures filled in from the sheets.",
  "Slide 3: revenue by month, built as a chart from sheet C1.",
  "Slide 7: the EBITDA bridge, built as a waterfall.",
]

/* the home screen's cards, in its order, with its own lines (DesignerChat, setup.ts) */
const CARDS = [
  { key: "format", title: "Format", line: "Keep the style, make it neat", icon: Wand2, mark: "bg-[#3b82f6]" },
  { key: "template", title: "Adapt to template", line: "Rebuild the deck on your template", icon: LayoutTemplate, mark: "bg-[url(/wetria/brand/platform/mark-adapt.webp)] bg-cover bg-center" },
  { key: "restyle", title: "Design", line: "Redesign the deck", icon: Palette, mark: "bg-[url(/wetria/brand/platform/mark-design.webp)] bg-cover bg-center", beta: true },
  { key: "analyze", title: "Score a deck", line: "See what works and what to fix first", icon: FileSearch, mark: "bg-[#0f172a]" },
  { key: "sanitize", title: "Sanitize", line: "Make it safe to show: names, logos and numbers replaced", icon: EyeOff, mark: "bg-[#64748b]" },
]
const PILLS_ANY = ["Tidy for a meeting", "Rebuild on our template", "Investor pitch", "Safe for the portfolio"]
const PILLS_DESIGN = ["Calm and premium", "Numbers that stand out", "Investor pitch", "Less text per slide"]

const ease = [0.22, 1, 0.36, 1] as const
const T1 = "text-[#0b1120]"
const T2 = "text-[#475569]"
const T3 = "text-[#5d6b7d]"
const pill = "inline-flex h-10 min-w-0 items-center gap-1.5 rounded-full px-3 text-sm text-[#475569]"

export function AppScene({ onPhase }: { onPhase?: (p: ScenePhase) => void }) {
  const [t, setT] = useState(0)
  const [still, setStill] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const startRef = useRef<HTMLSpanElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  // the clock: runs while the scene is on screen and the tab is visible
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true)
      setT(STILL)
      return
    }
    const el = root.current
    if (!el) return
    let raf = 0
    let origin = 0
    let paused = 0
    let visible = false
    const tick = (now: number) => {
      if (!origin) origin = now
      let ms = now - origin
      if (ms >= LOOP) {
        origin = now
        ms = 0
      }
      setT(ms)
      raf = requestAnimationFrame(tick)
    }
    const run = () => {
      if (raf || !visible || document.hidden) return
      if (paused) origin += performance.now() - paused
      paused = 0
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      if (!raf) return
      cancelAnimationFrame(raf)
      raf = 0
      paused = performance.now()
    }
    // The Lab shows the window scaled and cut by its panel's bottom edge, so the part on screen can be small: any
    // visible slice runs the clock, and the first check is made here rather than waited for from the observer.
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting
        if (visible) run()
        else stop()
      },
      { threshold: 0.02 },
    )
    io.observe(el)
    const r0 = el.getBoundingClientRect()
    if (r0.bottom > 0 && r0.top < window.innerHeight && r0.right > 0 && r0.left < window.innerWidth) {
      visible = true
      run()
    }
    const onVis = () => (document.hidden ? stop() : run())
    document.addEventListener("visibilitychange", onVis)
    return () => {
      io.disconnect()
      document.removeEventListener("visibilitychange", onVis)
      cancelAnimationFrame(raf)
    }
  }, [])

  // where the pointer goes: the Design card (its chip on a phone), then Start. The window may be scaled, so
  // screen pixels are turned back into the scene's own.
  const target = t < TO_START ? "card" : "start"
  const labelled = t >= START_LABEL
  // a phone's home is taller than its frame: the screen scrolls down to the cards and back up to Start, as a person
  // would on the phone (Kirill, 29.10); the pointer is measured once the scroll has settled
  // The Lab's window is always the desktop one (1700 x 960, scaled by its panel), whatever the screen: on wetr.io
  // these two followed the viewport.
  const narrow = false
  const wide = true
  const scrolled = narrow && t >= CURSOR_IN - 700 && t < PICK + 200
  const tracking = t >= CURSOR_IN - 800 && t < TASK
  useEffect(() => {
    const measure = () => {
      const s = root.current
      const el = target === "card" ? cardRef.current : startRef.current
      if (!s || !el) return
      const a = s.getBoundingClientRect()
      const b = el.getBoundingClientRect()
      const k = a.width / s.offsetWidth || 1
      setCursor({ x: (b.left - a.left + b.width * 0.6) / k, y: (b.top - a.top + b.height * 0.55) / k })
    }
    measure()
    // while the pointer is out, it follows its target as the screen moves under it
    if (!tracking) return
    const follow = window.setInterval(measure, 120)
    return () => window.clearInterval(follow)
  }, [target, labelled, scrolled, tracking])

  const typed = LUMEN_BRIEF.slice(0, Math.max(0, Math.floor((t - TYPE_AT) / TYPE_MS)))
  const files = t >= FILES_AT
  const picked = t >= PICK
  const pressing = (t >= AT_CARD && t < AT_CARD + 160) || (t >= AT_START && t < AT_START + 160) 
  const cursorOn = t >= CURSOR_IN && t < TASK
  const task = t >= TASK
  const step = t < TASK + 600 ? 0 : t < READ_DONE ? 1 : t < EDIT_DONE ? 2 : t < CHECK_DONE ? 3 : 4
  const done = Math.max(0, Math.min(LUMEN.slides, Math.floor((t - READ_DONE) / SLIDE_MS) + 1))
  const drawn = step < 2 ? 0 : step === 2 ? done : LUMEN.slides
  const finished = step === 4
  // the end (Kirill, 29.10): Side by side on its own, the chat folds away, the slides take the whole work area and
  // turn one by one; then a rest and the loop starts again
  const pair = t >= PAIR
  const shown = pair ? Math.min(PAIR_SLIDES, 1 + Math.floor((t - PAIR) / PAIR_SLIDE_MS)) : 1
  const phase: ScenePhase = !task ? "compose" : finished ? "done" : "running"
  useEffect(() => onPhase?.(phase), [phase, onPhase])

  const notes = step === 1 ? NOTES.slice(0, 1) : step === 2 ? NOTES.slice(1, Math.min(NOTES.length, 1 + Math.ceil(done / 3))) : step === 3 ? ["Looking at every slide again before the check."] : []

  return (
    <motion.div ref={root} animate={{ opacity: t >= FADE ? 0 : 1 }} transition={{ duration: 0.45 }} className="relative h-full w-full" aria-hidden>
      <AnimatePresence initial={false}>
        {!task ? (
          /* ── home ─────────────────────────────────────────────────────────────── */
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.5, ease }}
            // the top is pinned where centring the full box puts it (as the platform pins it): when the files come in
            // the box grows downwards and nothing above it moves (Kirill, 29.10: «не плавно»)
            className="absolute inset-0 overflow-hidden"
          >
            {/* the platform's own glow, as its home screen draws it (HomeGlow there) */}
            <AppGlow wide={wide} />
            <div
              className="flex flex-col items-center pb-8 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] px-10 pt-40"
              style={{ transform: scrolled ? "translateY(-330px)" : "none" }}
            >
            <div className="relative text-center mb-10">
              <p className={cn("font-medium tracking-tight text-4xl", T1)}>Hi Anna. What should we do today?</p>
              <p className={cn("mt-2 text-base", T1)}>Pick a service, attach file and describe what you need to do</p>
            </div>

            {/* the glass plate: the ready requests, then the box */}
            <div className="relative w-full max-w-3xl rounded-[26px] bg-white/45 p-3 backdrop-blur-2xl">
              <div className="relative mb-3 h-9 overflow-hidden">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={picked ? "design" : "any"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease }}
                    className="absolute inset-0 flex gap-2"
                  >
                    {(picked ? PILLS_DESIGN : PILLS_ANY).map((p) => (
                      <span key={p} className={cn("h-9 shrink-0 rounded-full bg-white/55 px-4 text-sm leading-9 whitespace-nowrap", T2)}>
                        {p}
                      </span>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div
                className={cn(
                  "rounded-[20px] border border-[#e2e8f0] p-3 shadow-[0_12px_40px_-16px_rgb(0_0_0/0.18)] backdrop-blur-xl transition-colors duration-200",
                  typed || files ? "bg-white/95" : "bg-white/80",
                )}
              >
                <AnimatePresence initial={false}>
                  {files && (
                    <motion.div key="files" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.4, ease }} className="overflow-hidden">
                      <div className="mb-2 flex flex-wrap gap-2">
                        {[
                          { icon: FileText, name: "Q3_Business_Review.pptx", sub: "pptx, 4.2 MB", w: "w-60" },
                          { icon: FileSpreadsheet, name: "Chart_Data.xlsx", sub: "xlsx, 86 KB", w: "w-52" },
                        ].map((f, i) => (
                          <motion.div
                            key={f.name}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: i * 0.1, ease }}
                            className={cn("flex max-w-full min-w-0 items-center gap-3 rounded-xl bg-[#f1f5f9] px-3 py-2", f.w)}
                          >
                            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#3b82f6]/10 text-[#1d4ed8]">
                              <f.icon className="size-4" />
                            </span>
                            <span className="min-w-0">
                              <span className={cn("block truncate text-sm font-medium", T1)}>{f.name}</span>
                              <span className={cn("block text-xs", T3)}>{f.sub}</span>
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <p className="min-h-12 px-2 py-1.5 text-sm leading-relaxed">
                  {typed ? (
                    <span className={T1}>
                      {typed}
                      {!files && <span className="ml-px inline-block h-[1.1em] w-px translate-y-[0.2em] bg-[#3b82f6]" />}
                    </span>
                  ) : (
                    <span className={T3}>Describe what you are working on</span>
                  )}
                </p>
                <div className="mt-1 flex items-center gap-1">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-[#d0d5dc] text-[#475569]">
                    <Paperclip className="size-4" />
                  </span>
                  <span className={cn(pill, "transition-colors duration-300", picked && "text-[#2563eb]")}>
                    <AnimatePresence initial={false} mode="wait">
                      <motion.span
                        key={picked ? "design" : "service"}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2, ease }}
                        className="inline-flex items-center gap-1.5"
                      >
                        {picked ? <Palette className="size-4" /> : <Sparkles className="size-4" />}
                        <span>{picked ? "Design" : "Service"}</span>
                      </motion.span>
                    </AnimatePresence>
                    <ChevronDown className="size-3.5 opacity-60" />
                  </span>
                  <span className="ml-auto flex items-center gap-1">
                    <span className={cn(pill, "inline-flex", picked && "text-[#2563eb]")}>
                      <SlidersHorizontal className="size-4" />
                      <AnimatePresence initial={false}>
                        {picked && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 28 }}
                            className="rounded-full bg-[#3b82f6] px-1.5 text-xs text-white"
                          >
                            1
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <span className="size-10 items-center justify-center rounded-full text-[#475569] inline-flex">
                      <Mic className="size-4" />
                    </span>
                    <motion.span
                      ref={startRef}
                      layout
                      transition={{ duration: 0.3, ease }}
                      animate={{ scale: t >= AT_START && t < AT_START + 160 ? 0.94 : 1 }}
                      className={cn(
                        "inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#3b82f6] text-white",
                        labelled ? "px-4 text-sm font-medium" : "w-10",
                        !typed && "opacity-40",
                      )}
                    >
                      {labelled && <span>Start</span>}
                      <ArrowUp className="size-4" />
                    </motion.span>
                  </span>
                </div>
              </div>
            </div>

            {/* the service cards: three, then two, the box's width */}
            <div className="relative grid w-full max-w-3xl gap-3 grid-cols-6 mt-10">
              {CARDS.map((c, i) => {
                const on = picked && c.key === "restyle"
                return (
                  <div
                    key={c.key}
                    ref={c.key === "restyle" ? cardRef : undefined}
                    className={cn(
                      "relative flex flex-col items-start gap-4 rounded-2xl bg-white p-4 transition-[box-shadow,transform] duration-200",
                      i < 3 ? "col-span-2" : "col-span-3",
                      on ? "shadow-[0_10px_28px_-14px_rgba(15,23,42,0.28)] ring-1 ring-[#3b82f6]" : "shadow-[0_6px_18px_-14px_rgba(15,23,42,0.22)]",
                    )}
                  >
                    <span className={cn("inline-flex size-14 items-center justify-center rounded-[16px] text-white", c.mark)}>
                      <c.icon className="size-6" strokeWidth={1.75} />
                    </span>
                    <span>
                      <span className={cn("block text-sm font-medium", T1)}>
                        {c.title} {c.beta && <span className="text-xs font-normal text-[#2563eb]">beta</span>}
                      </span>
                      <span className={cn("mt-0.5 block text-xs leading-snug", T3)}>{c.line}</span>
                    </span>
                  </div>
                )
              })}
            </div>

            </div>
          </motion.div>
        ) : (
          /* ── the task ─────────────────────────────────────────────────────────── */
          <motion.div
            key="task"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="absolute inset-0 flex-col bg-[#f8fafc] transition-[grid-template-columns] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] grid"
            style={{ gridTemplateColumns: pair ? "0px minmax(0,1fr)" : "420px minmax(0,1fr)" }}
          >
            {/* the conversation */}
            <div className={cn("flex min-h-0 min-w-0 flex-col overflow-hidden border-[#e2e8f0] bg-white transition-opacity duration-300 border-r", pair && "opacity-0")}>
              <div className="flex min-w-0 items-center gap-2 border-b border-[#e2e8f0] px-4 py-3">
                <span className="inline-flex size-9 items-center justify-center text-[#5d6b7d]">
                  <ChevronLeft className="size-4" />
                </span>
                <span className={cn("min-w-0 flex-1 truncate text-lg font-medium tracking-tight", T1)}>Q3 business review</span>
                <span className="flex items-center gap-0.5 text-[#475569]">
                  {finished && (
                    <span className="inline-flex size-9 items-center justify-center">
                      <Download className="size-4" />
                    </span>
                  )}
                  <span className="inline-flex size-9 items-center justify-center">{finished ? <History className="size-4" /> : <Loader2 className="size-4 animate-spin text-[#2563eb]" />}</span>
                  <span className="inline-flex size-9 items-center justify-center">
                    <MoreHorizontal className="size-4" />
                  </span>
                </span>
              </div>

              <div className="min-h-0 flex-1 flex-col gap-4 overflow-hidden px-4 pt-4 flex">
                {/* the request, as the person's bubble */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] space-y-1.5 rounded-2xl rounded-br-md bg-[#f1f5f9] px-3.5 py-2 text-sm">
                    <div className={cn("text-xs font-medium", T3)}>Design</div>
                    <div className={T1}>{LUMEN_BRIEF}</div>
                    <ul className="space-y-0.5">
                      {["Q3_Business_Review.pptx", "Chart_Data.xlsx"].map((f) => (
                        <li key={f} className={cn("flex items-center gap-1.5 text-xs", T2)}>
                          <Paperclip className="size-3 shrink-0 text-[#5d6b7d]" />
                          <span className="truncate">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* the run, as the chat's own lines; then the answer */}
                {!finished ? (
                  <div className="space-y-1.5">
                    {step === 0 ? (
                      <Line icon={<Loader2 className="size-3.5 animate-spin text-[#5d6b7d]" />} text={STEPS[0]} active />
                    ) : (
                      [1, 2, 3].map((i) => (
                        <div key={i}>
                          <Line
                            icon={
                              i < step ? (
                                <CheckCircle2 className="size-3.5 text-[#0da86e]" />
                              ) : i === step ? (
                                <Loader2 className="size-3.5 animate-spin text-[#2563eb]" />
                              ) : (
                                <span className="size-3.5 rounded-full border border-[#d0d5dc]" />
                              )
                            }
                            text={STEPS[i]}
                            active={i === step}
                            dim={i > step}
                          />
                          {i === step && notes.length > 0 && (
                            <ul className="mt-1 space-y-0.5 pl-5.5 text-xs leading-relaxed text-[#5d6b7d]">
                              {notes.map((n) => (
                                <motion.li key={n} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="line-clamp-2">
                                  {n}
                                </motion.li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}>
                    <p className={cn("text-sm leading-relaxed", T1)}>
                      The deck is ready: all 10 slides redesigned in a dark executive style, and every chart built from Chart_Data.xlsx. Passed the check: all
                      text and shapes are in place.
                    </p>
                    <p className={cn("mt-3 text-sm leading-relaxed", T1)}>Write what to change on this slide or in the whole deck, or ask why something is done this way.</p>
                    <div className="mt-3 flex items-center gap-2 text-[#5d6b7d]">
                      <ThumbsUp className="size-4" />
                      <ThumbsDown className="size-4" />
                      <span className="ml-auto text-xs">Design · 14 min · 86 tokens</span>
                    </div>
                  </motion.div>
                )}

                {/* the box under the conversation */}
                <div className="mt-auto mb-4 rounded-[20px] border border-[#d0d5dc] bg-white p-3">
                  <p className={cn("min-h-12 px-2 py-1.5 text-sm", T3)}>{finished ? "What should change in the whole deck?" : "What should change? Or ask a question…"}</p>
                  <div className="mt-1 flex items-center gap-1">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-[#d0d5dc] text-[#475569]">
                      <Paperclip className="size-4" />
                    </span>
                    <span className={pill}>
                      <Sparkles className="size-4" />
                      <ChevronDown className="size-3.5 opacity-60" />
                    </span>
                    <span className="ml-auto inline-flex size-10 items-center justify-center text-[#475569]">
                      <Mic className="size-4" />
                    </span>
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#3b82f6] text-white opacity-40">
                      <ArrowUp className="size-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* the deck */}
            <div className="min-h-0 min-w-0 overflow-hidden p-4">
              {!finished ? (
                <>
                  <div className="mb-4">
                    <div className="flex min-w-0 items-center gap-2 text-sm">
                      <Loader2 className="size-4 shrink-0 animate-spin text-[#2563eb]" />
                      <span className={cn("min-w-0 truncate font-medium", T1)}>{STEPS[Math.min(Math.max(step, 0), 3)]}</span>
                      {drawn > 0 && <span className={cn("ml-auto shrink-0 tabular-nums", T3)}>{`${drawn} of ${LUMEN.slides} redrawn`}</span>}
                    </div>
                    <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-[#e2e8f0]">
                      {drawn > 0 ? (
                        <div className="h-full rounded-full bg-[#3b82f6] transition-[width] duration-700 ease-out" style={{ width: `${(drawn / LUMEN.slides) * 100}%` }} />
                      ) : (
                        <motion.div className="h-full w-1/3 rounded-full bg-[#3b82f6]/50" animate={{ x: ["-100%", "300%"] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} />
                      )}
                    </div>
                    {drawn === 0 && (
                      <p className={cn("mt-2.5 text-xs leading-relaxed", T3)}>
                        Your deck as it came in: each slide changes to its new version as soon as the agent redraws it.
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3 grid-cols-3">
                    {Array.from({ length: LUMEN.slides }, (_, i) => i + 1).map((n) => {
                      const v = n <= drawn
                      return (
                        <figure key={n} className="relative">
                          {/* the redrawn slide fades in over the original: no swap, no flash */}
                          <div className={cn("relative aspect-video w-full overflow-hidden rounded-lg border transition-colors duration-500", v ? "border-[#3b82f6]/40" : "border-[#e2e8f0]")}>
                            <img src={slide("before", n, true)} alt="" className="absolute inset-0 size-full object-cover opacity-60" />
                            <img src={slide("after", n, true)} alt="" className={cn("absolute inset-0 size-full object-cover transition-opacity duration-700 ease-out", v ? "opacity-100" : "opacity-0")} />
                          </div>
                          <figcaption className="absolute bottom-1.5 left-1.5 inline-flex items-center gap-1 rounded bg-black/55 px-1.5 text-xs text-white tabular-nums">
                            {v && <span className="size-1.5 rounded-full bg-[#0da86e]" />}
                            {n}
                          </figcaption>
                        </figure>
                      )
                    })}
                  </div>
                </>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="flex-col grid grid-cols-[112px_minmax(0,1fr)] gap-6">
                  {/* numbered thumbnails down the left */}
                  <div className="flex overflow-hidden order-1 mt-0 flex-col gap-3">
                    {Array.from({ length: 6 }, (_, i) => i + 1).map((n) => (
                      <div key={n} className="flex shrink-0 items-start gap-1.5">
                        <span className={cn("w-4 shrink-0 pt-0.5 text-right text-xs tabular-nums block", n === shown ? "font-medium text-[#2563eb]" : T3)}>{n}</span>
                        <span className={cn("block overflow-hidden rounded-lg border-2", n === shown ? "border-[#3b82f6]" : "border-transparent")}>
                          <img src={slide("after", n, true)} alt="" className="h-auto w-full" />
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="min-w-0 order-2">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="inline-flex rounded-full bg-[#f1f5f9] p-1 text-sm">
                        {["After", "Side by side", "Stacked"].map((x, i) => (
                          <span
                            key={x}
                            className={cn(
                              "rounded-full px-4 py-1.5 transition-colors",
                              i === (pair ? 1 : 0) ? cn("bg-white font-medium shadow-[0_1px_3px_rgba(15,23,42,0.12)]", T1) : T2,
                            )}
                          >
                            {x}
                          </span>
                        ))}
                      </span>
                      <Expand className="ml-auto size-4 text-[#5d6b7d]" />
                    </div>
                    {!pair ? (
                      <div className="relative aspect-video overflow-hidden rounded-xl border border-[#e2e8f0] bg-white">
                        <img src={slide("after", 1)} alt="" className="absolute inset-0 size-full object-cover" />
                      </div>
                    ) : (
                      // Side by side, as the task page draws it: a clear label over each, the original and the result
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="grid gap-4 grid-cols-2">
                        {(["before", "after"] as const).map((side) => (
                          <figure key={side} className="min-w-0">
                            <figcaption className={cn("mb-2 text-base font-medium", T1)}>{side === "after" ? "After" : "Before"}</figcaption>
                            <div className="relative aspect-video overflow-hidden rounded-xl border border-[#e2e8f0] bg-white">
                              {/* every slide stays once shown and the next lays over it: no gap, no flash */}
                              {Array.from({ length: PAIR_SLIDES }, (_, k) => k + 1).map((n) => (
                                <img
                                  key={n}
                                  src={slide(side, n)}
                                  alt=""
                                  className={cn("absolute inset-0 size-full object-cover transition-opacity duration-500", n <= shown ? "opacity-100" : "opacity-0")}
                                  style={{ zIndex: n }}
                                />
                              ))}
                            </div>
                          </figure>
                        ))}
                      </motion.div>
                    )}
                    {/* the report under the slide */}
                    <div className="mt-5 block">
                      <span className="inline-flex rounded-full bg-[#f1f5f9] p-1 text-sm">
                        {["What the agent did", "Your request", "Check"].map((x, i) => (
                          <span key={x} className={cn("rounded-full px-4 py-1.5", i === 0 ? cn("bg-white font-medium shadow-[0_1px_3px_rgba(15,23,42,0.12)]", T1) : T2)}>
                            {x}
                          </span>
                        ))}
                      </span>
                      <ul className="mt-4 space-y-2 rounded-2xl bg-white p-5 text-sm leading-relaxed text-[#0b1120]">
                        {["Every chart built from Chart_Data.xlsx, sheets C1 to C6.", "Dark executive style on all 10 slides, one grid and one type scale.", "Key figures pulled into the titles; every number is the draft's."].map((x) => (
                          <li key={x} className="flex gap-2">
                            <Check className="mt-0.5 size-4 shrink-0 text-[#0da86e]" />
                            {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* the pointer */}
      {!still && (
        <motion.div
          className="pointer-events-none absolute top-0 left-0 z-20"
          initial={false}
          animate={{ x: cursor.x, y: cursor.y, opacity: cursorOn ? 1 : 0, scale: pressing ? 0.86 : 1 }}
          transition={{ x: { duration: 0.75, ease }, y: { duration: 0.75, ease }, opacity: { duration: 0.25 }, scale: { duration: 0.12 } }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
            <path d="M4 2.5 L4 19 L8.6 14.8 L11.6 21.5 L14.4 20.3 L11.4 13.7 L17.6 13.7 Z" fill="#0f172a" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  )
}

/** One step of the run, the way the chat shows it: a small icon and a line (FullJob.tsx `Line`). */
function Line({ icon, text, active, dim }: { icon: React.ReactNode; text: string; active?: boolean; dim?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2 text-sm", active ? "text-[#0b1120]" : dim ? "text-[#5d6b7d]/70" : "text-[#5d6b7d]")}>
      <span className="inline-flex size-3.5 shrink-0 items-center justify-center">{icon}</span>
      <span className="min-w-0 truncate">{text}</span>
    </div>
  )
}

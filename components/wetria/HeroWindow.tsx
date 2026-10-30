"use client"

import { useCallback, useState } from "react"
import { motion } from "motion/react"
import { ArrowLeft, ArrowRight, ChevronDown, EyeOff, FileSearch, Folder, LayoutTemplate, Palette, PanelLeft, PanelLeftClose, Plus, Search, Wand2 } from "lucide-react"
import { AppScene, type ScenePhase as HeroPhase } from "@/components/wetria/AppScene"
import { cn } from "@/lib/wetria/utils"

/**
 * The fold's picture as a desktop app (Kirill, 29.10, after Codex's fold): a window with the platform's own sidebar
 * on the left and the home screen on the right, where the scene (AppScene) types a request and runs a task.
 *
 * Measured off the platform's code, not drawn by eye (Kirill: «чтобы совпадало с реальностью»):
 * - the sidebar column is 300px on #f1f4f8 (`layout/Shell.tsx`, `--bg-sidebar`);
 * - inside it (`layout/Sidebar.tsx`): 16px top and 12px sides; the mark in a 48px slot, search and fold as 36px
 *   buttons on a 40px row; New task 16px under it with its 20px black circle in a 16px box; the list 24px lower,
 *   sections 24px apart, each heading 12px medium with its chevron, rows 36px tall with 16px in front of the icon,
 *   2px between them; a running task shows a pulsing dot where its service icon stands, the open row is tinted;
 * - the home screen (`designer/DesignerChat.tsx`): the greeting 36px medium, the line under it in the text colour,
 *   40px to the composer, which is 768px wide.
 * The window is laid out at 1700 x 960 (Kirill's own screen of the app: sidebar 300, chat 420, main 1400) and
 * shown at 64% from 1024px up, as a screenshot of the app would be. Its size never changes: the body has a fixed height and Recent tasks always holds five rows, the scene's
 * own task taking the first one while it is on screen. Phones and tablets get the window without the sidebar, unscaled.
 *
 * The projects, templates and tasks are made up. A picture, not a control: nothing in it takes focus.
 */

const PROJECTS = ["Lumen Mobility", "Series A raise", "Brand refresh 2027", "Sales kit"]
const TEMPLATES = ["Lumen master", "Investor deck"]
const RECENT = [
  { title: "Board update, October", icon: Wand2 },
  { title: "Pitch deck v4", icon: Palette },
  { title: "Sales kit on the new master", icon: LayoutTemplate },
  { title: "Client case for the portfolio", icon: EyeOff },
  { title: "Investor update, scored", icon: FileSearch },
]

const ease = [0.22, 1, 0.36, 1] as const
const row = "flex h-9 min-w-0 items-center gap-2.5 rounded-xl pr-3 pl-4 text-sm"
const quiet = "text-muted-foreground"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-1 flex items-center px-3">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
          {title}
          <ChevronDown className="size-3.5" />
        </span>
      </div>
      <div className="space-y-0.5">{children}</div>
    </section>
  )
}

export function HeroWindow() {
  const [phase, setPhase] = useState<HeroPhase>("compose")
  const onPhase = useCallback((p: HeroPhase) => setPhase(p), [])
  const task = phase !== "compose"

  return (
    // Laid out at 1700 x 960, the size of Kirill's own screen of the app (sidebar 300, a 1400px main area where the
    // 768px box sits with air around it), shown at 64% = the container's width from 1024px up. Scaling leaves the
    // box at full height, so what it no longer fills is taken back with a fixed margin: the 44px bar + the 960px
    // body = 1004px, 36% of it 361.
    <div className="w-[1700px]">
      <div className="overflow-hidden rounded-[22px] bg-white/55 text-left shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)] backdrop-blur-2xl">
        {/* a phone: the app's own top bar, the panel button on the left and the mark in the middle (Kirill, 29.10) */}
        <div className="relative h-14 items-center border-b border-border/60 bg-[#f8fafc] px-4 hidden">
          <PanelLeft className="size-5 text-[#475569]" />
          {/* eslint-disable-next-line @next/next/no-img-element -- the product's mark */}
          <img src="/wetria/brand/icon.png" alt="" className="absolute left-1/2 size-7 -translate-x-1/2" />
        </div>
        {/* a desktop: the window's title bar */}
        <div className="h-11 items-center gap-5 border-b border-border/60 bg-white/80 px-4 flex">
          <span className="flex gap-2">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
          </span>
          <span className="items-center gap-3 text-muted-foreground flex">
            <PanelLeft className="size-4" />
            <ArrowLeft className="size-4" />
            <ArrowRight className="size-4 opacity-50" />
          </span>
        </div>

        <div className="grid h-[960px] grid-cols-[300px_1fr]">
          {/* the sidebar, as the platform draws it */}
          <aside className="min-h-0 flex-col overflow-hidden border-r border-border/60 bg-[#f1f4f8] flex">
            <div className="shrink-0 px-3 pt-4">
              <div className="flex h-10 items-center gap-1">
                <span className="mr-auto flex w-12 shrink-0 items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element -- the product's mark, a 48px PNG */}
                  <img src="/wetria/brand/icon.png" alt="" className="size-[25px]" />
                </span>
                <span className="inline-flex size-9 shrink-0 items-center justify-center text-muted-foreground">
                  <Search className="size-4" />
                </span>
                <span className="inline-flex size-9 shrink-0 items-center justify-center text-muted-foreground">
                  <PanelLeftClose className="size-4" />
                </span>
              </div>
              <div className={cn("mt-4 font-medium text-foreground", row)}>
                <span className="flex w-4 shrink-0 justify-center">
                  <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-white">
                    <Plus className="size-3.5" strokeWidth={2.5} />
                  </span>
                </span>
                New task
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-6 px-3 pt-6 pb-4">
              <Section title="Projects">
                {PROJECTS.map((p) => (
                  <div key={p} className={cn(row, quiet)}>
                    <Folder className="size-4 shrink-0" />
                    <span className="truncate">{p}</span>
                  </div>
                ))}
              </Section>

              <Section title="Templates">
                {TEMPLATES.map((p) => (
                  <div key={p} className={cn(row, quiet)}>
                    <Palette className="size-4 shrink-0" />
                    <span className="truncate">{p}</span>
                  </div>
                ))}
              </Section>

              <Section title="Recent tasks">
                {/* always five rows: the scene's task takes the first while it is on screen, nothing changes height */}
                {task ? (
                  <motion.div
                    key="live"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35, ease }}
                    className={cn(row, "bg-accent/10 font-medium text-accent-strong")}
                  >
                    {phase === "running" ? (
                      <span className="flex size-4 shrink-0 items-center justify-center">
                        <span className="size-2 animate-pulse rounded-full bg-accent" />
                      </span>
                    ) : (
                      <Palette className="size-4 shrink-0" />
                    )}
                    <span className="truncate">Q3 business review</span>
                  </motion.div>
                ) : null}
                {RECENT.slice(0, task ? 4 : 5).map((r) => (
                  <div key={r.title} className={cn(row, quiet)}>
                    <r.icon className="size-4 shrink-0" />
                    <span className="truncate">{r.title}</span>
                  </div>
                ))}
              </Section>
            </div>

            {/* pinned under the list: the account */}
            <div className="shrink-0 px-3 pb-3">
              <div className="flex items-center gap-2.5 rounded-2xl bg-white p-3">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e0e7ff] text-xs font-medium text-[#3730a3]">AK</span>
                <span className="min-w-0 leading-tight">
                  <span className="block truncate text-sm font-medium">Anna Keller</span>
                  <span className="block text-xs text-muted-foreground">Pro plan</span>
                </span>
              </div>
            </div>
          </aside>

          {/* the app itself: home, then the task, as the platform draws them (AppScene) */}
          <div className="relative min-h-0 min-w-0 overflow-hidden bg-[#f8fafc]">
            <AppScene onPhase={onPhase} />
          </div>
        </div>
      </div>
    </div>
  )
}

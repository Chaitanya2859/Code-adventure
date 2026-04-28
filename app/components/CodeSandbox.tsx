'use client'

import { useRef, useState } from 'react'
import Editor, { OnMount } from '@monaco-editor/react'
import { Button } from '@/components/ui/button'
import { Play, RotateCcw, List, TerminalSquare, CheckCircle2, Trophy, ArrowLeft } from 'lucide-react'
import type * as Monaco from 'monaco-editor'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// ────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────
type Tab = 'html' | 'css' | 'js'

interface FileState {
  html: string
  css: string
  js: string
}

interface Instruction {
  numberTitle?: string;
  mainHeading: string;
  introduction?: string;
  conceptExplanation?: string;
  funFact?: string;
  relatedConcepts?: { title: string; desc: string }[];
  taskTheme?: string;
  steps: string[];
  closingLine?: string;
  hint?: string;
  codeSnippet?: { html1: string; html2: string; css1: string; css2: string };
}

interface CodeSandboxProps {
  instruction: Instruction
  defaultFiles?: Partial<FileState>
  language?: Tab           // single-file mode (default: 'html')
  tabs?: Tab[]             // which tabs to show
  exerciseNumber?: number  // current exercise index (1-based)
  totalExercises?: number  // total exercises in the chapter
  xpPerExercise?: number   // XP awarded on completion
  onComplete?: () => void  // callback when completed
  onSubmit?: (files: FileState) => void
  backHref?: string        // href for back to course button
  courseId?: string
  chapterId?: string
  exerciseSlug?: string
  isAlreadyCompleted?: boolean
  prevHref?: string
  nextHref?: string
}

// ────────────────────────────────────────────────────
// Defaults
// ────────────────────────────────────────────────────
const DEFAULT_FILES: FileState = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Practice</title>
  <style>/* CSS will be injected here */</style>
</head>
<body>
  <!-- Write your HTML here -->
  <h2>Write the date</h2>
  <p>Write your wish</p>
</body>
</html>`,
  css: `/* Write your CSS here */
body {
  font-family: sans-serif;
  background: #1e1e1e;
  color: white;
}`,
  js: `// Write your JavaScript here
console.log('Hello from the sandbox!');`,
}

const TAB_LANGUAGE_MAP: Record<Tab, string> = {
  html: 'html',
  css: 'css',
  js:  'javascript',
}

// ────────────────────────────────────────────────────
// Helper – Build srcdoc from all three files
// ────────────────────────────────────────────────────
function buildSrcdoc(files: FileState): string {
  // Inject CSS and JS into the HTML string
  const withStyles = files.html.replace(
    '<style>/* CSS will be injected here */</style>',
    `<style>${files.css}</style>`
  )
  const withScript = withStyles.replace('</body>', `<script>${files.js}</script>\n</body>`)
  return withScript
}

// ────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────
export default function CodeSandbox({
  instruction,
  defaultFiles,
  language = 'html',
  tabs = ['html', 'css', 'js'],
  exerciseNumber = 1,
  totalExercises = 7,
  xpPerExercise = 10,
  onComplete,
  onSubmit,
  backHref,
  courseId,
  chapterId,
  exerciseSlug,
  isAlreadyCompleted = false,
  prevHref,
  nextHref,
}: CodeSandboxProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null)
  const router = useRouter()

  const [files, setFiles] = useState<FileState>({
    ...DEFAULT_FILES,
    ...defaultFiles,
  })
  const [activeTab, setActiveTab] = useState<Tab>(language)
  const [iframeKey, setIframeKey] = useState(0)      // force iframe remount on run
  const [hasRun, setHasRun] = useState(false)         // track if code has been run
  const [completed, setCompleted] = useState(isAlreadyCompleted)   // completion state
  const [totalXp, setTotalXp] = useState(0)           // accumulated XP
  const [doneCount, setDoneCount] = useState(isAlreadyCompleted ? 1 : 0)       // exercises completed
  const [showBanner, setShowBanner] = useState(false) // completion banner

  // ── Editor mount ────────────────────────────────
  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor
  }

  // ── Sync editor value → files state on change ──
  const handleEditorChange = (value: string | undefined) => {
    setFiles(prev => ({ ...prev, [activeTab]: value ?? '' }))
  }

  // ── Run: inject content into iframe ────────────
  const handleRun = () => {
    setHasRun(true)
    setIframeKey(k => k + 1)   // remount = clean slate
  }

  // ── Reset to defaults ───────────────────────────
  const handleReset = () => {
    const fresh = { ...DEFAULT_FILES, ...defaultFiles }
    setFiles(fresh)
    editorRef.current?.setValue(fresh[activeTab])
    setHasRun(false)
    setIframeKey(k => k + 1)
  }

  // ── Submit ──────────────────────────────────────
  const handleSubmit = () => {
    onSubmit?.(files)
  }

  // ── Complete ─────────────────────────────────────
  const handleComplete = async () => {
    if (completed) return
    setCompleted(true)
    setTotalXp(prev => prev + xpPerExercise)
    setDoneCount(prev => prev + 1)
    setShowBanner(true)
    setTimeout(() => setShowBanner(false), 3000)

    if (courseId && exerciseSlug) {
      try {
        await fetch('/api/exercise/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            courseId,
            chapterId: chapterId || "0",
            exerciseSlug,
            xp: xpPerExercise
          })
        })
        router.refresh()
      } catch (err) {
        console.error("Failed to save completion", err)
      }
    }

    onComplete?.()
  }

  const srcdoc = buildSrcdoc(files)

  // ────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen bg-[#06080F] overflow-hidden text-zinc-300 font-sans relative">

      {/* ── WORKSPACE ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT: Instructions ── */}
        <aside className="w-[30%] min-w-[250px] bg-[#0A0B1A] border-r-2 border-[#1E293B] flex flex-col overflow-hidden relative">
          
          {/* Top Bar for Back Button */}
          {backHref && (
            <div className="bg-[#06080F] border-b border-[#1E293B] px-4 py-2 flex items-center shrink-0">
              <Link href={backHref}>
                <button className="text-zinc-400 hover:text-white font-game text-sm flex items-center gap-2 transition-colors">
                  <ArrowLeft size={16} /> Course Page
                </button>
              </Link>
            </div>
          )}

          {/* scrollable body */}
          <div className="flex-1 overflow-y-auto">
            {/* Learning content header area */}
            <div className="p-6 pb-4 border-b border-[#1E293B]">
               {instruction.numberTitle && (
                 <p className="text-zinc-500 font-bold mb-2 uppercase tracking-wider text-xs">{instruction.numberTitle}</p>
               )}
               <h1 className="text-white text-3xl font-bold mb-4">{instruction.mainHeading}</h1>
               
               {instruction.introduction && (
                 <p className="text-sm leading-relaxed mb-4 text-[#A8B2D1]">{instruction.introduction}</p>
               )}

               {instruction.conceptExplanation && (
                 <p className="text-sm leading-relaxed mb-4 text-[#A8B2D1]">{instruction.conceptExplanation}</p>
               )}

               {instruction.relatedConcepts && instruction.relatedConcepts.length > 0 && (
                 <>
                   <p className="text-sm leading-relaxed mb-3 text-[#A8B2D1]">Let's look at the core building blocks:</p>
                   <ul className="list-disc pl-5 space-y-2 text-sm mb-4">
                     {instruction.relatedConcepts.map((concept, idx) => (
                        <li key={idx}>
                          <span className="font-bold text-white">{concept.title}:</span> <span className="text-[#A8B2D1]">{concept.desc}</span>
                        </li>
                     ))}
                   </ul>
                 </>
               )}

               {instruction.funFact && (
                 <div className="bg-[#1A1F35] border border-[#2A3441] rounded-lg p-4 mt-6">
                   <p className="font-bold text-yellow-400 text-xs uppercase tracking-wider mb-1">🧐 Fun Fact</p>
                   <p className="text-sm text-[#A8B2D1] leading-relaxed">{instruction.funFact}</p>
                 </div>
               )}
            </div>

            {/* Actual Instructions */}
            <div className="bg-[#181D31] py-3 px-6 border-b border-[#1E293B]">
              <h2 className="font-bold text-white text-sm uppercase tracking-widest">Instructions</h2>
            </div>
            
            <div className="p-6 space-y-4">
              {instruction.taskTheme && (
                <p className="text-sm text-white font-medium mb-2">{instruction.taskTheme}</p>
              )}
              
              <div className="space-y-4 text-sm text-[#A8B2D1]">
                {instruction.steps.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-emerald-400 font-bold">{i + 1}.</span>
                    <p dangerouslySetInnerHTML={{ __html: step }}></p>
                  </div>
                ))}
              </div>

              {instruction.codeSnippet && (
                <div className="bg-[#1A1F35] rounded-md p-4 font-mono text-sm border border-[#2A3441] relative my-4">
                  <span className="absolute top-2 right-2 text-zinc-500 cursor-pointer hover:text-zinc-300">📋</span>
                  <p><span className="text-emerald-400">&lt;{instruction.codeSnippet.html1}&gt;</span><span className="text-white">{instruction.codeSnippet.css1}</span><span className="text-emerald-400">&lt;/{instruction.codeSnippet.html1}&gt;</span></p>
                  <p><span className="text-emerald-400">&lt;{instruction.codeSnippet.html2}&gt;</span><span className="text-white">{instruction.codeSnippet.css2}</span><span className="text-emerald-400">&lt;/{instruction.codeSnippet.html2}&gt;</span></p>
                </div>
              )}

              <p className="text-sm mt-4 text-[#A8B2D1]">And then press the "Run" button.</p>

              {instruction.closingLine && (
                <p className="text-sm font-bold text-yellow-400 mt-4">{instruction.closingLine}</p>
              )}

              {instruction.hint && (
                <details className="mt-8 bg-[#1A1F35] border border-[#2A3441] rounded-md group cursor-pointer">
                  <summary className="font-bold text-yellow-500 text-sm p-4 list-none flex items-center justify-between">
                    <span>💡 Need a Hint?</span>
                    <span className="text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-4 pb-4 border-t border-[#2A3441] mt-2 pt-4">
                    <p className="text-sm text-[#A8B2D1]">{instruction.hint}</p>
                  </div>
                </details>
              )}
            </div>
          </div>
        </aside>

        {/* ── MIDDLE: Editor ── */}
        <section className="flex-1 flex flex-col bg-[#011C3A] border-r-2 border-[#1E293B] overflow-hidden relative">
          {/* Tab bar */}
          <div className="flex items-center px-0 bg-[#0A0B1A]">
            {tabs.map(tab => {
              const isActive = activeTab === tab;
              return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-bold transition-colors ${
                  isActive
                    ? 'bg-[#011C3A] text-white border-t-2 border-orange-500'
                    : 'text-zinc-500 hover:text-zinc-300 border-t-2 border-transparent bg-[#0D1117]'
                }`}
              >
                {tab === 'html' && <span className="text-orange-500 bg-white rounded-sm px-1 text-xs">5</span>}
                {tab === 'css' && <span className="text-blue-500 bg-white rounded-sm px-1 text-xs">3</span>}
                {tab === 'js' && <span className="text-yellow-500 bg-white rounded-sm px-1 text-xs">JS</span>}
                {tab === 'html' ? 'star.html' : `style.${tab}`}
              </button>
            )})}
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 pt-2 pb-16 overflow-hidden">
            <Editor
              height="100%"
              language={TAB_LANGUAGE_MAP[activeTab]}
              value={files[activeTab]}
              theme="vs-dark"
              onMount={handleEditorMount}
              onChange={handleEditorChange}
              options={{
                fontSize: 14,
                fontFamily: '"Fira Code", "Cascadia Code", monospace',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                wordWrap: 'on',
                padding: { top: 16, bottom: 16 },
                automaticLayout: true,
                renderLineHighlight: 'none',
                hideCursorInOverviewRuler: true,
                overviewRulerBorder: false,
              }}
            />
          </div>

          {/* Bottom Toolbar inside Editor */}
          <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-center bg-gradient-to-t from-[#011C3A] to-transparent">
             <Button variant="outline" className="bg-[#0D1117] border-zinc-700 text-white hover:bg-zinc-800" size="icon" onClick={handleReset}>
                <RotateCcw size={16} />
             </Button>
             <div className="flex gap-3">
               <Button
                  onClick={handleRun}
                  className="font-bold text-sm bg-[#0D1117] hover:bg-zinc-800 text-white border border-zinc-700 flex items-center gap-2 px-6"
                >
                  <Play size={14} fill="currentColor" /> Run
                </Button>
                {onSubmit && (
                  <Button
                    onClick={handleSubmit}
                    className="font-bold text-sm bg-[#0EA5E9] hover:bg-blue-400 text-white px-6 border-b-4 border-blue-600 active:border-b-0 active:translate-y-1 transition-all"
                  >
                    Submit answer
                  </Button>
                )}
             </div>
          </div>
        </section>

        {/* ── RIGHT: Preview ── */}
        <aside className="w-[32%] min-w-[300px] flex flex-col bg-[#E9EEF5] overflow-hidden">
          {/* Top Bar */}
          <div className="px-4 py-2 bg-[#0A0B1A] flex items-center gap-3">
            <RotateCcw size={14} className="text-zinc-500 cursor-pointer" onClick={() => hasRun && setIframeKey(k => k+1)} />
            <div className="bg-[#181D31] text-zinc-300 text-xs px-4 py-1.5 rounded-full w-full max-w-[200px] flex items-center">
              index.html
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 w-full h-full relative flex items-center justify-center">
             {!hasRun ? (
               <div className="flex flex-col items-center text-[#64748B] text-center p-8 max-w-xs">
                  <TerminalSquare size={48} className="mb-4 text-[#94A3B8]" />
                  <p className="text-sm">
                    Your code results will appear here when you <strong>Run</strong> the project.
                  </p>
               </div>
             ) : (
               <iframe
                 key={iframeKey}
                 ref={iframeRef}
                 srcDoc={srcdoc}
                 sandbox="allow-scripts"
                 className="w-full h-full bg-white border-none"
                 title="Code Preview"
               />
             )}
          </div>
        </aside>
      </div>

      {/* ── COMPLETION BANNER ── */}
      {showBanner && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-yellow-400 text-black font-game text-2xl px-8 py-4 border-4 border-b-8 border-yellow-600 rounded-xl shadow-[0_10px_0_0_rgba(0,0,0,0.5)] animate-bounce">
          <Trophy size={32} className="text-orange-600 animate-pulse" />
          <div className="flex flex-col">
            <span>+{xpPerExercise} XP EARNED!</span>
            <span className="text-sm text-yellow-800 tracking-widest uppercase">Exercise {doneCount} Complete!</span>
          </div>
        </div>
      )}

      {/* ── GLOBAL FOOTER ── */}
      <footer className="h-16 bg-[#06080F] border-t border-[#1E293B] flex items-center justify-between px-6">
        {/* left group */}
        <div className="flex items-center gap-4">
          <button className="bg-[#181D31] p-2 rounded-md border border-[#2A3441] hover:bg-[#2A3441] transition-colors">
            <List size={20} className="text-zinc-300" />
          </button>
          <div className="flex flex-col">
             <h3 className="text-sm font-bold text-white leading-tight">{instruction.mainHeading || "Exercise"}</h3>
             <div className="flex items-center gap-2">
               <span className="text-xs text-zinc-500">
                 Exercise {exerciseNumber} / {totalExercises}
               </span>
               <span className="text-[10px] font-bold bg-emerald-900/60 text-emerald-400 px-2 py-0.5 rounded-full">
                 {totalXp} XP
               </span>
             </div>
          </div>
        </div>

        {/* center group – Complete button */}
        {!completed && (
          <button
            onClick={handleComplete}
            disabled={completed}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-sm transition-all ${
              completed
                ? 'bg-emerald-800/40 text-emerald-500 border border-emerald-800 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-400 text-white border-b-4 border-emerald-700 active:border-b-0 active:translate-y-0.5'
            }`}
          >
            <CheckCircle2 size={16} />
            {completed ? 'Completed ✓' : 'Complete'}
          </button>
        )}

        {/* right group */}
        <div className="flex items-center gap-3">
           {prevHref ? (
             <Link href={prevHref}>
               <Button variant="outline" className="bg-transparent border-[#2A3441] text-white hover:bg-[#181D31] hover:text-white font-game text-xl px-8 border-b-4 active:border-b-0 active:translate-y-0.5">
                 Back
               </Button>
             </Link>
           ) : (
             <Button disabled variant="outline" className="bg-transparent border-[#2A3441] text-zinc-500 font-game text-xl px-8 opacity-50">
               Back
             </Button>
           )}

           {nextHref ? (
             <Link href={nextHref}>
               <Button variant="outline" className="bg-transparent border-[#2A3441] text-white hover:bg-[#181D31] hover:text-white font-game text-xl px-8 border-b-4 active:border-b-0 active:translate-y-0.5">
                 Next
               </Button>
             </Link>
           ) : (
             <Button disabled variant="outline" className="bg-transparent border-[#2A3441] text-zinc-500 font-game text-xl px-8 opacity-50">
               Next
             </Button>
           )}
        </div>
      </footer>
    </div>
  )
}

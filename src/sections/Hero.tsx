import { useState, useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import starImg from '../assets/Star_opt.webp'
import boltImg from '../assets/Bolt_opt.webp'

const ROLES = [
  ['Website', 'Developer'],
  ['CA', 'Aspirant'],
  ['App', 'Developer'],
  ['Aspiring', 'AI/ML Engineer'],
  ['Aspiring', 'Data Scientist'],
]

const TYPING_SPEED = 175
const DELETE_SPEED  = 45
const PAUSE_AFTER   = 2000
const PAUSE_BEFORE  = 400

export function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const [display, setDisplay] = useState({ line1: '', line2: '', showCursor: true, cursorOnLine1: true })
  const visibleDisplay = shouldReduceMotion
    ? { line1: ROLES[0][0], line2: ROLES[0][1], showCursor: false, cursorOnLine1: false }
    : display

  const stateRef = useRef({
    roleIndex: 0,
    charCount: 0,
    phase: 'typing' as 'typing' | 'pausing' | 'deleting' | 'switching',
  })

  useEffect(() => {
    if (shouldReduceMotion) {
      return
    }

    let id: ReturnType<typeof setTimeout>

    const tick = () => {
      const s = stateRef.current
      const role = ROLES[s.roleIndex]
      const line1Full = role[0]
      const line2Full = role[1]
      const totalChars = line1Full.length + line2Full.length

      if (s.phase === 'typing') {
        s.charCount++
        const c = s.charCount
        const l1 = c <= line1Full.length ? line1Full.slice(0, c) : line1Full
        const l2 = c > line1Full.length ? line2Full.slice(0, c - line1Full.length) : ''
        setDisplay({ line1: l1, line2: l2, showCursor: true, cursorOnLine1: c <= line1Full.length })

        if (s.charCount < totalChars) {
          id = setTimeout(tick, TYPING_SPEED)
        } else {
          s.phase = 'pausing'
          id = setTimeout(tick, PAUSE_AFTER)
        }

      } else if (s.phase === 'pausing') {
        s.phase = 'deleting'
        id = setTimeout(tick, DELETE_SPEED)

      } else if (s.phase === 'deleting') {
        s.charCount--
        const c = s.charCount
        const l1 = c <= line1Full.length ? line1Full.slice(0, c) : line1Full
        const l2 = c > line1Full.length ? line2Full.slice(0, c - line1Full.length) : ''
        setDisplay({ line1: l1, line2: l2, showCursor: true, cursorOnLine1: c <= line1Full.length })

        if (s.charCount > 0) {
          id = setTimeout(tick, DELETE_SPEED)
        } else {
          s.phase = 'switching'
          id = setTimeout(tick, PAUSE_BEFORE)
        }

      } else if (s.phase === 'switching') {
        s.roleIndex = (s.roleIndex + 1) % ROLES.length
        s.charCount = 0
        s.phase = 'typing'
        id = setTimeout(tick, TYPING_SPEED)
      }
    }

    id = setTimeout(tick, TYPING_SPEED)
    return () => clearTimeout(id)
  }, [shouldReduceMotion])

  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-[92svh] sm:min-h-[100svh] md:min-h-[100dvh] w-full flex-col pt-8 pb-6 sm:py-10 px-4 min-[360px]:px-6 sm:px-10 select-none overflow-hidden bg-paper dark:bg-[#111111]">
      {/* Top Spacer for floating navbar */}
      <div className="h-14 sm:h-16 shrink-0" />

      {/* Main Content Wrapper */}
      <div className="relative w-full max-w-5xl mx-auto flex flex-col justify-between flex-grow overflow-visible">
        {/* Middle Display Heading */}
        <div className="relative w-full flex flex-col items-center justify-start md:justify-center pt-4 min-[375px]:pt-6 md:pt-0 md:flex-grow">
          <h1 id="hero-title" className="relative flex flex-col items-center justify-center font-display text-center select-none max-w-5xl leading-none w-full">
            {/* Left Spark */}
            <div className="absolute left-2 sm:left-[-30px] md:left-[-74px] -top-8 sm:-top-16 md:-top-10 z-10 pointer-events-none">
              <img
                src={starImg}
                alt=""
                aria-hidden="true"
                loading="eager"
                fetchPriority="high"
                width={160}
                height={160}
                className="w-[30px] h-[30px] min-[375px]:w-[42px] min-[375px]:h-[42px] sm:w-[90px] sm:h-[90px] md:w-[140px] md:h-[140px] object-contain no-outline"
              />
            </div>

            {/* Right Spark */}
            <div className="absolute right-2 sm:right-[-30px] md:right-[-74px] -bottom-7 sm:-bottom-16 md:-bottom-10 z-10 pointer-events-none">
              <img
                src={boltImg}
                alt=""
                aria-hidden="true"
                loading="eager"
                fetchPriority="high"
                width={180}
                height={180}
                className="w-[38px] h-[38px] min-[375px]:w-[52px] min-[375px]:h-[52px] sm:w-[100px] sm:h-[100px] md:w-[160px] md:h-[160px] object-contain no-outline"
              />
            </div>

            {/* Line 1 */}
            <span className="text-[2.45rem] min-[360px]:text-[2.9rem] sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-normal text-offblack dark:text-zinc-100 uppercase whitespace-nowrap block min-h-[1.1em]">
              {visibleDisplay.line1 || '​'}
              {visibleDisplay.showCursor && visibleDisplay.cursorOnLine1 && (
                <span className="typewriter-cursor bg-offblack dark:bg-zinc-100" style={{ height: '0.75em', width: '2px' }} />
              )}
            </span>

            {/* Line 2 */}
            <span className="text-[1.9rem] min-[360px]:text-[2.18rem] sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-normal text-offblack dark:text-zinc-100 uppercase whitespace-nowrap block mt-1.5 sm:mt-2 min-h-[1.1em]">
              {visibleDisplay.line2 || '​'}
              {visibleDisplay.showCursor && !visibleDisplay.cursorOnLine1 && (
                <span className="typewriter-cursor bg-offblack dark:bg-zinc-100" style={{ height: '0.75em', width: '2px' }} />
              )}
            </span>
          </h1>
        </div>

        {/* Mobile Avatar Placeholder */}
        <div className="flex sm:hidden justify-center items-center my-auto py-1 min-[375px]:py-2 overflow-visible">
          <div
            id="avatar-placeholder-mobile"
            className="w-[112px] h-[140px] min-[375px]:w-[132px] min-[375px]:h-[166px] shrink-0"
          />
        </div>

        {/* Bottom Layout Row */}
        <div className="flex flex-row items-baseline justify-between w-full pb-1 sm:pb-0 mt-auto">
          <span className="text-3xl sm:text-4xl font-extrabold text-offblack dark:text-zinc-100 tracking-normal font-sans select-none shrink-0 leading-none">
            &copy;2026
          </span>
          <div
            id="avatar-placeholder-desktop"
            className="hidden sm:block sm:w-[156px] sm:h-[195px] md:w-[208px] md:h-[247px] shrink-0"
          />
          <span className="max-w-[13ch] sm:max-w-none text-[9px] sm:text-[11px] font-bold text-zinc-600 dark:text-zinc-400 tracking-normal select-none shrink-0 text-right uppercase leading-tight sm:leading-none font-sans">
            /CREATING SINCE 2020
          </span>
        </div>
      </div>
    </section>
  )
}

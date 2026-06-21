import { useState, useEffect, useRef } from 'react'
import starImg from '../assets/Star.png'
import boltImg from '../assets/Bolt.png'

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
  const [display, setDisplay] = useState({ line1: '', line2: '', showCursor: true, cursorOnLine1: true })

  const stateRef = useRef({
    roleIndex: 0,
    charCount: 0,
    phase: 'typing' as 'typing' | 'pausing' | 'deleting' | 'switching',
  })

  useEffect(() => {
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
  }, [])

  return (
    <section className="relative flex flex-col justify-between h-[100dvh] min-h-[100dvh] w-full py-10 px-6 sm:px-10 select-none overflow-visible bg-paper dark:bg-[#111111]">
      {/* Top Spacer for floating navbar */}
      <div className="h-16 shrink-0" />

      {/* Middle Display Heading */}
      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
        {/* Left Spark */}
        <div className="absolute left-[2%] sm:left-[0%] md:left-[-6%] top-[-15%] sm:top-[-8%] md:top-[-6%] z-10 pointer-events-none">
          <img
            src={starImg}
            alt="Star"
            className="w-[45px] h-[45px] min-[375px]:w-[65px] min-[375px]:h-[65px] sm:w-[110px] sm:h-[110px] md:w-[140px] md:h-[140px] object-contain no-outline"
          />
        </div>

        {/* Right Spark */}
        <div className="absolute right-[2%] sm:right-[0%] md:right-[-6%] bottom-[5%] sm:bottom-[12%] md:bottom-[14%] z-10 pointer-events-none">
          <img
            src={boltImg}
            alt="Lightning Bolt"
            className="w-[55px] h-[55px] min-[375px]:w-[75px] min-[375px]:h-[75px] sm:w-[125px] sm:h-[125px] md:w-[160px] md:h-[160px] object-contain no-outline"
          />
        </div>

        <h1 className="flex flex-col items-center justify-center font-display text-center select-none max-w-5xl leading-none">
          {/* Line 1 */}
          <span className="text-[6.5vw] min-[375px]:text-[7vw] sm:text-[8vw] font-extrabold tracking-[-0.03em] text-offblack dark:text-zinc-100 uppercase whitespace-nowrap block min-h-[1.1em]">
            {display.line1 || '​'}
            {display.cursorOnLine1 && (
              <span className="typewriter-cursor bg-offblack dark:bg-zinc-100" style={{ height: '0.75em', width: '2px' }} />
            )}
          </span>

          {/* Line 2 */}
          <span className="text-[4.5vw] min-[375px]:text-[5vw] sm:text-[5.5vw] font-extrabold tracking-[-0.03em] text-offblack dark:text-zinc-100 uppercase whitespace-nowrap block mt-2 min-h-[1.1em]">
            {display.line2 || '​'}
            {!display.cursorOnLine1 && (
              <span className="typewriter-cursor bg-offblack dark:bg-zinc-100" style={{ height: '0.75em', width: '2px' }} />
            )}
          </span>
        </h1>
      </div>

      {/* Bottom Layout Row */}
      <div className="flex flex-row items-baseline justify-between w-full pb-4 sm:pb-0">
        <span className="text-3xl sm:text-4xl font-extrabold text-offblack dark:text-zinc-100 tracking-tight font-sans select-none shrink-0 leading-none">
          &copy;2026
        </span>
        <div className="w-auto flex-grow h-0 sm:w-[140px] sm:h-[175px] shrink-0" />
        <span className="text-[9px] sm:text-[11px] font-bold text-zinc-500 tracking-widest select-none shrink-0 text-right uppercase leading-none font-sans">
          /CREATING SINCE 2020
        </span>
      </div>
    </section>
  )
}

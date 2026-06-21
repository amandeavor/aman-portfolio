import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import avatarImg from '../assets/avatar.jpeg'

const LINES = [
  ['From', 'idea', 'to', 'launch.', 'Clean,', 'scalable', 'digital', 'products'],
  ['built', 'to', 'move', 'fast,', 'stay', 'simple,', 'and', 'perform', 'in'],
  ['real-world', 'use,', 'driven', 'by', 'clarity,', 'structured', 'systems,'],
  ['and', 'intentional', 'design.'],
]

// Flatten once to know the total words count
const TOTAL_WORDS = LINES.flat().length

function AnimatedWord({
  word,
  index,
  total,
  scrollY,
  scrollRange,
  isDark,
}: {
  word: string
  index: number
  total: number
  scrollY: ReturnType<typeof useScroll>['scrollY']
  scrollRange: [number, number]
  isDark: boolean
}) {
  const [rangeStart, rangeEnd] = scrollRange
  const activeDistance = rangeEnd - rangeStart

  // Animation spans the first 50% of the active pin distance
  const animationEndDistance = activeDistance * 0.5

  const wordStart = rangeStart + (index / total) * animationEndDistance
  const wordEnd = rangeStart + ((index + 3.5) / total) * animationEndDistance

  // Muted gray to off-black, slight upward slide, and opacity fade with strict clamping
  const color = useTransform(scrollY, [wordStart, wordEnd], ['#52525b', '#121212'], { clamp: true })
  const colorDark = useTransform(scrollY, [wordStart, wordEnd], ['#52525b', '#e4e4e7'], { clamp: true })
  const y = useTransform(scrollY, [wordStart, wordEnd], ['6px', '0px'], { clamp: true })
  const opacity = useTransform(scrollY, [wordStart, wordEnd], [0.45, 1], { clamp: true })

  return (
    <motion.span
      style={{ color: isDark ? colorDark : color, y, opacity }}
      className="inline-block mr-[0.25em] origin-bottom"
    >
      {word}
    </motion.span>
  )
}

export function About() {
  const { scrollY } = useScroll()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const smoothScroll = useSpring(scrollY, { stiffness: 200, damping: 30, mass: 0.5 })

  const y = useTransform(smoothScroll, [0, 900], ['-80vh', '0vh'])
  const scale = useTransform(smoothScroll, [0, 900], [0.65, 1])
  const rotateY = useTransform(smoothScroll, [0, 900], [0, 180])
  const scaleX = useTransform(smoothScroll, [449, 451], [1, -1])
  const bgColor = useTransform(smoothScroll, [448, 452], ['#27272a', '#991b1b'])
  const filter = useTransform(smoothScroll, [448, 452], ['grayscale(100%)', 'grayscale(0%)'])

  return (
    <section id="about" className="py-24 pt-96 bg-paper dark:bg-[#111111] px-6 select-none text-left overflow-visible">
      <div className="mx-auto max-w-5xl flex flex-col items-center">

        {/* Hey! Section with 3-Column Layout */}
        <div className="w-full flex flex-col items-start mb-24 overflow-visible">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center w-full overflow-visible">

            {/* Left Column */}
            <div className="md:col-span-4 flex flex-col items-start h-full justify-between py-2">
              <div>
                <h2 className="text-7xl md:text-8xl font-semibold tracking-tight text-offblack dark:text-zinc-100 mb-12 font-display">
                  Hey!
                </h2>
                <p className="text-offblack dark:text-zinc-300 text-base font-bold leading-snug max-w-[20ch]">
                  I'm Aman, a builder based in India, currently working on building high-performance React component libraries, AI tools, and developer utilities.
                </p>
              </div>
            </div>

            {/* Center Column (Animated Portrait Avatar Card) */}
            <div className="md:col-span-4 flex justify-center py-4 overflow-visible" style={{ perspective: '1200px' }}>
              <motion.div
                style={isMobile ? {} : { y, scale, rotateY, filter }}
                className="w-[280px] h-[340px] sm:w-[300px] sm:h-[360px] md:w-[320px] md:h-[380px] rounded-[24px] shadow-xl relative shrink-0 z-30 [transform-style:preserve-3d]"
              >
                <motion.div
                  style={isMobile ? { backgroundColor: '#991b1b' } : { backgroundColor: bgColor, scaleX }}
                  className="absolute inset-0 rounded-[24px] overflow-hidden border border-red-800"
                >
                  <img
                    src={avatarImg}
                    alt="Aman"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="md:col-span-4 flex flex-col items-start gap-4 h-full justify-center py-2">
              <p className="text-offblack dark:text-zinc-300 text-sm leading-relaxed max-w-[30ch]">
                I'm a software engineer and open-source creator with a strong focus on building developer tools, CLI utilities, and component design systems.
              </p>
              <p className="text-offblack dark:text-zinc-300 text-sm leading-relaxed max-w-[30ch] mb-3">
                Over the years, I've designed and shipped open-source libraries like ObsidianKit, productivity apps like Momentum, and AI-driven command-line interfaces.
              </p>
              <a href="#contact" className="flex items-center gap-2 text-sm font-medium text-offblack dark:text-zinc-200 hover:opacity-60 transition-opacity">
                Get Started
                <span className="w-7 h-7 rounded-full border border-zinc-300 dark:border-zinc-600 flex items-center justify-center">
                  <ArrowUpRight size={13} weight="bold" />
                </span>
              </a>
            </div>

          </div>
        </div>

        {/* Tagline Section - pinned scroll reveal */}
      </div>
    </section>
  )
}

export function AboutTagline({ dark }: { dark: boolean }) {
  const taglineRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const [scrollRange, setScrollRange] = useState<[number, number]>([0, 1000])

  useEffect(() => {
    const calculateRange = () => {
      if (!taglineRef.current) return
      const rect = taglineRef.current.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const top = rect.top + scrollTop
      const height = rect.height
      const viewportHeight = window.innerHeight
      setScrollRange([top, top + height - viewportHeight])
    }

    calculateRange()
    const timer = setTimeout(calculateRange, 100)

    window.addEventListener('resize', calculateRange)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', calculateRange)
    }
  }, [])

  let globalWordIndex = 0

  return (
    <div ref={taglineRef} className="w-full bg-paper dark:bg-[#111111]" style={{ height: '180vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <p className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug text-center mx-auto font-display px-6 max-w-4xl">
          {LINES.map((line, lineIdx) => {
            const lineJSX = (
              <span key={lineIdx} className="block md:whitespace-nowrap">
                {line.map((word) => {
                  const currentIdx = globalWordIndex
                  globalWordIndex++
                  return (
                    <AnimatedWord
                      key={currentIdx}
                      word={word}
                      index={currentIdx}
                      total={TOTAL_WORDS}
                      scrollY={scrollY}
                      scrollRange={scrollRange}
                      isDark={dark}
                    />
                  )
                })}
              </span>
            )
            return lineJSX
          })}
        </p>
      </div>
    </div>
  )
}

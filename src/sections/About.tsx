import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import avatarImg from '../assets/avatar_opt.webp'

const LINES = [
  ['From', 'idea', 'to', 'launch.', 'Clean,', 'scalable', 'digital', 'products'],
  ['built', 'to', 'move', 'fast,', 'stay', 'simple,', 'and', 'perform', 'in'],
  ['real-world', 'use,', 'driven', 'by', 'clarity,', 'structured', 'systems,'],
  ['and', 'intentional', 'design.'],
]

// Flatten once to know the total words count
const TOTAL_WORDS = LINES.flat().length

const getIsMobileViewport = () => (
  typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
)

const getAvatarFallbackOffset = () => ({
  x: 0,
  y: typeof window !== 'undefined'
    ? -(window.innerHeight * (window.matchMedia('(max-width: 639px)').matches ? 0.98 : 0.8))
    : -800,
})

function AnimatedWord({
  word,
  index,
  total,
  progress,
  isDark,
  isMobile,
}: {
  word: string
  index: number
  total: number
  progress: MotionValue<number>
  isDark: boolean
  isMobile: boolean
}) {
  // Animation spans the first 90% of the active pin distance on mobile, 50% on desktop
  const animationEndProgress = isMobile ? 0.9 : 0.5

  const wordStart = (index / total) * animationEndProgress
  const wordEnd = ((index + 3.5) / total) * animationEndProgress

  // Muted gray to off-black, slight upward slide, and opacity fade with strict clamping
  const color = useTransform(progress, [wordStart, wordEnd], ['#52525b', '#121212'], { clamp: true })
  const colorDark = useTransform(progress, [wordStart, wordEnd], ['#a1a1aa', '#e4e4e7'], { clamp: true })
  const y = useTransform(progress, [wordStart, wordEnd], ['6px', '0px'], { clamp: true })
  const opacity = useTransform(progress, [wordStart, wordEnd], [0.72, 1], { clamp: true })

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
  const [isMobile, setIsMobile] = useState(getIsMobileViewport)
  const { scrollY } = useScroll()

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const checkMobile = () => setIsMobile(media.matches)
    checkMobile()
    media.addEventListener('change', checkMobile)
    return () => media.removeEventListener('change', checkMobile)
  }, [])

  const smoothScroll = useSpring(scrollY, { stiffness: 200, damping: 30, mass: 0.5 })

  // Dynamic coordinates calculation for the Avatar's landing page visual slot
  const [offsets, setOffsets] = useState(getAvatarFallbackOffset)

  useLayoutEffect(() => {
    let frameId = 0

    const measureOffset = () => {
      const isMobileBreakpoint = window.innerWidth < 640
      const placeholderId = isMobileBreakpoint ? 'avatar-placeholder-mobile' : 'avatar-placeholder-desktop'
      const placeholder = document.getElementById(placeholderId)
      const container = document.getElementById('avatar-container')

      if (placeholder && container) {
        const placeholderRect = placeholder.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()

        const pY = placeholderRect.top + window.scrollY + placeholderRect.height / 2
        const cY = containerRect.top + window.scrollY + containerRect.height / 2
        const pX = placeholderRect.left + window.scrollX + placeholderRect.width / 2
        const cX = containerRect.left + window.scrollX + containerRect.width / 2

        const nextOffsets = {
          x: pX - cX,
          y: pY - cY
        }

        setOffsets((previous) => {
          const roundedPrevious = {
            x: Math.round(previous.x),
            y: Math.round(previous.y),
          }
          const roundedNext = {
            x: Math.round(nextOffsets.x),
            y: Math.round(nextOffsets.y),
          }

          return roundedPrevious.x === roundedNext.x && roundedPrevious.y === roundedNext.y
            ? previous
            : nextOffsets
        })
      } else {
        setOffsets(getAvatarFallbackOffset())
      }
    }

    const calculateOffset = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(measureOffset)
    }

    measureOffset()

    const observer = new ResizeObserver(calculateOffset)
    observer.observe(document.body)
    ;['avatar-placeholder-mobile', 'avatar-placeholder-desktop', 'avatar-container'].forEach((id) => {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    })

    document.fonts?.ready.then(calculateOffset).catch(() => {})

    window.addEventListener('resize', calculateOffset, { passive: true })
    window.addEventListener('load', calculateOffset, { passive: true })
    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
      window.removeEventListener('resize', calculateOffset)
      window.removeEventListener('load', calculateOffset)
    }
  }, [])

  const targetScroll = isMobile ? 700 : 900

  // Stable MotionValue references with dynamic functional mapping to prevent detaching
  const x = useTransform(smoothScroll, (latest) => {
    const pct = Math.min(1, Math.max(0, latest / targetScroll))
    return (1 - pct) * offsets.x
  })
  const y = useTransform(smoothScroll, (latest) => {
    const pct = Math.min(1, Math.max(0, latest / targetScroll))
    return (1 - pct) * offsets.y
  })
  const scale = useTransform(smoothScroll, (latest) => {
    const pct = Math.min(1, Math.max(0, latest / targetScroll))
    return 0.65 + pct * 0.35
  })
  const rotateY = useTransform(smoothScroll, (latest) => {
    const pct = Math.min(1, Math.max(0, latest / targetScroll))
    return pct * 180
  })

  const scaleX = useTransform(smoothScroll, isMobile ? [349, 351] : [449, 451], [1, -1])
  const bgColor = useTransform(smoothScroll, isMobile ? [348, 352] : [448, 452], ['#27272a', '#991b1b'])
  const filter = useTransform(smoothScroll, isMobile ? [348, 352] : [448, 452], ['grayscale(100%)', 'grayscale(0%)'])

  return (
    <section id="about" aria-labelledby="about-title" className="pt-16 pb-6 md:pt-96 md:pb-12 bg-paper dark:bg-[#111111] px-4 min-[360px]:px-6 select-none text-left overflow-visible">
      <div className="mx-auto max-w-5xl flex flex-col items-center">

        {/* Hey! Section with 3-Column Layout */}
        <div className="w-full flex flex-col items-start mb-8 md:mb-12 overflow-visible">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center w-full overflow-visible">

            {/* Left Column */}
            <div className="md:col-span-4 flex flex-col items-start h-full justify-between py-2">
              <div>
                <h2 id="about-title" className="text-7xl md:text-8xl font-semibold tracking-normal text-offblack dark:text-zinc-100 mb-6 md:mb-12 font-display">
                  Hey!
                </h2>
                <p className="text-offblack dark:text-zinc-300 text-base font-bold leading-[1.55] max-w-[24ch]">
                  I'm Aman, a builder based in India, currently working on building high-performance React component libraries, AI tools, and developer utilities.
                </p>
              </div>
            </div>

            {/* Center Column (Animated Portrait Avatar Card) */}
            <div id="avatar-container" className="md:col-span-4 flex justify-center py-2 md:py-4 overflow-visible" style={{ perspective: '1200px' }}>
              <motion.div
                style={{ x, y, scale, rotateY, filter, willChange: 'transform, filter' }}
                className="w-[180px] h-[225px] min-[375px]:w-[210px] min-[375px]:h-[265px] sm:w-[240px] sm:h-[300px] md:w-[320px] md:h-[380px] rounded-[20px] md:rounded-[24px] shadow-xl relative shrink-0 z-30 [transform-style:preserve-3d]"
              >
                <motion.div
                  style={{ backgroundColor: bgColor, scaleX, willChange: 'transform, background-color' }}
                  className="absolute inset-0 rounded-[inherit] overflow-hidden border border-red-800"
                >
                  <img
                    src={avatarImg}
                    alt="Aman"
                    loading="eager"
                    fetchPriority="high"
                    width={640}
                    height={760}
                    className="w-full h-full object-cover no-outline"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="md:col-span-4 flex flex-col items-start gap-4 h-full justify-center py-2">
              <p className="text-offblack dark:text-zinc-300 text-sm leading-[1.65] max-w-[34ch]">
                I'm a software engineer and open-source creator with a strong focus on building developer tools, CLI utilities, and component design systems.
              </p>
              <p className="text-offblack dark:text-zinc-300 text-sm leading-[1.65] max-w-[34ch] mb-3">
                Over the years, I've designed and shipped open-source libraries like ObsidianKit, productivity apps like Momentum, and AI-driven command-line interfaces.
              </p>
              <a href="#contact" className="inline-flex min-h-11 items-center gap-2 rounded-full pr-1 text-sm font-medium text-offblack dark:text-zinc-200 hover:opacity-70 transition-opacity">
                Get Started
                <span className="w-7 h-7 rounded-full border border-zinc-300 dark:border-zinc-600 flex items-center justify-center">
                  <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
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
  const taglineRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: taglineRef,
    offset: ["start start", "end end"],
  })
  const [isMobile, setIsMobile] = useState(getIsMobileViewport)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const checkMobile = () => setIsMobile(media.matches)
    checkMobile()
    media.addEventListener('change', checkMobile)
    return () => media.removeEventListener('change', checkMobile)
  }, [])

  let globalWordIndex = 0

  return (
    <section ref={taglineRef} aria-label="Product philosophy" className="w-full bg-paper dark:bg-[#111111]" style={{ height: isMobile ? '150vh' : '180vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <p className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-[1.25] md:leading-[1.32] text-center mx-auto font-display px-4 min-[360px]:px-6 max-w-[70ch]">
          {LINES.map((line, lineIdx) => {
            const lineJSX = (
              <span key={lineIdx} className="block">
                {line.map((word) => {
                  const currentIdx = globalWordIndex
                  globalWordIndex++
                  return (
                    <AnimatedWord
                      key={currentIdx}
                      word={word}
                      index={currentIdx}
                      total={TOTAL_WORDS}
                      progress={scrollYProgress}
                      isDark={dark}
                      isMobile={isMobile}
                    />
                  )
                })}
              </span>
            )
            return lineJSX
          })}
        </p>
      </div>
    </section>
  )
}

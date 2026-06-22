import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

const TESTIMONIALS = [
  {
    quote: "Templyo completely changed how I approach building sites in Framer. The templates are not just beautiful, they're actually structured in a way that makes scaling so much easier.",
    name: 'Yakoub Kashmiri',
    role: 'Marketing Director',
    avatar: 'https://picsum.photos/seed/aman-t1/100/100',
  },
  {
    quote: "I've tried dozens of Framer templates, but Templyo stands out. Everything feels intentional, from the layout to the smallest interactions.",
    name: 'Daniel K.',
    role: 'Indie Maker',
    avatar: 'https://picsum.photos/seed/aman-t2/100/100',
  },
  {
    quote: "Templyo saved me weeks of work. I was able to launch my landing page in a day, and it still looks fully custom.",
    name: 'Mark M.',
    role: 'Startup Founder',
    avatar: 'https://picsum.photos/seed/aman-t3/100/100',
  },
  {
    quote: "The quality is insane. Clean structure, smooth animations, and super easy to customize. It feels like a premium product from start to finish.",
    name: 'Omar H.',
    role: 'Frontend Developer',
    avatar: 'https://picsum.photos/seed/aman-t4/100/100',
  },
]

const TESTIMONIAL_TRACK_WIDTH = TESTIMONIALS.length * 270 + (TESTIMONIALS.length - 1) * 16

export function Testimonials() {
  const [viewportWidth, setViewportWidth] = useState(() => (
    typeof window !== 'undefined' ? window.innerWidth : 375
  ))

  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false
  })

  useEffect(() => {
    let frameId = 0
    const checkViewport = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        setViewportWidth(window.innerWidth)
        setIsMobile(window.innerWidth < 768)
      })
    }
    checkViewport()
    window.addEventListener('resize', checkViewport, { passive: true })
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', checkViewport)
    }
  }, [])

  const dragLeftLimit = isMobile ? Math.min(0, -(TESTIMONIAL_TRACK_WIDTH - viewportWidth + 48)) : 0

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="py-6 md:py-24 bg-paper dark:bg-[#111111] px-4 min-[360px]:px-6 select-none">
      <div className="mx-auto max-w-6xl text-left">
        <h2 id="testimonials-title" className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-normal text-offblack dark:text-zinc-100 mb-16 font-display">
          Testimonials
        </h2>

        {/* Outer constraints container (clipping mask) with vertical padding/margins to prevent 3D clipping */}
        <div className="w-full overflow-hidden py-8 -my-8 cursor-grab active:cursor-grabbing">
          {/* Draggable inner track */}
          <motion.div
            drag={isMobile ? "x" : false}
            dragConstraints={{ left: dragLeftLimit, right: 0 }}
            dragDirectionLock
            dragElastic={0.15}
            className="flex flex-row md:grid md:grid-cols-2 lg:grid lg:grid-cols-4 gap-4 w-max md:w-full py-4 pb-8 md:pb-4 will-change-transform [touch-action:pan-y]"
          >
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="w-[270px] md:w-full shrink-0 snap-center h-[210px] sm:h-[310px] lg:h-[300px]"
                style={isMobile ? undefined : { perspective: '1200px' }}
              >
                <motion.div
                  initial={isMobile ? { opacity: 0, y: 18 } : { rotateY: 180, opacity: 0, y: 15 }}
                  whileInView={isMobile ? { opacity: 1, y: 0 } : { rotateY: 0, opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{
                    type: isMobile ? 'tween' : 'spring',
                    stiffness: isMobile ? undefined : 55,
                    damping: isMobile ? undefined : 18,
                    mass: 0.95,
                    delay: idx * 0.08,
                    duration: isMobile ? 0.45 : undefined,
                    ease: isMobile ? [0.16, 1, 0.3, 1] : undefined,
                  }}
                  style={isMobile ? { willChange: 'transform' } : { transformStyle: 'preserve-3d', willChange: 'transform' }}
                  className="relative w-full h-full cursor-pointer"
                >
                  {/* BACK FACE: Completely black card */}
                  {!isMobile && (
                    <div
                      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      className="absolute inset-0 bg-[#0c0c0e] rounded-[16px] md:rounded-[24px] border border-zinc-800/80 flex items-center justify-center shadow-md"
                    >
                      {/* Subtle decorative element in the center of the back */}
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                    </div>
                  )}

                  {/* FRONT FACE: Review & Author info */}
                  <div
                    style={isMobile ? undefined : { backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    className="absolute inset-0 bg-[#0c0c0e] text-zinc-100 p-4 md:p-6 rounded-[16px] md:rounded-[24px] flex flex-col justify-between gap-4 md:gap-6 shadow-md border border-zinc-800/80"
                  >
                    {/* Faint quotation watermark in the corner */}
                    <span className="absolute top-3 right-6 text-4xl font-serif font-black text-zinc-800/30 select-none pointer-events-none">
                      &ldquo;
                    </span>

                    <p className="relative z-10 text-xs md:text-[13px] font-medium leading-snug text-zinc-300">
                      {t.quote}
                    </p>

                    <div className="flex items-center gap-2.5 mt-auto relative z-10">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        loading="lazy"
                        decoding="async"
                        width={72}
                        height={72}
                        className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border border-zinc-800/80"
                      />
                      <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px] md:text-[11px] font-bold text-zinc-100 mb-0.5">{t.name}</span>
                        <span className="text-[10px] text-zinc-400 font-semibold">{t.role}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

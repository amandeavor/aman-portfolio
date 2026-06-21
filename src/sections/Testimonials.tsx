import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

export function Testimonials() {
  const testimonials = [
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

  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const totalWidth = 4 * 270 + 3 * 16 // 1128px
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 375
  const dragLeftLimit = Math.min(0, -(totalWidth - screenWidth + 48))

  return (
    <section id="testimonials" className="py-6 md:py-24 bg-paper dark:bg-[#111111] px-6 select-none">
      <div className="mx-auto max-w-6xl text-left">
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-offblack dark:text-zinc-100 mb-16 font-display">
          Testimonials
        </h2>

        {/* Outer constraints container (clipping mask) with vertical padding/margins to prevent 3D clipping */}
        <div className="w-full overflow-hidden py-8 -my-8 cursor-grab active:cursor-grabbing">
          {/* Draggable inner track */}
          <motion.div
            drag={isMobile ? "x" : false}
            dragConstraints={{ left: dragLeftLimit, right: 0 }}
            dragElastic={0.15}
            className="flex flex-row md:grid md:grid-cols-2 lg:grid lg:grid-cols-4 gap-4 w-max md:w-full py-4 pb-8 md:pb-4"
          >
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="w-[270px] md:w-full shrink-0 snap-center h-[210px] sm:h-[310px] lg:h-[300px]"
                style={{ perspective: '1200px' }}
              >
                <motion.div
                  initial={{ rotateY: isMobile ? 0 : 180, opacity: 0, y: 15 }}
                  whileInView={{ rotateY: 0, opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{
                    type: 'spring',
                    stiffness: 55,
                    damping: 18,
                    mass: 0.95,
                    delay: idx * 0.08,
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative w-full h-full cursor-pointer"
                >
                  {/* BACK FACE: Completely black card */}
                  <div
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    className="absolute inset-0 bg-[#0c0c0e] rounded-[16px] md:rounded-[24px] border border-zinc-800/80 flex items-center justify-center shadow-md"
                  >
                    {/* Subtle decorative element in the center of the back */}
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                  </div>

                  {/* FRONT FACE: Review & Author info */}
                  <div
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
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
                        className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border border-zinc-800/80"
                      />
                      <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px] md:text-[11px] font-bold text-zinc-100 mb-0.5">{t.name}</span>
                        <span className="text-[8px] md:text-[9px] text-zinc-500 font-semibold">{t.role}</span>
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

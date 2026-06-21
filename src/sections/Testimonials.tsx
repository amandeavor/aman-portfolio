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

  return (
    <section id="testimonials" className="py-24 bg-paper dark:bg-[#111111] px-6 select-none">
      <div className="mx-auto max-w-6xl text-left">
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-offblack dark:text-zinc-100 mb-16 font-display">
          Testimonials
        </h2>

        {/* 4-Column Row on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="w-full h-[290px] sm:h-[310px] lg:h-[300px]"
              style={{ perspective: '1200px' }}
            >
              <motion.div
                initial={{ rotateY: 180 }}
                whileInView={{ rotateY: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  type: 'spring',
                  stiffness: 45,
                  damping: 16,
                  mass: 1.1,
                  delay: idx * 0.12,
                }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative w-full h-full"
              >
                {/* BACK FACE: Completely black card */}
                <div
                  className="absolute inset-0 bg-[#1f1f1f] rounded-[24px] border border-zinc-800/60 flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-md"
                >
                  {/* Subtle decorative element in the center of the back */}
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                </div>

                {/* FRONT FACE: Review & Author info */}
                <div
                  className="absolute inset-0 bg-[#1f1f1f] text-zinc-100 p-6 rounded-[24px] flex flex-col justify-between gap-6 shadow-md border border-zinc-800/60 [backface-visibility:hidden]"
                >
                  <p className="text-[13px] font-medium leading-snug text-zinc-300">
                    {t.quote}
                  </p>

                  <div className="flex items-center gap-3 mt-auto">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-9 h-9 rounded-full object-cover border border-zinc-800"
                    />
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-[11px] font-bold text-zinc-100 mb-0.5">{t.name}</span>
                      <span className="text-[9px] text-zinc-500 font-semibold">{t.role}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

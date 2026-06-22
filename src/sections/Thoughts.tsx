import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { BLOG_POSTS_LIST } from '../data/blogs'

export function Thoughts() {
  const shouldReduceMotion = useReducedMotion()
  // Display the first 2 posts in the Featured section
  const posts = BLOG_POSTS_LIST.slice(0, 2)

  return (
    <section id="thoughts" aria-labelledby="thoughts-title" className="py-6 md:py-24 bg-paper dark:bg-[#111111] px-4 min-[360px]:px-6 select-none">
      <div className="mx-auto max-w-6xl text-left">
        {/* Title */}
        <h2 id="thoughts-title" className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-normal text-offblack dark:text-zinc-100 mb-16 font-display">
          Thoughts
        </h2>

        {/* Responsive editorial cards */}
        <div className="grid grid-cols-1 min-[520px]:grid-cols-3 gap-4">
          {posts.map((post, idx) => (
            <motion.a
              key={post.slug}
              href={`#/blog/${post.slug}`}
              initial={{ opacity: 0, y: 40, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.85, delay: idx * 0.05, ease: [0.215, 0.61, 0.355, 1] }}
              className="relative h-[280px] sm:h-[360px] md:h-[420px] w-full rounded-[16px] md:rounded-[24px] overflow-hidden border border-zinc-200/40 dark:border-zinc-800/40 shadow-md group cursor-pointer block hover:opacity-95 transition-opacity bg-zinc-100/50 dark:bg-zinc-900/50"
            >
              {/* Background Image */}
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                decoding="async"
                width={900}
                height={1200}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 will-change-transform"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

              {/* Text aligned at the bottom */}
              <div className="absolute inset-0 p-3 md:p-6 flex flex-col justify-end items-start text-white">
                <span className="text-[11px] min-[520px]:text-[10px] text-zinc-300 font-bold mb-1.5">{post.date}</span>
                <h3 className="text-lg min-[520px]:text-xs sm:text-lg md:text-xl font-bold tracking-normal leading-tight mb-2 font-display text-zinc-100">
                  {post.title}
                </h3>
                <p className="text-xs min-[520px]:text-[10px] md:text-[11px] text-zinc-300 leading-[1.55] max-w-[42ch]">
                  {post.desc}
                </p>
              </div>
            </motion.a>
          ))}

          {/* Card 3: Solid Dark Banner CTA Card */}
          <motion.a
            href="#/blog"
            initial={{ opacity: 0, y: 40, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
            whileHover={shouldReduceMotion ? undefined : { y: -3 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
            className="bg-[#0c0c0e] text-zinc-100 p-5 min-[520px]:p-3 md:p-6 rounded-[16px] md:rounded-[24px] border border-zinc-800/60 shadow-md flex flex-col justify-between h-[280px] sm:h-[360px] md:h-[420px] w-full group cursor-pointer hover:bg-[#111113] hover:border-zinc-700 focus-visible:border-zinc-500 transition-colors"
          >
            {/* Header Text */}
            <h3 className="text-2xl min-[520px]:text-sm sm:text-xl md:text-2xl font-bold tracking-normal leading-[1.08] font-display text-zinc-50 max-w-full mt-1 md:mt-4">
              Explore essays on engineering clarity and product craft
            </h3>

            {/* View All Work Button */}
            <div className="inline-flex min-h-11 items-center gap-2.5 text-xs min-[520px]:text-[10px] md:text-xs font-bold text-zinc-200 w-fit mb-1 md:mb-4">
              <motion.span
                animate={{ x: 0 }}
                whileHover={shouldReduceMotion ? undefined : { x: 2 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative transition-transform duration-300 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-zinc-100 after:transition-transform after:duration-300 group-hover:translate-x-0.5 group-hover:after:scale-x-100"
              >
                View All Thoughts
              </motion.span>
              <motion.span
                whileHover={shouldReduceMotion ? undefined : { x: 3, y: -3, rotate: 8 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="w-7 h-7 min-[520px]:w-6 min-[520px]:h-6 md:w-[28px] md:h-[28px] rounded-lg border border-zinc-700 bg-zinc-950 flex items-center justify-center text-zinc-200 transition-[background-color,border-color,color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-[6deg] group-hover:bg-zinc-100 group-hover:text-[#0c0c0e] group-hover:border-zinc-100"
              >
                <ArrowUpRight className="w-3 h-3" weight="bold" aria-hidden="true" />
              </motion.span>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  )
}

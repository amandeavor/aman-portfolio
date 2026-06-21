import { motion } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { BLOG_POSTS_LIST } from '../data/blogs'

export function Thoughts() {
  // Display the first 2 posts in the Featured section
  const posts = BLOG_POSTS_LIST.slice(0, 2)

  return (
    <section id="thoughts" className="py-6 md:py-24 bg-paper dark:bg-[#111111] px-6 select-none">
      <div className="mx-auto max-w-6xl text-left">
        {/* Title */}
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-offblack dark:text-zinc-100 mb-16 font-display">
          Thoughts
        </h2>

        {/* 3-Column Grid on both Mobile and PC, no scroll */}
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {posts.map((post, idx) => (
            <motion.a
              key={post.slug}
              href={`#/blog/${post.slug}`}
              initial={{ opacity: 0, y: 12, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[240px] min-[375px]:h-[280px] sm:h-[360px] md:h-[420px] w-full rounded-[12px] md:rounded-[24px] overflow-hidden border border-zinc-200/40 dark:border-zinc-800/40 shadow-md group cursor-pointer block hover:opacity-95 transition-opacity bg-zinc-100/50 dark:bg-zinc-900/50"
            >
              {/* Background Image */}
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

              {/* Text aligned at the bottom */}
              <div className="absolute inset-0 p-3 md:p-6 flex flex-col justify-end items-start text-white">
                <span className="text-[7px] min-[375px]:text-[8px] sm:text-[10px] md:text-[10px] text-zinc-400 font-bold mb-0.5 md:mb-1.5">{post.date}</span>
                <h3 className="text-[10px] min-[375px]:text-xs sm:text-lg md:text-xl font-bold tracking-tight leading-tight mb-1 md:mb-2 font-display text-zinc-100">
                  {post.title}
                </h3>
                <p className="text-[7px] min-[375px]:text-[8px] sm:text-[10px] md:text-[11px] text-zinc-400 leading-snug md:leading-normal max-w-full">
                  {post.desc}
                </p>
              </div>
            </motion.a>
          ))}

          {/* Card 3: Solid Dark Banner CTA Card */}
          <motion.a
            href="#/blog"
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#0c0c0e] text-zinc-100 p-3 md:p-6 rounded-[12px] md:rounded-[24px] border border-zinc-800/60 shadow-md flex flex-col justify-between h-[240px] min-[375px]:h-[280px] sm:h-[360px] md:h-[420px] w-full group cursor-pointer hover:opacity-95 transition-opacity"
          >
            {/* Header Text */}
            <h3 className="text-[11px] min-[375px]:text-sm sm:text-xl md:text-2xl font-bold tracking-tight leading-tight font-display text-zinc-50 max-w-full mt-1 md:mt-4">
              See how we shape brands with clarity and craft—explore our blog
            </h3>

            {/* View All Work Button */}
            <div className="inline-flex items-center gap-1.5 md:gap-2.5 text-[7px] min-[375px]:text-[8px] sm:text-[11px] md:text-xs font-bold text-zinc-400 group-hover:text-white transition-colors w-fit mb-1 md:mb-4">
              <span>View All Work</span>
              <span className="w-4 h-4 min-[375px]:w-5 min-[375px]:h-5 md:w-[26px] md:h-[26px] rounded md:rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:border-zinc-500 transition-colors">
                <ArrowUpRight className="w-2.5 h-2.5 md:w-3 md:h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" weight="bold" />
              </span>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  )
}

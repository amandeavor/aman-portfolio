import { motion } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { BLOG_POSTS_LIST } from '../data/blogs'

export function Thoughts() {
  // Display the first 2 posts in the Featured section
  const posts = BLOG_POSTS_LIST.slice(0, 2)

  return (
    <section id="thoughts" className="py-24 bg-paper dark:bg-[#111111] px-6 select-none">
      <div className="mx-auto max-w-6xl text-left">
        {/* Title */}
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-offblack dark:text-zinc-100 mb-16 font-display">
          Thoughts
        </h2>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map((post, idx) => (
            <motion.a
              key={post.slug}
              href={`#/blog/${post.slug}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[420px] rounded-[24px] overflow-hidden border border-zinc-200/40 dark:border-zinc-800/40 shadow-md group cursor-pointer block hover:opacity-95 transition-opacity"
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
              <div className="absolute inset-0 p-6 flex flex-col justify-end items-start text-white">
                <span className="text-[10px] text-zinc-400 font-bold mb-1.5">{post.date}</span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight mb-2 font-display text-zinc-100">
                  {post.title}
                </h3>
                <p className="text-[11px] text-zinc-400 leading-normal max-w-[28ch]">
                  {post.desc}
                </p>
              </div>
            </motion.a>
          ))}

          {/* Card 3: Solid Dark Banner CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#1f1f1f] text-zinc-100 p-6 rounded-[24px] border border-zinc-800/60 shadow-md flex flex-col justify-between h-[420px]"
          >
            {/* Header Text */}
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug font-display text-zinc-50 max-w-[15ch] mt-4">
              See how we shape brands with clarity and craft. Explore our blog.
            </h3>

            {/* View All Work Pill Button */}
            <div className="mb-4">
              <a
                href="#/blog"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white border border-zinc-800 rounded-full px-4 py-2 hover:bg-zinc-900 transition-colors w-fit shadow-sm"
              >
                <span>Read Blog</span>
                <ArrowUpRight size={13} weight="bold" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

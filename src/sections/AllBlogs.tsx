import { motion } from 'motion/react'
import { ArrowLeft } from '@phosphor-icons/react'
import { BLOG_POSTS_LIST } from '../data/blogs'

export function AllBlogs() {

  return (
    <section className="py-20 select-none bg-paper dark:bg-[#111111] text-offblack dark:text-zinc-200 text-left">
      <div className="mx-auto max-w-5xl px-6">

        {/* Back Link */}
        <div className="mb-10">
          <a
            href="#/"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-offblack dark:hover:text-zinc-100 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft size={14} weight="bold" />
            <span>Back</span>
          </a>
        </div>

        {/* Header */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-offblack dark:text-zinc-100 leading-[0.9] font-display mb-6">
          My Brightest<br />Thoughts
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-16 max-w-[52ch] font-sans">
          Discover insights, architecture reviews, and engineering updates shaped by work in custom operating systems, frontend UI design kits, and developer tools.
        </p>

        {/* Masonry-style 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BLOG_POSTS_LIST.map((post, idx) => (
            <motion.a
              key={post.slug}
              href={`#/blog/${post.slug}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[24px] overflow-hidden border border-zinc-200/40 dark:border-zinc-800/40 shadow-md group cursor-pointer block hover:opacity-95 transition-opacity h-[320px]"
            >
              {/* Grayscale image */}
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
              />

              {/* Dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

              {/* Text */}
              <div className="absolute inset-0 p-5 flex flex-col justify-end items-start text-white">
                <span className="text-[11px] font-semibold text-zinc-400 mb-2 uppercase tracking-widest">{post.date}</span>
                <h3 className="text-lg font-bold tracking-tight leading-snug mb-2 font-display text-white">
                  {post.title}
                </h3>
                <p className="text-[12px] text-zinc-300 leading-relaxed max-w-[30ch]">
                  {post.desc}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}

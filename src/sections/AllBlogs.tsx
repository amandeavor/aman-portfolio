import { motion } from 'motion/react'
import { ArrowLeft } from '@phosphor-icons/react'
import { BLOG_POSTS_LIST } from '../data/blogs'

export function AllBlogs() {

  return (
    <section aria-labelledby="all-blogs-title" className="py-16 sm:py-20 select-none bg-paper dark:bg-[#111111] text-offblack dark:text-zinc-200 text-left">
      <div className="mx-auto max-w-5xl px-4 min-[360px]:px-6">

        {/* Back Link */}
        <div className="mb-8 sm:mb-10">
          <a
            href="#/"
            className="inline-flex min-h-11 items-center gap-2 rounded-full pr-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-offblack dark:hover:text-zinc-100 transition-colors uppercase tracking-normal"
          >
            <ArrowLeft size={14} weight="bold" aria-hidden="true" />
            <span>Back</span>
          </a>
        </div>

        {/* Header */}
        <h1 id="all-blogs-title" className="text-4xl min-[360px]:text-5xl sm:text-6xl md:text-7xl font-semibold tracking-normal text-offblack dark:text-zinc-100 leading-[0.98] font-display mb-5 sm:mb-6">
          My Brightest<br />Thoughts
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-[1.65] mb-10 sm:mb-16 max-w-[62ch] font-sans">
          Discover insights, architecture reviews, and engineering updates shaped by work in custom operating systems, frontend UI design kits, and developer tools.
        </p>

        {/* Masonry-style 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {BLOG_POSTS_LIST.map((post, idx) => (
            <motion.a
              key={post.slug}
              href={`#/blog/${post.slug}`}
              initial={{ opacity: 0, y: 40, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.85, delay: idx * 0.04, ease: [0.215, 0.61, 0.355, 1] }}
              className={`relative rounded-[18px] md:rounded-[24px] overflow-hidden border border-zinc-200/40 dark:border-zinc-800/40 shadow-md group cursor-pointer block hover:opacity-95 transition-opacity bg-zinc-100/50 dark:bg-zinc-900/50 ${idx === 0 ? 'h-[360px] md:col-span-2 md:h-[430px]' : 'h-[330px] md:h-[340px]'}`}
            >
              {/* Grayscale image */}
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                decoding="async"
                width={900}
                height={1200}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 will-change-transform"
              />

              {/* Dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

              {/* Text */}
              <div className="absolute inset-0 p-5 min-[360px]:p-6 md:p-7 flex flex-col justify-end items-start text-white">
                <span className="text-[11px] md:text-xs font-semibold text-zinc-300 mb-2 uppercase tracking-normal">{post.date}</span>
                <h3 className={`${idx === 0 ? 'text-2xl md:text-4xl max-w-[18ch]' : 'text-xl md:text-2xl max-w-[22ch]'} font-bold tracking-normal leading-[1.12] mb-2 font-display text-white`}>
                  {post.title}
                </h3>
                <p className="text-sm md:text-[13px] text-zinc-300 leading-[1.6] max-w-[46ch]">
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

import { ArrowLeft, Clock } from '@phosphor-icons/react'
import { BLOG_POSTS } from '../data/blogs'

export function BlogDetail({ blogId }: { blogId: string }) {
  const post = BLOG_POSTS[blogId] || BLOG_POSTS['optimizing-desktop-latency']

  // Find the other 2 posts for the "More Articles" section
  const otherPosts = Object.values(BLOG_POSTS)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3) // show other 2 articles

  return (
    <section className="py-20 bg-paper dark:bg-[#111111] text-offblack dark:text-zinc-200 text-left">
      <div className="mx-auto max-w-4xl px-6">

        {/* Back Link */}
        <div className="mb-10">
          <a
            href="#/"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-offblack dark:hover:text-zinc-100 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft size={14} weight="bold" />
            <span>Back to all thoughts</span>
          </a>
        </div>

        {/* Header Block (Similar to Project page styling) */}
        <div className="flex items-center gap-3 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
          <span>{post.category}</span>
          <span className="opacity-45">&bull;</span>
          <span className="flex items-center gap-1">
            <Clock size={12} weight="bold" />
            {post.readTime}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-offblack dark:text-zinc-100 leading-[1.05] font-display mb-6">
          {post.title}
        </h1>

        <p className="text-zinc-500 text-sm sm:text-base md:text-lg leading-relaxed max-w-[85ch] mb-12 font-sans">
          {post.tagline}
        </p>

        {/* Big Header Image */}
        <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-[28px] overflow-hidden border border-zinc-200/40 dark:border-zinc-800/40 mb-16 shadow-sm">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 2-Column Article Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16 font-sans">
          <div className="space-y-6 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {post.col1Text.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="space-y-6 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {post.col2Text.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* Grid Section: Consistency & Clarity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-24">
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-xl md:text-2xl font-bold font-display text-offblack dark:text-zinc-100">
              {post.growthHeading}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
              {post.growthText}
            </p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-xl md:text-2xl font-bold font-display text-offblack dark:text-zinc-100">
              {post.clarityHeading}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
              {post.clarityText}
            </p>
          </div>
        </div>

        {/* More Articles Section */}
        <div className="border-t border-zinc-200/60 dark:border-zinc-800/60 pt-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-offblack dark:text-zinc-100 font-display mb-12">
            More Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherPosts.map((p) => (
              <a
                key={p.slug}
                href={`#/blog/${p.slug}`}
                className="relative h-[320px] rounded-[24px] overflow-hidden border border-zinc-200/40 dark:border-zinc-800/40 shadow-sm group cursor-pointer block hover:opacity-95 transition-opacity"
              >
                {/* Background Image */}
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                {/* Text aligned at the bottom */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end items-start text-white text-left">
                  <span className="text-[9px] text-zinc-400 font-bold mb-1.5">{p.date}</span>
                  <h3 className="text-base sm:text-lg font-bold tracking-tight leading-tight mb-2 font-display text-zinc-100">
                    {p.title}
                  </h3>
                  <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">{p.category}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

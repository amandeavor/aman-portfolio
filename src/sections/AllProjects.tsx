import { motion } from 'motion/react'
import { ArrowLeft } from '@phosphor-icons/react'
import { PROJECTS_LIST } from '../data/projects'

export function AllProjects() {

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
          My Brightest<br />Creations
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-16 max-w-[50ch] font-sans">
          A showcase of my latest projects — thoughtful design, clear strategy, and impactful results.
        </p>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {PROJECTS_LIST.map((project, idx) => (
            <motion.a
              key={project.id}
              href={`#/project/${project.id}`}
              initial={{ opacity: 0, y: 12, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.75, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start text-left group cursor-pointer hover:opacity-95 transition-opacity"
            >
              {/* Mockup Card */}
              <div className="aspect-[4/3] w-full rounded-[20px] md:rounded-[28px] border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden mb-3 relative shadow-sm bg-zinc-100/50 dark:bg-zinc-900/50">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  loading="lazy"
                  decoding="sync"
                  className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-700 ease-[0.16,1,0.3,1] will-change-transform"
                />
              </div>

              {/* Title & Meta */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mt-1 px-1 gap-2 select-none">
                <h3 className="text-xl md:text-2xl font-bold text-offblack dark:text-zinc-100 font-display tracking-tight group-hover:opacity-60 transition-opacity">
                  {project.title}
                </h3>
                <span className="text-[9px] md:text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider border border-zinc-200 dark:border-zinc-800/70 px-2.5 py-0.5 rounded-full bg-zinc-100/40 dark:bg-zinc-900/40 w-fit shrink-0">
                  {project.category}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}

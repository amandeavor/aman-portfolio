import { motion } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { PROJECTS_LIST } from '../data/projects'

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-paper dark:bg-[#111111] px-6 select-none">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row w-full items-start sm:items-end justify-between gap-6 mb-16">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-offblack dark:text-zinc-100 leading-[0.9] font-display">
            Featured<br />Projects
          </h2>
          <a
            href="#/projects"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-offblack dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 rounded-full px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm shrink-0"
          >
            <span>View All Work</span>
            <ArrowUpRight size={13} weight="bold" />
          </a>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {PROJECTS_LIST.map((project, idx) => {
            const delay = idx % 2 === 0 ? (idx === 0 ? 0 : 0.05) : 0.1

            return (
              <motion.a
                key={project.id}
                href={`#/project/${project.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start text-left group cursor-pointer hover:opacity-95 transition-opacity"
              >
                {/* Mockup Card Container */}
                <div className="aspect-[4/3] w-full rounded-[28px] border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden mb-4 relative shadow-sm">
                  <img
                    src={project.coverImage}
                    alt={`${project.title} Mockup`}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                {/* Project Title & Meta Info */}
                <div className="flex flex-col items-start gap-0.5 pl-2 select-none">
                  <h3 className="text-xl font-bold text-offblack dark:text-zinc-100 font-display group-hover:opacity-70 transition-opacity">
                    {project.title}
                  </h3>
                  <span className="text-xs text-zinc-500 font-semibold">
                    {project.category}
                  </span>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

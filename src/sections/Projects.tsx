import { motion } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { PROJECTS_LIST } from '../data/projects'

export function Projects() {
  const featuredProjects = PROJECTS_LIST.filter(project =>
    ['obsidiankit', 'aetheris-os', 'gurunanakacademy', 'aman-intelligence'].includes(project.id)
  )

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-6 md:py-24 bg-paper dark:bg-[#111111] px-4 min-[360px]:px-6 select-none">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row w-full items-start sm:items-end justify-between gap-6 mb-16">
          <h2 id="projects-title" className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-normal text-offblack dark:text-zinc-100 leading-[0.95] font-display">
            Featured<br />Projects
          </h2>
          <motion.a
            href="#/projects"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex min-h-11 items-center gap-1.5 text-xs font-bold text-offblack dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 rounded-full px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm shrink-0 group"
          >
            <span>View All Work</span>
            <ArrowUpRight size={13} weight="bold" aria-hidden="true" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </motion.a>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {featuredProjects.map((project, idx) => {
            const delay = idx % 2 === 0 ? (idx === 0 ? 0 : 0.05) : 0.1

            return (
              <motion.a
                key={project.id}
                href={`#/project/${project.id}`}
                initial={{ opacity: 0, y: 40, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.85, delay, ease: [0.215, 0.61, 0.355, 1] }}
                className="flex flex-col items-start text-left group cursor-pointer hover:opacity-95 transition-opacity rounded-[20px]"
              >
                {/* Mockup Card Container */}
                <div className="aspect-[4/3] w-full rounded-[20px] md:rounded-[28px] border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden mb-3 relative shadow-sm bg-zinc-100/50 dark:bg-zinc-900/50">
                  <img
                    src={project.coverImage}
                    alt={`${project.title} Mockup`}
                    loading="lazy"
                    decoding="async"
                    width={1200}
                    height={900}
                    className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-700 ease-[0.16,1,0.3,1] will-change-transform"
                  />
                </div>

                {/* Project Title & Meta Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mt-1 px-1 gap-2 select-none">
                  <h3 className="text-xl md:text-2xl font-bold text-offblack dark:text-zinc-100 font-display tracking-normal group-hover:opacity-70 transition-opacity">
                    {project.title}
                  </h3>
                  <span className="text-[9px] md:text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-normal border border-zinc-200 dark:border-zinc-800/70 px-2.5 py-0.5 rounded-full bg-zinc-100/40 dark:bg-zinc-900/40 w-fit shrink-0">
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

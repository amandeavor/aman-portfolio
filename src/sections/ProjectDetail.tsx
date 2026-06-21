import { useEffect } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, ArrowLeft } from '@phosphor-icons/react'
import { PROJECTS_DATA } from '../data/projects'

export function ProjectDetail({ projectId }: { projectId: string }) {
  const project = PROJECTS_DATA[projectId] || PROJECTS_DATA.obsidiankit

  // Filter out the current project to find the "More Projects" candidates
  const otherProjects = Object.values(PROJECTS_DATA)
    .filter((p) => p.id !== project.id)
    .slice(0, 2) // display exactly 2 "More Projects"

  // Automatically scroll to the top of the window on mount/project change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [projectId])

  return (
    <section className="py-20 bg-paper dark:bg-[#111111] text-offblack dark:text-zinc-200 text-left">
      <div className="mx-auto max-w-5xl px-6">

        {/* Back Link */}
        <div className="mb-10">
          <a
            href="#/"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-offblack dark:hover:text-zinc-100 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft size={14} weight="bold" />
            <span>Back to all projects</span>
          </a>
        </div>

        {/* Title Block */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-offblack dark:text-zinc-100 leading-[0.9] font-display mb-6">
          {project.title}
        </h1>

        <p className="text-zinc-500 text-sm sm:text-base md:text-lg leading-relaxed max-w-[85ch] mb-10 font-sans">
          {project.tagline}
        </p>

        {/* Metadata Strip */}
        <div className="flex flex-wrap items-center gap-x-10 gap-y-6 mb-16 font-sans">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Category</span>
            <span className="text-base font-bold text-offblack dark:text-zinc-100">{project.category}</span>
          </div>
          <div className="w-[1px] h-10 bg-zinc-300/40 dark:bg-zinc-700/40 hidden sm:block" />
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Year</span>
            <span className="text-base font-bold text-offblack dark:text-zinc-100">{project.year}</span>
          </div>
          <div className="w-[1px] h-10 bg-zinc-300/40 dark:bg-zinc-700/40 hidden sm:block" />
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-sans">Project Link</span>
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-1.5 text-base font-bold text-offblack dark:text-zinc-100 group"
            >
              <span className="group-hover:underline underline-offset-2 transition-all">Link</span>
              <motion.span
                whileHover={{ x: 2, y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="w-6 h-6 rounded-full border border-zinc-300 dark:border-zinc-600 flex items-center justify-center group-hover:bg-offblack dark:group-hover:bg-zinc-100 group-hover:border-offblack dark:group-hover:border-zinc-100 group-hover:text-white dark:group-hover:text-offblack transition-colors"
              >
                <ArrowUpRight size={12} weight="bold" />
              </motion.span>
            </motion.a>
          </div>
        </div>

        {/* Main Hero Visual Card */}
        <div
          style={project.gradientFrom ? { background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})` } : {}}
          className={`aspect-[16/10] sm:aspect-[16/9] w-full rounded-[28px] overflow-hidden mb-20 relative shadow-sm flex items-center justify-center ${project.gradientFrom ? `border ${project.borderColor} p-4 sm:p-8 md:p-12` : 'border border-zinc-200/60 dark:border-zinc-800/60'}`}
        >
          <img
            src={project.coverImage}
            alt={`${project.title} Hero`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Grid Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-20">
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-xl md:text-2xl font-bold font-display text-offblack dark:text-zinc-100">
              About the Project
            </h3>
            <div className="space-y-4 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
              {project.aboutParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-xl md:text-2xl font-bold font-display text-offblack dark:text-zinc-100">
              {project.flexibilityHeading}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
              {project.flexibilityText}
            </p>
          </div>
        </div>

        {/* 2-Column Showcase Mockups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-20 h-[300px] sm:h-[350px]">
          <div className="w-full h-full">
            {project.showcaseLeft}
          </div>
          <div className="w-full h-full">
            {project.showcaseRight}
          </div>
        </div>

        {/* Grid Section 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20">
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-lg md:text-xl font-bold font-display text-offblack dark:text-zinc-100">
              {project.visualLanguageHeading}
            </h3>
            <div className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
              <p>{project.visualLanguageText1}</p>
              <p>{project.visualLanguageText2}</p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-lg md:text-xl font-bold font-display text-offblack dark:text-zinc-100">
              {project.structuredStorytellingHeading}
            </h3>
            <div className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
              <p>{project.structuredStorytellingText1}</p>
              <p>{project.structuredStorytellingText2}</p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-lg md:text-xl font-bold font-display text-offblack dark:text-zinc-100">
              {project.builtForRealUseHeading}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
              {project.builtForRealUseText}
            </p>
          </div>
        </div>

        {/* Full-width Tilted Layouts Showcase */}
        <div className="w-full rounded-[28px] overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50 mb-20 relative">
          {project.tiltedShowcase}
        </div>

        {/* Grid Section 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-24">
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-xl md:text-2xl font-bold font-display text-[#121212] dark:text-zinc-100">
              {project.growthHeading}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
              {project.growthText}
            </p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-xl md:text-2xl font-bold font-display text-[#121212] dark:text-zinc-100">
              {project.clarityHeading}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
              {project.clarityText}
            </p>
          </div>
        </div>

        {/* More Projects Section */}
        <div className="border-t border-zinc-200/60 dark:border-zinc-800/60 pt-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-offblack dark:text-zinc-100 font-display mb-12">
            More Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {otherProjects.map((p) => (
              <a
                key={p.id}
                href={`#/project/${p.id}`}
                className="flex flex-col items-start text-left group cursor-pointer"
              >
                {/* Mockup Card Container */}
                <div
                  style={p.gradientFrom ? { background: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})` } : {}}
                  className={`aspect-[4/3] w-full rounded-[28px] overflow-hidden mb-4 relative shadow-sm flex items-center justify-center ${p.gradientFrom ? `border ${p.borderColor} p-4 sm:p-6 md:p-8` : 'border border-zinc-200/40 dark:border-zinc-800/40'} hover:opacity-95 transition-opacity`}
                >
                  <img
                    src={p.coverImage}
                    alt={`${p.title} Hero`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Project Title & Meta Info */}
                <div className="flex flex-col items-start gap-0.5 pl-2">
                  <h3 className="text-xl font-bold text-offblack dark:text-zinc-100 font-display group-hover:opacity-70 transition-opacity">
                    {p.title}
                  </h3>
                  <span className="text-xs text-zinc-500 font-semibold">
                    {p.category}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

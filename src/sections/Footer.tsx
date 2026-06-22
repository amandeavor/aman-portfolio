import { motion } from 'motion/react'

const QUICK_LINKS = [
  { label: 'Home', sectionId: null, href: '#/' },
  { label: 'About Me', sectionId: 'about' },
  { label: 'Projects', sectionId: 'projects' },
  { label: 'Thoughts', sectionId: 'thoughts' },
  { label: 'Contact', sectionId: 'contact' },
]

export function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string | null) => {
    if (!sectionId) return // let Home (#/) navigate normally
    e.preventDefault()

    const currentHash = window.location.hash
    const isDetail =
      currentHash.startsWith('#/project/') ||
      currentHash.startsWith('#/blog/') ||
      currentHash === '#/projects' ||
      currentHash === '#/blog'

    const scrollTo = () => {
      const el = document.getElementById(sectionId)
      if (!el) return
      const lenis = window.lenis
      if (lenis) {
        lenis.scrollTo(el, { offset: -80, duration: 1.2 })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }

    if (isDetail) {
      // eslint-disable-next-line react-hooks/immutability
      window.location.hash = '#/'
      setTimeout(scrollTo, 400)
    } else {
      scrollTo()
    }
  }

  return (
    <footer className="bg-[#0c0c0e] dark:bg-[#FAF7F3] text-zinc-100 dark:text-zinc-900 pt-12 md:pt-28 pb-8 md:pb-12 select-none relative overflow-hidden">

      {/* Massive Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
        <span className="text-[46vw] md:text-[22vw] font-bold text-white/[0.04] dark:text-black/[0.04] leading-none font-display uppercase whitespace-nowrap tracking-normal">
          AMAN
        </span>
      </div>

      <div className="mx-auto max-w-4xl px-6 relative z-10">

        {/* Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 text-left pb-16 items-start">

          {/* Left Column: Heading */}
          <div className="md:col-span-5">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white dark:text-zinc-900 leading-[1.05] font-display md:-ml-20">
              Scaling<br />Start-ups<br />for Growth.
            </h2>
          </div>

          {/* Center Column: Quick Links */}
          <div className="md:col-span-4 flex flex-col items-start gap-3 md:-ml-10">
            <span className="text-[15px] font-bold text-zinc-300 dark:text-zinc-600 font-sans tracking-normal mb-1">
              /Quick links
            </span>
            <nav aria-label="Footer" className="flex flex-wrap gap-2 justify-start">
              {QUICK_LINKS.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.sectionId ? `#${link.sectionId}` : link.href}
                  onClick={(e) => handleLinkClick(e, link.sectionId ?? null)}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex min-h-11 items-center px-5 py-2.5 bg-[#eae9e4] dark:bg-[#1f1f1f] hover:bg-zinc-300 dark:hover:bg-zinc-800 text-[13px] font-bold text-[#121212] dark:text-zinc-100 rounded-xl transition-colors shadow-sm whitespace-nowrap"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Right Column: Contact Info */}
          <div className="md:col-span-3 flex flex-col items-start gap-3 md:pl-10">
            <span className="text-[15px] font-bold text-zinc-300 dark:text-zinc-600 font-sans tracking-normal mb-1">
              /Contact
            </span>
            <a
              href="mailto:amandeavor@gmail.com"
              className="inline-flex min-h-11 items-center text-base font-bold text-zinc-200 dark:text-zinc-700 hover:text-white dark:hover:text-zinc-900 transition-colors"
            >
              amandeavor@gmail.com
            </a>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800/40 dark:border-zinc-300/10 relative z-10">
        <div className="mx-auto max-w-4xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] font-semibold text-zinc-400 dark:text-zinc-600 font-sans">
          <span>© {new Date().getFullYear()} Aman. All rights reserved.</span>
          <span className="tracking-normal">Designed & built by Aman</span>
        </div>
      </div>

    </footer>
  )
}

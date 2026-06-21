import { useRef } from 'react'
import { motion, useScroll } from 'motion/react'
import { Moon, Sun } from '@phosphor-icons/react'

const navItems = [
  { label: 'About', sectionId: 'about' },
  { label: 'Projects', sectionId: 'projects' },
  { label: 'Thoughts', sectionId: 'thoughts' },
  { label: 'Contact', sectionId: 'contact' },
]

interface NavbarProps {
  dark: boolean
  onToggleDark: (btn: HTMLButtonElement | null) => void
  route?: string
}

export function Navbar({ dark, onToggleDark, route }: NavbarProps) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const { scrollYProgress } = useScroll()

  const isDetailRoute = route ? (route.startsWith('#/project/') || route.startsWith('#/blog/')) : false

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    // If on a detail page, go home first then scroll
    const currentHash = window.location.hash
    const isDetail =
      currentHash.startsWith('#/project/') ||
      currentHash.startsWith('#/blog/') ||
      currentHash === '#/projects' ||
      currentHash === '#/blog'

    if (isDetail) {
      window.location.hash = '#/'
      // Wait for home page to mount then scroll
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) {
          const lenis = (window as any).lenis
          if (lenis) {
            lenis.scrollTo(el, { offset: -80, duration: 1.2 })
          } else {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        }
      }, 400)
    } else {
      const el = document.getElementById(sectionId)
      if (el) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const lenis = (window as any).lenis
        if (lenis) {
          lenis.scrollTo(el, { offset: -80, duration: 1.2 })
        } else {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  return (
    <motion.div
      initial={{ y: -20, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 z-50 flex items-center gap-2 sm:gap-3 pl-3 min-[375px]:pl-5 pr-2 py-2 rounded-full select-none bg-[#121212]/55 backdrop-blur-[16px] border border-white/8 shadow-[0_4px_24px_rgba(0,0,0,0.18)] w-[92vw] sm:w-[clamp(290px,68vw,480px)]"
    >
      {/* Scroll Reading Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isDetailRoute ? 1 : 0
        }}
        style={{
          scaleX: isDetailRoute ? scrollYProgress : 0,
          transformOrigin: 'left'
        }}
        transition={{ opacity: { duration: 0.25 } }}
        className="absolute top-0 left-6 right-6 h-[2px] bg-white dark:bg-zinc-400 rounded-full z-10"
      />
      {/* Brand */}
      <motion.a
        href="#/"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="text-sm font-bold tracking-tight text-white font-display shrink-0 hidden min-[375px]:block"
      >
        Aman
      </motion.a>

      {/* Separator */}
      <div className="w-[1px] h-4 bg-white/15 shrink-0 hidden min-[375px]:block" />

      {/* Nav links */}
      <div className="flex items-center gap-0.5 flex-1 justify-center min-[375px]:justify-start">
        {navItems.map((item) => (
          <motion.a
            key={item.label}
            href={`#${item.sectionId}`}
            onClick={(e) => handleNavClick(e, item.sectionId)}
            whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[9px] min-[375px]:text-[10px] sm:text-[11px] font-semibold text-zinc-400 hover:text-white px-1.5 min-[375px]:px-2.5 sm:px-3 py-1.5 rounded-full"
          >
            {item.label}
          </motion.a>
        ))}
      </div>

      {/* Dark mode toggle */}
      <motion.button
        ref={btnRef}
        onClick={() => onToggleDark(btnRef.current)}
        whileTap={{ scale: 0.9 }}
        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-colors shrink-0 cursor-pointer"
        aria-label="Toggle dark mode"
      >
        <motion.span
          key={dark ? 'sun' : 'moon'}
          initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {dark ? <Sun size={14} weight="bold" /> : <Moon size={14} weight="bold" />}
        </motion.span>
      </motion.button>
    </motion.div>
  )
}


import { useRef } from 'react'
import { motion } from 'motion/react'
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
}

export function Navbar({ dark, onToggleDark }: NavbarProps) {
  const btnRef = useRef<HTMLButtonElement>(null)

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
      // eslint-disable-next-line react-hooks/immutability
      window.location.hash = '#/'
      // Wait for home page to mount then scroll
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) {
          const lenis = window.lenis
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
        const lenis = window.lenis
        if (lenis) {
          lenis.scrollTo(el, { offset: -80, duration: 1.2 })
        } else {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3 sm:top-6 left-1/2 z-50 rounded-full select-none bg-[#121212]/72 backdrop-blur-[16px] border border-white/10 shadow-[0_6px_22px_rgba(0,0,0,0.18)] w-[calc(100vw-0.75rem)] max-w-[500px] sm:w-[clamp(330px,64vw,500px)]"
    >
      <nav aria-label="Primary" className="relative flex items-center gap-0.5 min-[370px]:gap-1 sm:gap-2 px-1.5 py-1.5 min-[405px]:pl-3">
        {/* Brand */}
        <motion.a
          href="#/"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="hidden min-[405px]:inline-flex min-h-11 items-center rounded-full px-2 text-sm font-bold tracking-normal text-white font-display shrink-0 focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-0"
        >
          Aman
        </motion.a>

        {/* Separator */}
        <div className="w-[1px] h-4 bg-white/15 shrink-0 hidden min-[405px]:block" aria-hidden="true" />

        {/* Nav links */}
        <div className="flex min-w-0 flex-1 items-center justify-center gap-0.5 min-[405px]:justify-start">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={`#${item.sectionId}`}
              onClick={(e) => handleNavClick(e, item.sectionId)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-1.5 min-[340px]:px-2 min-[375px]:px-2.5 sm:px-3 text-[11px] min-[370px]:text-xs sm:text-[13px] font-semibold tracking-normal text-zinc-300 hover:bg-white/[0.08] hover:text-white focus-visible:bg-white/[0.10] focus-visible:text-white focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-0 transition-colors"
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
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/[0.18] flex items-center justify-center text-zinc-200 hover:text-white focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-0 transition-colors shrink-0 cursor-pointer"
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          type="button"
        >
          <motion.span
            key={dark ? 'sun' : 'moon'}
            initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            aria-hidden="true"
          >
            {dark ? <Sun size={16} weight="bold" /> : <Moon size={16} weight="bold" />}
          </motion.span>
        </motion.button>
      </nav>
    </motion.header>
  )
}

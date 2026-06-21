import { useRef } from 'react'
import { motion } from 'motion/react'
import { Moon, Sun } from '@phosphor-icons/react'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Thoughts', href: '#thoughts' },
  { label: 'Contact', href: '#contact' },
]

interface NavbarProps {
  dark: boolean
  onToggleDark: (btn: HTMLButtonElement | null) => void
}

export function Navbar({ dark, onToggleDark }: NavbarProps) {
  const btnRef = useRef<HTMLButtonElement>(null)

  return (
    <motion.div
      initial={{ y: -20, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 z-50 flex items-center gap-3 pl-5 pr-2 py-2 rounded-full select-none bg-[#121212]/55 backdrop-blur-[16px] border border-white/8 shadow-[0_4px_24px_rgba(0,0,0,0.18)] w-[clamp(260px,68vw,480px)]"
    >
      {/* Brand */}
      <a href="#/" className="text-sm font-bold tracking-tight text-white font-display shrink-0">
        Aman
      </a>

      {/* Separator */}
      <div className="w-[1px] h-4 bg-white/15 shrink-0" />

      {/* Nav links */}
      <div className="flex items-center gap-0.5 flex-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-[11px] font-semibold text-zinc-400 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/10"
          >
            {item.label}
          </a>
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

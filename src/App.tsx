import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Navbar } from './sections/Navbar'
import { Hero } from './sections/Hero'
import { About, AboutTagline } from './sections/About'
import { Projects } from './sections/Projects'
import { Testimonials } from './sections/Testimonials'
import { Thoughts } from './sections/Thoughts'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { ProjectDetail } from './sections/ProjectDetail'
import { BlogDetail } from './sections/BlogDetail'
import { AllProjects } from './sections/AllProjects'
import { AllBlogs } from './sections/AllBlogs'
import { PROJECTS_DATA } from './data/projects'
import { BLOG_POSTS } from './data/blogs'

function App() {
  const [route, setRoute] = useState(window.location.hash)
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    const handleHashChange = () => {
      const newHash = window.location.hash
      const isGoingToDetail =
        newHash.startsWith('#/project/') ||
        newHash.startsWith('#/blog/') ||
        newHash === '#/projects' ||
        newHash === '#/blog'

      if (isGoingToDetail) {
        // Bypass Lenis completely — set the raw DOM scroll directly.
        // Lenis reads from the real scroll position on its next RAF tick,
        // so zeroing this out before React re-renders prevents any flash.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const lenis = (window as any).lenis
        if (lenis) lenis.stop()
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
        if (lenis) setTimeout(() => lenis.start(), 350)
      }
      setRoute(newHash)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    let touchStartX = 0
    let touchStartY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const currentHash = window.location.hash
      const isHome = currentHash === '' || currentHash === '#/' || currentHash === '#'
      if (isHome) return

      const touchEndX = e.changedTouches[0].clientX
      const touchEndY = e.changedTouches[0].clientY

      const diffX = touchEndX - touchStartX
      const diffY = touchEndY - touchStartY

      // Swipe Back Gesture requirements:
      // 1. Starts from the left edge of the screen (first 50px)
      // 2. Dragged at least 80px horizontally to the right
      // 3. Vertical movement is small (less than 50px) to distinguish from vertical scrolling
      if (touchStartX < 50 && diffX > 80 && Math.abs(diffY) < 50) {
        window.history.back()
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lenisInstance: any = null
    let rafId: number | null = null
    let active = true

    const moduleName = 'lenis'
    import(/* @vite-ignore */ moduleName).then(({ default: Lenis }) => {
      if (!active) return
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).lenis = lenisInstance
      const raf = (time: number) => {
        if (active && lenisInstance) {
          lenisInstance.raf(time)
          rafId = requestAnimationFrame(raf)
        }
      }
      rafId = requestAnimationFrame(raf)
    }).catch(() => {})

    return () => {
      active = false
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).lenis
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      if (lenisInstance) {
        lenisInstance.destroy()
      }
    }
  }, [])

  const handleToggleDark = (btnEl: HTMLButtonElement | null) => {
    const nextDark = !dark
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = window.document as any

    // Use View Transitions API for a silky clip-path reveal if supported
    if (doc.startViewTransition) {
      const rect = btnEl?.getBoundingClientRect()
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
      const y = rect ? rect.top + rect.height / 2 : 0
      const maxR = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )

      // Inject a one-shot style for the clip-path animation
      const style = doc.createElement('style')
      style.textContent = `
        ::view-transition-old(root) {
          animation: none;
        }
        ::view-transition-new(root) {
          animation: vt-ripple 0.55s cubic-bezier(0.76, 0, 0.24, 1) forwards;
          clip-path: circle(0px at ${x}px ${y}px);
        }
        @keyframes vt-ripple {
          to { clip-path: circle(${maxR}px at ${x}px ${y}px); }
        }
      `
      doc.head.appendChild(style)

      doc.startViewTransition(() => {
        setDark(nextDark)
      }).finished.finally(() => {
        doc.head.removeChild(style)
      })
    } else {
      // Fallback: simple CSS transition on html
      doc.documentElement.style.transition = 'background-color 0.4s ease, color 0.4s ease'
      setDark(nextDark)
      setTimeout(() => {
        doc.documentElement.style.transition = ''
      }, 400)
    }
  }

  const homeScrollRef = useRef(0)
  const prevRouteRef = useRef(route)

  useEffect(() => {
    const wasHome = prevRouteRef.current === '' || prevRouteRef.current === '#/' || prevRouteRef.current === '#'
    const isHome = route === '' || route === '#/' || route === '#'

    if (wasHome && !isHome) {
      homeScrollRef.current = window.scrollY
    }
    prevRouteRef.current = route
  }, [route])

  const handleExitComplete = () => {
    const isHome = route === '' || route === '#/' || route === '#'
    const targetScroll = isHome ? homeScrollRef.current : 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).lenis
    if (lenis) lenis.stop()
    document.documentElement.scrollTop = targetScroll
    document.body.scrollTop = targetScroll
    if (lenis) setTimeout(() => lenis.start(), 50)
  }

  const isProjectRoute = route.startsWith('#/project/')
  const projectId = isProjectRoute ? route.replace('#/project/', '') : null
  const isBlogRoute = route.startsWith('#/blog/')
  const blogId = isBlogRoute ? route.replace('#/blog/', '') : null
  const isAllProjects = route === '#/projects'
  const isAllBlogs    = route === '#/blog'

  const isDetailPage = isProjectRoute || isBlogRoute || isAllProjects || isAllBlogs
  const pageKey = isDetailPage ? route : 'home'

  // Known routes — anything else is 404
  const isKnownRoute =
    route === '' || route === '#' || route === '#/' ||
    route.startsWith('#about') || route.startsWith('#projects') ||
    route.startsWith('#thoughts') || route.startsWith('#contact') ||
    route.startsWith('#testimonials') || route.startsWith('#services') ||
    isAllProjects || isAllBlogs ||
    (isProjectRoute && projectId && !!PROJECTS_DATA[projectId]) ||
    (isBlogRoute && blogId && !!BLOG_POSTS[blogId])

  // Dynamic document title
  useEffect(() => {
    let title = 'Aman | Software Engineer & Creator'
    if (isProjectRoute && projectId && PROJECTS_DATA[projectId]) {
      title = `${PROJECTS_DATA[projectId].title} — Aman`
    } else if (isBlogRoute && blogId && BLOG_POSTS[blogId]) {
      title = `${BLOG_POSTS[blogId].title} — Aman`
    } else if (isAllProjects) {
      title = 'All Projects — Aman'
    } else if (isAllBlogs) {
      title = 'All Thoughts — Aman'
    }
    document.title = title
  }, [route, isProjectRoute, projectId, isBlogRoute, blogId, isAllProjects, isAllBlogs])

  return (
    <div
      className="relative min-h-[100dvh] bg-paper text-offblack flex flex-col font-sans antialiased selection:bg-offblack selection:text-zinc-50 dark:bg-[#111111] dark:text-zinc-200"
      onContextMenu={(e) => {
        if ((e.target as HTMLElement).tagName === 'IMG') e.preventDefault()
      }}
    >
      <Navbar dark={dark} onToggleDark={handleToggleDark} route={route} />
      <main className="flex-grow overflow-visible relative">
        <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
          <motion.div
            key={pageKey}
            initial={{ opacity: 0, scale: 0.995 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.995 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {!isKnownRoute ? (
              <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-6 px-6 text-center bg-paper dark:bg-[#111111]">
                <span className="text-[120px] font-extrabold text-zinc-200 dark:text-zinc-800 font-display leading-none select-none">404</span>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-sans max-w-[30ch]">This page doesn't exist. Head back home.</p>
                <a
                  href="#/"
                  className="inline-flex items-center gap-2 text-xs font-bold text-offblack dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 rounded-full px-5 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  ← Back home
                </a>
              </div>
            ) : isAllProjects ? (
              <AllProjects />
            ) : isAllBlogs ? (
              <AllBlogs />
            ) : isProjectRoute && projectId ? (
              <ProjectDetail projectId={projectId} />
            ) : isBlogRoute && blogId ? (
              <BlogDetail blogId={blogId} />
            ) : (
              <>
                <Hero />
                <About />
                <AboutTagline dark={dark} />
                <Projects />
                <Testimonials />
                <Thoughts />
                <Contact />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App

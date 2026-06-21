import { useState, useEffect } from 'react'
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
    const handleHashChange = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
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
        lerp: 0.045,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      })
      const raf = (time: number) => {
        if (lenisInstance) {
          lenisInstance.raf(time)
          rafId = requestAnimationFrame(raf)
        }
      }
      rafId = requestAnimationFrame(raf)
    }).catch(() => {})

    return () => {
      active = false
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

  const isProjectRoute = route.startsWith('#/project/')
  const projectId = isProjectRoute ? route.replace('#/project/', '') : null
  const isBlogRoute = route.startsWith('#/blog/')
  const blogId = isBlogRoute ? route.replace('#/blog/', '') : null
  const isAllProjects = route === '#/projects'
  const isAllBlogs    = route === '#/blog'

  return (
    <div
      className="relative min-h-[100dvh] bg-paper text-offblack flex flex-col font-sans antialiased selection:bg-offblack selection:text-zinc-50 dark:bg-[#111111] dark:text-zinc-200"
      onContextMenu={(e) => {
        if ((e.target as HTMLElement).tagName === 'IMG') e.preventDefault()
      }}
    >
      <Navbar dark={dark} onToggleDark={handleToggleDark} />
      <main className="flex-grow">
        {isAllProjects ? (
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
      </main>
      <Footer />
    </div>
  )
}

export default App

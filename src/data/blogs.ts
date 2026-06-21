import aetherisBlogImg from '../assets/aetheris-blog.png'
import privacyBlogImg from '../assets/privacy-blog.png'
import intelligenceBlogImg from '../assets/amanintelligence-blog.png'

export interface BlogPost {
  slug: string
  title: string
  date: string
  category: string
  readTime: string
  image: string
  desc: string
  tagline: string
  col1Text: string[]
  col2Text: string[]
  growthHeading: string
  growthText: string
  clarityHeading: string
  clarityText: string
}

export const BLOG_POSTS: Record<string, BlogPost> = {
  'optimizing-desktop-latency': {
    slug: 'optimizing-desktop-latency',
    title: 'Aetheris OS: Optimizing Latency under 2ms',
    date: 'Jun 21, 2026',
    category: 'Operating Systems',
    readTime: '6 min read',
    image: aetherisBlogImg,
    desc: 'Inside the Wayland compositor hooks, BORE schedules, and memory compaction tweaks that drive our low-latency OS.',
    tagline: 'How we configured Labwc, nested Gamescope layers, tearing-control-v1, and BORE scheduling to build an operating system with ultra-responsive display pipelines.',
    col1Text: [
      'In Aetheris OS, low latency is not an afterthought—it is the core baseline architectural requirement. When building a custom Linux distribution targeting gaming and power user environments, default system schedules and Wayland compositors introduce unnecessary display jitter. To solve this, we replaced completely fair schedulers (CFS) with burst-oriented priority algorithms.',
      'Our compositor choice, Labwc, sits directly on top of wlroots, utilizing direct GPU page flips and scanouts. This allows us to bypass CPU render pipelines entirely. Under a default layout load, compositor memory overhead is kept under 50MB, preserving fragment shader performance on integrated graphics cards.'
    ],
    col2Text: [
      'To bridge the lag between mouse events and on-screen frame flips, we integrated the tearing-control-v1 protocol and VRR sync configurations. This disables vsync locking dynamically on fullscreen client windows, dropping overall render input lag from 16.7ms to less than 2ms for responsive cursor feedback.',
      'Additionally, we deployed custom-compiled BORE schedulers and systemd-boot wrappers. BORE monitors task burst behaviors, prioritizing active Wayland threads and window supervisors during storage-heavy I/O swaps. The result is a buttery smooth, frame-exact gaming environment.'
    ],
    growthHeading: 'BORE Scheduler Performance',
    growthText: 'CFS and EEVDF schedulers penalize bursty threads under heavy multithreaded loads. By tracking sleep/wake metrics, the BORE CPU scheduler actively preempts compilation daemons to protect GUI rendering loops, eliminating desktop stutter.',
    clarityHeading: 'Xray Blur Render Optimization',
    clarityText: 'Multi-pass Gaussian filters sample the entire framebuffer on every tick, consuming up to 30% of iGPU compute. We implemented Xray Blur, which caches the blurred wallpaper in VRAM and lets widgets sample it via fast UV lookup, dropping GPU load to <5%.'
  },
  'privacy-first-components': {
    slug: 'privacy-first-components',
    title: 'Privacy-First Component Design: Inside ObsidianKit',
    date: 'May 15, 2026',
    category: 'Frontend Architecture',
    readTime: '5 min read',
    image: privacyBlogImg,
    desc: 'How we build modular React components that enforce browser-native data sovereignty without losing premium design interactions.',
    tagline: 'How we designed a modular React component library that prioritizes local storage sovereignty, editor-inspired layouts, and zero-dependency custom widgets.',
    col1Text: [
      'Modern component libraries focus heavily on layout aesthetics while ignoring data privacy. Many dashboard templates silently leak telemetry data or rely on heavy external web fonts and telemetry assets. With ObsidianKit, we wanted to build a UI kit that keeps data completely in the browser.',
      'Every button, sidebar, and workspace node in ObsidianKit is designed to leverage browser-native data models. Note storage hooks query LocalStorage or indexedDB locally, preventing remote server leaks. The library uses grotesque display typography like Archivo to convey authority without web-font API locks.'
    ],
    col2Text: [
      'Designing note-taking and editor widgets requires extreme package hygiene. Rather than pulling in heavy npm editor blocks, ObsidianKit implements lightweight Markdown parsing directly on the client. Component structures are flat, using 1px borders instead of drop shadows for a tactile feel.',
      'Ultimately, user experience should never trade security for design polish. By isolating states and offering zero-dependency component wrappers, we give developers the building blocks to assemble publishing tools that respect user privacy while maintaining smooth scroll animations.'
    ],
    growthHeading: 'Zero-Dependency Footprint',
    growthText: 'Heavy npm dependencies bloat bundle payloads and introduce supply-chain vulnerabilities. ObsidianKit relies exclusively on core React 19 APIs, maintaining a lightweight footprint that loads instantly on low-end mobile viewports.',
    clarityHeading: 'Tactile Visual Language',
    clarityText: 'Instead of using SaaS drop-shadow overlays, we build layout depth using solid borders and high-contrast letter spacing. Spacing rules are strictly mapped to CSS custom variables, creating a highly structured editor layout.'
  },
  'command-line-ai': {
    slug: 'command-line-ai',
    title: 'AmanIntelligence: Reimagining the AI CLI Workflow',
    date: 'Apr 10, 2026',
    category: 'AI Developer Tools',
    readTime: '6 min read',
    image: intelligenceBlogImg,
    desc: 'Moving past web chat boxes to integrate local context-aware LLM command execution and code audits directly in terminal sessions.',
    tagline: 'Moving past web chat boxes to integrate local context-aware LLM command execution, code audits, and directory structures parsing directly inside terminal sessions.',
    col1Text: [
      'Command-line assistants are often restricted to simple command suggestions. With AmanIntelligence, we wanted to build a terminal AI CLI utility that has deep workspace directory context. Developers spend hours copy-pasting code into web browsers; we bring the LLM directly to the source.',
      'AmanIntelligence handles directories dynamically. When prompted, it compiles file directory structures, parses relevant code blocks, and feeds them into the context window. It structures terminal outputs with clean syntax-highlighted markdown blocks, optimizing readability on standard stderr buffers.'
    ],
    col2Text: [
      'Executing generative code commands on local environments carries severe security risks. To prevent anomalous execution, AmanIntelligence processes code edits inside temp files, letting users audit diffs before saving. It queries OpenAI/Claude models via secure local key mappings.',
      'By moving assistant features to the terminal CLI, we eliminate window switching, keeping developers focused on the shell. Combined with fast command parsers and automated scripting, it provides a lightweight, secure code assistant that fits neatly into daily shell pipelines.'
    ],
    growthHeading: 'Context Mapping Efficiency',
    growthText: 'Feeding entire folders into prompt contexts exhausts tokens. AmanIntelligence uses a local context compiler to filter out binary files, node modules, and builds, generating a clean codebase tree representation.',
    clarityHeading: 'Secure Execution Pipeline',
    clarityText: 'Unrecognized scripts or setup setups trigger security flags and are isolated. The CLI allows you to execute commands in dryrun simulation modes first, protecting the host system from unauthorized script edits.'
  }
}

export const BLOG_POSTS_LIST: BlogPost[] = [
  BLOG_POSTS['optimizing-desktop-latency'],
  BLOG_POSTS['privacy-first-components'],
  BLOG_POSTS['command-line-ai'],
]

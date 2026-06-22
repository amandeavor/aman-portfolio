import type { ReactNode } from 'react'

import obsidianImg from '../assets/obsidiankit-cover.webp'
import aetherisImg from '../assets/AetherisOS.png'
import gurunanakImg from '../assets/gurunanakacademy.webp'
import sweeprImg from '../assets/sweepr.webp'
import momentumImg from '../assets/momentum.webp'
import intelligenceImg from '../assets/AmanIntelligence.png'

export interface Project {
  id: string
  title: string
  tagline: string
  category: string
  year: string
  liveUrl: string
  gradientFrom: string
  gradientTo: string
  borderColor: string
  aboutParagraphs: string[]
  flexibilityHeading: string
  flexibilityText: string
  visualLanguageHeading: string
  visualLanguageText1: string
  visualLanguageText2: string
  structuredStorytellingHeading: string
  structuredStorytellingText1: string
  structuredStorytellingText2: string
  builtForRealUseHeading: string
  builtForRealUseText: string
  growthHeading: string
  growthText: string
  clarityHeading: string
  clarityText: string
  coverImage: string
  showcaseLeft: ReactNode
  showcaseRight: ReactNode
  tiltedShowcase: ReactNode
}

export const PROJECTS_DATA: Record<string, Project> = {
  obsidiankit: {
    id: 'obsidiankit',
    title: 'ObsidianKit',
    tagline: 'ObsidianKit is a clean, modular React component library designed to build obsidian-themed markdown notes, dashboard grids, and publishing portals. Designed for high performance, custom styling, and layout efficiency.',
    category: 'React UI Kit / Component Library',
    year: '2026',
    liveUrl: 'https://obsidiankit.me',
    gradientFrom: '',
    gradientTo: '',
    borderColor: '',
    aboutParagraphs: [
      'ObsidianKit is a refined React component library built for developers who want to create clean, high-performance web applications with a tactile, editor-inspired aesthetic.',
      'It integrates modular component structures, markdown layouts, and dark-mode optimization out of the box, allowing you to launch documentation portals, blogs, and publishing sites in minutes.'
    ],
    flexibilityHeading: 'Designed for Flexibility and Customization',
    flexibilityText: 'Every component in ObsidianKit is built using semantic structures and is styleable with Tailwind CSS. It supports custom typography, theme tokens, and layout presets, giving you absolute control over your note-taking or publishing application.',
    visualLanguageHeading: 'Tactile Visuals',
    visualLanguageText1: 'ObsidianKit uses a high-contrast layout system. Thin, clean borders define each section, while generous margins and negative space keep the design breathing and readable.',
    visualLanguageText2: 'The colors are locked to neutral tones, allowing text content and visual components to carry the visual weight.',
    structuredStorytellingHeading: 'Content First',
    structuredStorytellingText1: 'The components are designed to present complex documentation and nested lists elegantly. From sidebars to tables of contents, everything is structured logically.',
    structuredStorytellingText2: 'Users can navigate through nested pages with speed and visual comfort.',
    builtForRealUseHeading: 'Production Ready',
    builtForRealUseText: 'Fully typed with TypeScript, optimized for lightweight bundle sizes, and tested across modern responsive viewports to ensure seamless user experience.',
    growthHeading: 'Ready to Scale',
    growthText: 'Whether building a personal knowledge base or a corporate wiki, ObsidianKit provides the building blocks to support expanding documents.',
    clarityHeading: 'Absolute Performance',
    clarityText: 'No heavy bundle sizes or complex states. Designed with standard React APIs, it remains highly responsive under any document load.',
    coverImage: obsidianImg,
    showcaseLeft: (
      <div className="w-full h-full bg-[#f4f3ef] p-6 rounded-[20px] flex flex-col justify-between text-zinc-900 border border-zinc-200 shadow-sm text-left font-sans">
        <div className="flex justify-between items-center">
          <span className="text-[9px] font-bold tracking-widest text-purple-600 uppercase">MODULAR SIDEBAR</span>
          <span className="text-[10px] opacity-40">01 / 04</span>
        </div>
        <div className="my-6">
          <h4 className="text-xl font-bold tracking-tight mb-2 leading-tight">Interactive Navigation</h4>
          <p className="text-[10px] text-zinc-500 leading-relaxed max-w-[24ch]">Sidebar components supporting nested page groups and instant search filtering.</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-zinc-200 shadow-sm text-[8px] font-sans flex flex-col gap-1">
          <span className="font-bold text-zinc-800">📂 Workspace</span>
          <span className="pl-3 text-purple-600">📄 Button.tsx</span>
          <span className="pl-3 text-zinc-500">📄 Card.tsx</span>
        </div>
      </div>
    ),
    showcaseRight: (
      <div className="w-full h-full bg-[#0d0e12] p-6 rounded-[20px] flex flex-col justify-between text-white border border-zinc-900 text-left font-sans">
        <div className="flex justify-between items-center">
          <span className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase">PRESET THEMES</span>
          <span className="text-[10px] opacity-40">02 / 04</span>
        </div>
        <div className="my-6">
          <h4 className="text-xl font-bold tracking-tight mb-2 leading-tight">Dark Mode Native</h4>
          <p className="text-[10px] text-zinc-400 leading-relaxed max-w-[24ch]">Fully optimized theme variants that load instantly based on preference variables.</p>
        </div>
        <div className="flex gap-2 justify-center">
          <span className="w-6 h-6 rounded-full bg-[#fcfbfa] border border-zinc-700 shadow-sm" />
          <span className="w-6 h-6 rounded-full bg-[#0d0e12] border border-zinc-700 shadow-sm" />
        </div>
      </div>
    ),
    tiltedShowcase: (
      <div className="relative w-full h-[320px] sm:h-[400px] md:h-[450px] overflow-hidden flex items-center justify-center p-4 bg-[#f4f3ef]/30">
        <div className="absolute inset-0 bg-[#dfdcd6]/10 flex items-center justify-center" />
        <div className="relative w-full max-w-4xl grid grid-cols-3 gap-6 transform rotate-[-6deg] scale-[1.08] origin-center">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-lg border border-zinc-200/50 p-3 h-[300px] flex flex-col justify-between text-left font-sans">
              <div className="flex items-center gap-1 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
              </div>
              <div className="flex-grow bg-[#fcfbfa] rounded-lg overflow-hidden p-3 border border-zinc-200/50 flex flex-col justify-between shadow-inner">
                <span className="text-[6px] tracking-widest text-purple-600 uppercase">CARD {item}</span>
                <span className="text-lg font-bold leading-tight font-display text-zinc-900">Obsidian UI<br />Layout</span>
                <div className="h-16 w-full rounded bg-white border border-zinc-150 shadow-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  'aetheris-os': {
    id: 'aetheris-os',
    title: 'Aetheris OS',
    tagline: 'Aetheris OS is a custom, performance-focused operating system built on Void Linux. Equipped with native Rust subsystems, zstd system compression, nested Gamescope layers, and strict AppArmor policies, it delivers ultra-low system latency and modular design.',
    category: 'Custom Operating System',
    year: '2026',
    liveUrl: 'https://github.com/amandeavor/aetheris-os',
    gradientFrom: '',
    gradientTo: '',
    borderColor: '',
    aboutParagraphs: [
      'Aetheris OS is an upcoming lightweight Linux distribution engineered for power users, developers, and low-latency gaming. Built on top of the Void Linux runit init system and using a custom-tuned BORE kernel, it operates with minimum system background noise.',
      'The flagship OS integrates custom Rust/Tauri client installers, system managers, and a Wayland-based Labwc desktop shell configured to compile visual theme tokens dynamically.'
    ],
    flexibilityHeading: 'Flagship Architecture & Subsystems',
    flexibilityText: 'Designed to replace heavy default packages, Aetheris OS runs its core user-space tools (like VelocityInstall, VelocityStore, and VelocitySetup) on ultra-lightweight Svelte and GTK4 backends. Idle memory usage stays under 35MB for individual desktop apps, enabling rapid, non-blocking hardware operations.',
    visualLanguageHeading: 'Prismatic Ultraviolet Design',
    visualLanguageText1: 'Features a futuristic dark slate background (#0F172A) highlighted by intense ultraviolet accents. The interface uses Nacelle typography for clean labels and Geist Mono for terminal consoles.',
    visualLanguageText2: 'Flat layout boundaries and thin borders are animated with fluid, non-overshooting spring physics for visual refinement.',
    structuredStorytellingHeading: 'Low-Latency Gaming',
    structuredStorytellingText1: 'Combines Labwc with nested Gamescope, VRR sync, and tearing-control protocols, decreasing overall visual input delay to under 2ms.',
    structuredStorytellingText2: 'The custom GameMode runit service adjusts CPU schedulers, limits background page compaction, and toggles Transparent Hugepages on game launch.',
    builtForRealUseHeading: 'VelocityShield Security',
    builtForRealUseText: 'Secured with path-centric AppArmor profiles, default-drop nftables firewall rules, global Flatpak sandbox overrides, and signed UKI binaries bound to PCR 7 + 15 TPM2 keys.',
    growthHeading: 'VelocityStore Packages',
    growthText: 'Queries AppStream indices and Flatpak overrides locally using SQLite under 5ms, communicating xbps transactions via Rust FFI streams.',
    clarityHeading: 'VelocityInstall Setup',
    clarityText: 'Processes Btrfs root layout formatting, dual-boot BitLocker safety verifications, and automated OEM preseeds.',
    coverImage: aetherisImg,
    showcaseLeft: (
      <div className="w-full h-full bg-[#0a0f1d] p-6 rounded-[20px] flex flex-col justify-between text-white border border-zinc-900 text-left font-sans">
        <span className="text-[9px] font-bold tracking-widest text-violet-400 uppercase">APP DISTRIBUTION</span>
        <div className="my-4">
          <h4 className="text-lg font-bold tracking-tight mb-2 leading-tight">VelocityStore</h4>
          <p className="text-[10px] text-zinc-400 leading-relaxed max-w-[24ch]">Direct libxbps Rust FFI bindings and custom Flatpak permission overrides management.</p>
        </div>
        <div className="bg-[#0f172a] p-3 rounded-lg border border-violet-950/40 text-[8px] font-mono text-zinc-300">
          <code>$ xbps-install -S velocity-desktop</code>
        </div>
      </div>
    ),
    showcaseRight: (
      <div className="w-full h-full bg-[#0c0d12] p-6 rounded-[20px] flex flex-col justify-between text-white border border-zinc-800/40 text-left font-sans">
        <span className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase">PERFORMANCE TELEMETRY</span>
        <div className="my-4">
          <h4 className="text-lg font-bold tracking-tight mb-2 leading-tight">Input Latency</h4>
          <p className="text-[10px] text-zinc-400 leading-relaxed max-w-[24ch]">Sub-2ms input latency via async tearing-control-v1 protocols and BORE scheduling.</p>
        </div>
        <div className="flex items-end justify-between gap-1 h-12 w-full pt-2 border-b border-zinc-800">
          {[20, 15, 12, 10, 8, 4, 2].map((h, i) => (
            <div key={i} className="flex-grow bg-violet-600/80 rounded-t" style={{ height: `${(h / 20) * 100}%` }} />
          ))}
        </div>
      </div>
    ),
    tiltedShowcase: (
      <div className="relative w-full h-[320px] sm:h-[400px] md:h-[450px] overflow-hidden flex items-center justify-center p-4 bg-[#0a0f1d]">
        <div className="absolute inset-0 bg-violet-950/5 flex items-center justify-center" />
        <div className="relative w-full max-w-4xl grid grid-cols-3 gap-6 transform rotate-[-6deg] scale-[1.08] origin-center">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-[#0f172a] rounded-xl shadow-2xl border border-violet-950/40 p-3 h-[300px] flex flex-col justify-between text-white text-left font-sans">
              <div className="flex items-center gap-1 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              </div>
              <div className="flex-grow bg-[#0a0f1d] rounded-lg overflow-hidden p-3 border border-zinc-900 flex flex-col justify-between shadow-inner">
                <span className="text-[6px] tracking-widest text-violet-400 uppercase">SUBSYSTEM {item}</span>
                <span className="text-lg font-bold leading-tight font-display text-white">VelocityShield<br />AppArmor</span>
                <div className="h-16 w-full rounded bg-[#0f172a] border border-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  gurunanakacademy: {
    id: 'gurunanakacademy',
    title: 'GuruNanakAcademy',
    tagline: 'GuruNanakAcademy is an educational portal website designed for student portal systems, school announcements management, and online resources delivery. Optimized for clean layouts and page performance.',
    category: 'Educational Portal',
    year: '2026',
    liveUrl: 'https://gurunanakacademy.netlify.app/',
    gradientFrom: '',
    gradientTo: '',
    borderColor: '',
    aboutParagraphs: [
      'GuruNanakAcademy is a full web portal designed for educational institutions to coordinate class assets, school announcements, and student resources.',
      'It focuses on rendering information hierarchies cleanly, ensuring that students, teachers, and parents can access course curriculum and event details efficiently.'
    ],
    flexibilityHeading: 'Portal Hierarchies, Optimized for Loading',
    flexibilityText: 'Built with structured directories, GuruNanakAcademy provides separate dashboard containers for curriculum, updates, and school calendars. This separation supports fast queries and reduces initial payload sizes.',
    visualLanguageHeading: 'Professional & Restrained',
    visualLanguageText1: 'The layout utilizes a soft red and neutral theme, communicating academic values while maintaining an interface that reads as modern and custom.',
    visualLanguageText2: 'Large clean text blocks, clear tables, and border-divided categories ensure absolute readability of textual school updates.',
    structuredStorytellingHeading: 'Academic Flow',
    structuredStorytellingText1: 'The homepage is designed to deliver immediate value—presenting active school announcements, introducing calendar events, and leading directly to portal entry points.',
    structuredStorytellingText2: 'This guarantees users locate administrative documents and portals instantly.',
    builtForRealUseHeading: 'Built with TypeScript',
    builtForRealUseText: 'Using modern TypeScript components, the academy portal structures course models and announcement lists statically to avoid runtime reference crashes.',
    growthHeading: 'Resource Archives',
    growthText: 'As semesters roll forward, school archives scale. The curriculum directory supports nested documentation nodes to catalog older class assets.',
    clarityHeading: 'Student Hub',
    clarityText: 'A dedicated dashboard portal summarizing active classes, upcoming tests, and administrative resources in one single panel.',
    coverImage: gurunanakImg,
    showcaseLeft: (
      <div className="w-full h-full bg-[#fff] p-6 rounded-[20px] flex flex-col justify-between text-zinc-900 border border-zinc-200 shadow-sm text-left">
        <span className="text-[9px] font-bold tracking-widest text-rose-500 uppercase">CURRICULUM PORTAL</span>
        <div className="my-4">
          <h4 className="text-lg font-bold tracking-tight mb-2 leading-tight">Course Outlines</h4>
          <p className="text-[10px] text-zinc-500 leading-relaxed">Access and download learning resources, homework updates, and calendar sheets.</p>
        </div>
        <div className="relative w-full h-12 rounded bg-gradient-to-r from-rose-400/20 to-indigo-400/20 flex items-center justify-center border border-rose-100">
          <span className="text-[8px] font-bold text-rose-600">Download Curriculum</span>
        </div>
      </div>
    ),
    showcaseRight: (
      <div className="w-full h-full bg-[#fdfaf8] p-6 rounded-[20px] flex flex-col justify-between text-zinc-900 border border-rose-100 shadow-sm text-left">
        <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">ACADEMY UPDATES</span>
        <div className="my-4">
          <h4 className="text-lg font-bold tracking-tight mb-2 leading-tight">Announcements</h4>
          <p className="text-[10px] text-zinc-500 leading-relaxed">Stay updated with event postings, calendar shifts, and school terms.</p>
        </div>
        <div className="flex gap-1.5 justify-center">
          <span className="w-4 h-4 rounded-full bg-rose-500 border border-white shadow-sm" />
          <span className="w-4 h-4 rounded-full bg-indigo-500 border border-white shadow-sm" />
        </div>
      </div>
    ),
    tiltedShowcase: (
      <div className="relative w-full h-[320px] sm:h-[400px] md:h-[450px] overflow-hidden flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[#f43f5e]/5 flex items-center justify-center" />
        <div className="relative w-full max-w-4xl grid grid-cols-3 gap-6 transform rotate-[-6deg] scale-[1.08] origin-center">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-lg border border-zinc-200/50 p-3 h-[300px] flex flex-col justify-between text-left">
              <div className="flex items-center gap-1 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
              </div>
              <div className="flex-grow bg-[#fff] rounded-lg overflow-hidden p-3 border border-rose-500/10 flex flex-col justify-between shadow-inner font-sans">
                <span className="text-[6px] tracking-widest text-rose-500 uppercase">TAB {item}</span>
                <span className="text-lg font-bold leading-tight font-display text-zinc-900">Student Portal<br />Courses</span>
                <div className="h-16 w-full rounded bg-rose-500/5 border border-rose-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  sweepr: {
    id: 'sweepr',
    title: 'sweepr',
    tagline: 'sweepr is a command-line developer utility written in Python. It automatically sweeps, organizes, and classifies messy folders based on custom extension structures and rules.',
    category: 'Developer Tool / Python CLI',
    year: '2026',
    liveUrl: 'https://github.com/amandeavor/sweepr',
    gradientFrom: '',
    gradientTo: '',
    borderColor: '',
    aboutParagraphs: [
      'sweepr is a lightweight developer automation script designed to maintain system directory cleanliness without manual file classification sorting.',
      'It compiles file extension statistics, matches custom mapping rules, and safely migrates untracked files into sorted folders in milliseconds.'
    ],
    flexibilityHeading: 'Configurable Rules, Automated Cleans',
    flexibilityText: 'Sweepr relies on a clean, descriptive JSON or command configuration map. Users can define custom folder destination mappings (e.g. all `.zip` and `.tar.gz` files into /Archives), run dry-runs, and undo actions.',
    visualLanguageHeading: 'Terminal-Driven',
    visualLanguageText1: 'The layout of sweepr is built for terminal output. Minimal color formatting and clean logs provide a robust user experience directly inside shell scripts.',
    visualLanguageText2: 'Verbose warning logs and summary counts ensure you always understand what actions the CLI has processed.',
    structuredStorytellingHeading: 'Safe Operations',
    structuredStorytellingText1: 'Incorporates dry-run capabilities to log planned directory modifications without executing them. This ensures absolute safety before modifying system files.',
    structuredStorytellingText2: 'Logs are formatted clearly, showing destination and source locations for every item.',
    builtForRealUseHeading: 'Python Native',
    builtForRealUseText: 'Leverages lightweight standard library dependencies, guaranteeing fast execution and easy global script installations.',
    growthHeading: 'Batch Processing',
    growthText: 'Handles thousands of directory entries concurrently, indexing file sizes and classifying types with fast file-handle operations.',
    clarityHeading: 'CLI Status',
    clarityText: 'Emits structured, clean standard output status reviews, simplifying scripting integration and cron scheduler automation.',
    coverImage: sweeprImg,
    showcaseLeft: (
      <div className="w-full h-full bg-[#121215] p-6 rounded-[20px] flex flex-col justify-between text-white border border-zinc-900 text-left font-sans">
        <span className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase">CLI CONTROL</span>
        <div className="my-4">
          <h4 className="text-lg font-bold tracking-tight mb-2 leading-tight">Console Output</h4>
          <p className="text-[10px] text-zinc-400 leading-relaxed">Emits structured console logs and process tracking bars directly into your active shell session.</p>
        </div>
        <div className="bg-[#1c1c1e] p-3 rounded-lg border border-zinc-800 text-[8px] font-mono text-zinc-400">
          <code>$ sweepr --status</code>
        </div>
      </div>
    ),
    showcaseRight: (
      <div className="w-full h-full bg-[#1c1c1e] p-6 rounded-[20px] flex flex-col justify-between text-white border border-zinc-850 text-left font-sans">
        <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">EXTENSION MATCH</span>
        <div className="my-4">
          <h4 className="text-lg font-bold tracking-tight mb-2 leading-tight">JSON Configuration</h4>
          <p className="text-[10px] text-zinc-400 leading-relaxed font-sans">Map custom file extension strings to target directory locations with absolute ease.</p>
        </div>
        <div className="bg-zinc-950 p-2 rounded border border-zinc-800 text-[7px] font-mono text-indigo-400">
          <pre>{`{
  "ignore": ["node_modules", "dist"]
}`}</pre>
        </div>
      </div>
    ),
    tiltedShowcase: (
      <div className="relative w-full h-[320px] sm:h-[400px] md:h-[450px] overflow-hidden flex items-center justify-center p-4 bg-[#121215]">
        <div className="absolute inset-0 bg-white/5 flex items-center justify-center" />
        <div className="relative w-full max-w-4xl grid grid-cols-3 gap-6 transform rotate-[-6deg] scale-[1.08] origin-center">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-zinc-800 rounded-xl shadow-2xl border border-zinc-700 p-3 h-[300px] flex flex-col justify-between text-white text-left font-sans">
              <div className="flex items-center gap-1 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              </div>
              <div className="flex-grow bg-zinc-900 rounded-lg overflow-hidden p-3 border border-zinc-800 flex flex-col justify-between">
                <span className="text-[6px] tracking-widest text-zinc-400 uppercase">DRYRUN {item}</span>
                <span className="text-lg font-bold leading-tight font-display">Command Line<br />Simulate</span>
                <div className="h-16 w-full rounded bg-zinc-950 border border-zinc-850" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  momentum: {
    id: 'momentum',
    title: 'Momentum',
    tagline: 'Momentum is a personal productivity dashboard and focus planner designed to help developers stay structured. It features Pomodoro timer cycles, task checklists, and daily analytics dashboards.',
    category: 'Productivity Dashboard',
    year: '2025',
    liveUrl: 'https://github.com/amandeavor/Momentum',
    gradientFrom: '',
    gradientTo: '',
    borderColor: '',
    aboutParagraphs: [
      'Momentum is built as a lightweight utility web application designed to counter browser distractions and help developers focus on key daily goals.',
      'It leverages local storage structures and React state rendering to offer quick, offline-capable time tracking and task scheduling dashboards.'
    ],
    flexibilityHeading: 'Simple Workflows, Zero Friction',
    flexibilityText: 'The core design concept of Momentum is removing friction. By launching directly into a focused input box, developers can log their main task in under 2 seconds. The browser dashboard coordinates active goals alongside timers.',
    visualLanguageHeading: 'Vibrant & Clean',
    visualLanguageText1: 'Momentum utilizes high-contrast color highlights like neon indigo and purple to separate different dashboard focus states.',
    visualLanguageText2: 'A minimal workspace aesthetic keeps visual distractions to a minimum, ensuring your eyes focus on the timer and tasks.',
    structuredStorytellingHeading: 'Focus Timeline',
    structuredStorytellingText1: 'Designed to represent focus as a chronological line. Active Pomodoro intervals are presented side-by-side with completed slots.',
    structuredStorytellingText2: 'Users can visually review their daily session blocks and track patterns.',
    builtForRealUseHeading: 'Optimized utility',
    builtForRealUseText: 'Runs entirely on local storage without remote servers. This guarantees instant load times, zero data footprint, and complete privacy.',
    growthHeading: 'Focus Metrics',
    growthText: 'As you track sessions, Momentum logs daily counts to render bar charts of weekly focus intervals and goal completion rates.',
    clarityHeading: 'Command Center',
    clarityText: 'Offers a single dashboard screen summarizing tasks, current session status, and daily goals in one unified layout.',
    coverImage: momentumImg,
    showcaseLeft: (
      <div className="w-full h-full bg-[#0a0a0c] p-6 rounded-[20px] flex flex-col justify-between text-white border border-zinc-900 text-left font-sans">
        <span className="text-[9px] font-bold tracking-widest text-[#684cf4] uppercase">TIME BLOCKING</span>
        <div className="my-4">
          <h4 className="text-lg font-bold tracking-tight mb-2">Pomodoro Cycles</h4>
          <p className="text-[10px] text-zinc-400 leading-relaxed">Integrated session structures managing focus and break configurations automatically.</p>
        </div>
        <div className="bg-[#1c1c1e] p-3 rounded-lg border border-zinc-800 text-[8px] font-mono text-green-400">
          <code>[system] Pomodoro cycle 1 completed (25m)</code>
        </div>
      </div>
    ),
    showcaseRight: (
      <div className="w-full h-full bg-[#121215] p-6 rounded-[20px] flex flex-col justify-between text-white border border-zinc-900 text-left font-sans">
        <span className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase">WEEKLY SUMMARY</span>
        <div className="my-4">
          <h4 className="text-lg font-bold tracking-tight mb-2">Metrics Chart</h4>
          <p className="text-[10px] text-zinc-400 leading-relaxed">Observe daily hours of focus and session intervals in real time.</p>
        </div>
        <div className="flex items-end justify-between gap-1 h-12 w-full pt-2 border-b border-zinc-800">
          {[40, 60, 45, 80, 50, 95, 70].map((h, i) => (
            <div key={i} className="flex-grow bg-indigo-500/80 rounded-t" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    ),
    tiltedShowcase: (
      <div className="relative w-full h-[320px] sm:h-[400px] md:h-[450px] overflow-hidden flex items-center justify-center p-4 bg-[#0a0a0c]">
        <div className="absolute inset-0 bg-[#684cf4]/5 flex items-center justify-center" />
        <div className="relative w-full max-w-4xl grid grid-cols-3 gap-6 transform rotate-[-6deg] scale-[1.08] origin-center">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-zinc-950 rounded-xl shadow-2xl border border-zinc-800 p-3 h-[300px] flex flex-col justify-between text-white text-left font-sans">
              <div className="flex items-center gap-1 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
              </div>
              <div className="flex-grow bg-[#0a0a0c] rounded-lg overflow-hidden p-3 border border-zinc-900 flex flex-col justify-between">
                <span className="text-[6px] tracking-widest text-indigo-400 uppercase">MODULE {item}</span>
                <span className="text-lg font-bold leading-tight font-display">Daily Goals<br />Planner</span>
                <div className="h-16 w-full rounded bg-zinc-950 border border-zinc-900" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  'aman-intelligence': {
    id: 'aman-intelligence',
    title: 'AmanIntelligence',
    tagline: 'AmanIntelligence is a high-speed AI command-line interface assistant that integrates LLM code generation, terminal commands explanation, and workspace context parsing directly into your terminal environment.',
    category: 'AI Assistant / CLI Tool',
    year: '2026',
    liveUrl: 'https://github.com/amandeavor/aman-intelligence-CLI',
    gradientFrom: '',
    gradientTo: '',
    borderColor: '',
    aboutParagraphs: [
      'AmanIntelligence is designed to bring powerful LLM intelligence directly to developer workspaces without browser window context switches.',
      'It supports workspace folder parsing, multi-file code explanations, and natural-language terminal commands conversion, allowing you to ask queries and execute commands with speed and safety.'
    ],
    flexibilityHeading: 'Terminal-First Workflow',
    flexibilityText: 'Designed to run instantly on any machine with simple npm installations. By utilizing fast standard output interfaces and secure API key mappings, it provides zero-lag code audits and terminal scripting execution.',
    visualLanguageHeading: 'Console Tactility',
    visualLanguageText1: 'The visual details are inspired by terminal output buffers. Using monospace layouts, clean log tags, and low-contrast borders, it maintains focus on command text.',
    visualLanguageText2: 'A clean, light neutral page-wide theme provides structural contrast against dark code terminal sections.',
    structuredStorytellingHeading: 'Logical Operations',
    structuredStorytellingText1: 'Input prompts are handled chronologically. Code suggestions are written to separate temp files so you can review diffs before saving.',
    structuredStorytellingText2: 'This pipeline keeps workspace directories safe from destructive automatic modifications.',
    builtForRealUseHeading: 'TypeScript Architecture',
    builtForRealUseText: 'Fully typed with TypeScript, leveraging fast command parsers, and packaged with zero heavy third-party bundle dependencies.',
    growthHeading: 'Context Expansion',
    growthText: 'Index directories and parse complex multi-file workspaces into lightweight context summaries for prompt inputs.',
    clarityHeading: 'CLI Output',
    clarityText: 'Emits highly readable markdown code highlight buffers and transaction status progress lines directly to stderr.',
    coverImage: intelligenceImg,
    showcaseLeft: (
      <div className="w-full h-full bg-[#121215] p-6 rounded-[20px] flex flex-col justify-between text-white border border-zinc-900 text-left font-sans">
        <span className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase">CLI CONTROL</span>
        <div className="my-4">
          <h4 className="text-lg font-bold tracking-tight mb-2 leading-tight">Console Output</h4>
          <p className="text-[10px] text-zinc-400 leading-relaxed">Emits structured console logs and process tracking bars directly into your active shell session.</p>
        </div>
        <div className="bg-[#1c1c1e] p-3 rounded-lg border border-zinc-800 text-[8px] font-mono text-zinc-400">
          <code>$ aman-intelligence --status</code>
        </div>
      </div>
    ),
    showcaseRight: (
      <div className="w-full h-full bg-[#1c1c1e] p-6 rounded-[20px] flex flex-col justify-between text-white border border-zinc-800 text-left font-sans">
        <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">CONTEXT MATCHER</span>
        <div className="my-4">
          <h4 className="text-lg font-bold tracking-tight mb-2 leading-tight">Workspace Config</h4>
          <p className="text-[10px] text-zinc-400 leading-relaxed font-sans">Index and summarize workspace layouts dynamically to feed code files to prompt contexts.</p>
        </div>
        <div className="bg-zinc-950 p-2 rounded border border-zinc-800 text-[7px] font-mono text-indigo-400">
          <pre>{`{
  "ignore": ["node_modules", "dist"]
}`}</pre>
        </div>
      </div>
    ),
    tiltedShowcase: (
      <div className="relative w-full h-[320px] sm:h-[400px] md:h-[450px] overflow-hidden flex items-center justify-center p-4 bg-[#121215]">
        <div className="absolute inset-0 bg-white/5 flex items-center justify-center" />
        <div className="relative w-full max-w-4xl grid grid-cols-3 gap-6 transform rotate-[-6deg] scale-[1.08] origin-center">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-zinc-800 rounded-xl shadow-2xl border border-zinc-700 p-3 h-[300px] flex flex-col justify-between text-white text-left font-sans">
              <div className="flex items-center gap-1 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              </div>
              <div className="flex-grow bg-zinc-900 rounded-lg overflow-hidden p-3 border border-zinc-800 flex flex-col justify-between font-sans">
                <span className="text-[6px] tracking-widest text-zinc-400 uppercase">DRYRUN {item}</span>
                <span className="text-lg font-bold leading-tight font-display text-white">Command Line<br />Simulate</span>
                <div className="h-16 w-full rounded bg-zinc-950 border border-zinc-850" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export const PROJECTS_LIST: Project[] = [
  PROJECTS_DATA.obsidiankit,
  PROJECTS_DATA['aetheris-os'],
  PROJECTS_DATA.gurunanakacademy,
  PROJECTS_DATA.sweepr,
  PROJECTS_DATA.momentum,
  PROJECTS_DATA['aman-intelligence'],
]

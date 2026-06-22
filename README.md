# ⚡ Aman's Portfolio

Welcome to the official repository for my personal developer portfolio site—a performance-first, custom-designed, and interactive showcase built to highlight my work in software engineering, systems design, and frontend interfaces.

✨ **Live Site:** [portfolio.amandeavor.me](https://portfolio.amandeavor.me) (or check out [github.com/amandeavor/aman-portfolio](https://github.com/amandeavor/aman-portfolio))

---

## 👨‍💻 About Me
I'm a builder and developer based in India, currently working at the intersection of high-performance frontend interfaces, custom operating systems, and AI developer utilities. My philosophy is simple: **build tools that move fast, stay simple, and perform in real-world use.**

---

## 🚀 Featured Projects Showcased

The portfolio showcases several of my primary open-source systems and applications:

| Project | Description | Technology Stack |
| :--- | :--- | :--- |
| **[ObsidianKit](https://obsidiankit.me)** | A clean, modular React component library for tactile, editor-inspired markdown notes & documentation portals. | React 19, Tailwind CSS, TypeScript |
| **[Aetheris OS](https://github.com/amandeavor/aetheris-os)** | A custom, performance-tuned Linux operating system built on Void Linux with sub-2ms input latency and BORE scheduling. | Void Linux, Rust, Wayland/wlroots, Labwc |
| **[AmanIntelligence CLI](https://github.com/amandeavor/aman-intelligence-CLI)** | A high-speed AI command-line helper incorporating secure local LLM prompt execution and code diff auditing. | TypeScript, Node.js, OpenAI & Claude APIs |
| **[sweepr](https://github.com/amandeavor/sweepr)** | A lightweight developer automation utility that cleans and organizes messy system directories in milliseconds. | Python, JSON Rules |
| **[Momentum](https://github.com/amandeavor/Momentum)** | A local-first, zero-telemetry Pomodoro developer focus tool and daily planner. | React, LocalStorage, CSS |
| **[GuruNanakAcademy](https://gurunanakacademy.netlify.app/)** | A clean, optimized academic announcements web portal designed for educational institutions. | React, TypeScript, Tailwind |

---

## 🛠️ The Portfolio Codebase

Rather than using templated defaults, this portfolio is custom-engineered with focus on fluid UI interactions, gesture navigation, and lightweight bundle optimization.

### Key Technical Details & Animations

1. **3D Parallax Scroll Landing Card**
   * Translates vertical window scroll coordinates into 3D transforms (`rotateY`), spring scaling, grayscale filters, and background color shifts on the main profile portrait.
   * Utilizes GPU-accelerated layers via `will-change: transform` to maintain a solid 60/120fps during scrolling.

2. **Silky View Transitions (Dark Mode Ripple)**
   * Leverages the experimental **View Transitions API** to animate the dark-light theme toggle.
   * Creates a modern circular clip-path ripple starting exactly from the clicked button coordinates, with a smooth CSS cross-fade transition fallback for unsupported browsers.

3. **Mobile Gesture System (Swipe-to-Go-Back)**
   * Implements a custom, native-feeling swipe gesture. Swiping right from the left edge (first `50px` of the screen) triggers a history navigation back event to exit full details pages.

4. **Zero-Flicker Image Loading**
   * Eliminates the typical loading and rendering flash of heavy images. Uses synchronous decoding pre-hints (`decoding="sync"`) on critical WebP assets.

5. **Lenis Smooth Scroll Integration**
   * Integrates Lenis smooth scrolling for a premium mechanical page glide, falling back gracefully on low-power devices and users with `prefers-reduced-motion` enabled.

---

## 📦 Tech Stack

* **Core Framework:** React 19 (custom state-driven routing)
* **Language:** TypeScript
* **Styling Engine:** Tailwind CSS v4 (fully utility-driven)
* **Motion & Physics:** Motion (formerly Framer Motion)
* **Icons:** Phosphor Icons

---

## 💻 Local Setup & Development

To clone, run, and build the portfolio codebase locally on your machine, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/amandeavor/aman-portfolio.git
cd aman-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
Starts the local development server with Vite:
```bash
npm run dev
```

### 4. Build for Production
Compiles TypeScript assets and builds the production bundle:
```bash
npm run build
```

### 5. Preview Production Build
Runs a local web server serving the built `dist` folder assets:
```bash
npm run preview
```

---

## 📄 License
This repository is open source. Feel free to explore, fork, and use details for your own projects.
🛠️ Developed with passion by [Aman](https://github.com/amandeavor).

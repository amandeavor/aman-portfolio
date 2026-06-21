---
name: Aman Portfolio
description: Design System for Aman's design-centric software engineering portfolio.
colors:
  primary: "#121212"
  neutral-bg: "#FAF7F3"
  accent-red: "#991b1b"
  accent-sandy: "#eae9e4"
  border-dark: "#27272a"
  border-light: "#e4e4e7"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(2.5rem, 8vw, 4.5rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.05em"
rounded:
  xl: "12px"
  "2xl": "24px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.accent-sandy}"
    textColor: "{colors.primary}"
    rounded: "{rounded.xl}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "#f4f3ef"
  field-input:
    backgroundColor: "#1c1c1e"
    textColor: "#f4f3ef"
    rounded: "{rounded.xl}"
    padding: "14px 16px"
---

# Design System: Aman Portfolio

## 1. Overview

**Creative North Star: "The Kinetic Grotesque"**

"The Kinetic Grotesque" is a visual framework structured around heavy, high-contrast grotesque typography (**Archivo**), layered structural layout frames, and tactile material elements (warm parchment paper background `#FAF7F3`, high-detail grain noise, and glossy 3D assets). The flat design is set in motion by smooth kinetic momentum scrolling and physics-based transitions.

This system rejects SaaS visual monoculture, including soft ambient drop shadows, over-rounded card outlines, and tiny uppercase tracked labels above every block. Instead, it relies on strict grid boundaries and dramatic weight contrasts.

**Key Characteristics:**
- Heavy typographic density carrying the page layout.
- Solid ink blocks and border-driven containers.
- Warm, high-contrast, paper-like background.
- Motion as a physical material (scroll-driven 3D rotation, momentum physics).

## 2. Colors

A high-contrast, warm-monochrome palette. Heavy ink blocks contrast sharply against a light, textured parchment background.

### Primary
- **Off-Black Ink** (#121212): The primary ink color used for all body text, display headings, and dark container backgrounds.

### Neutral
- **Warm Parchment** (#FAF7F3): The sitewide page background color.
- **Sandy Gray** (#eae9e4): Used as a solid fill for buttons and primary CTAs.

### Accent
- **Crimson Red** (#991b1b): Used as the front-face background for the flipped profile avatar, symbolizing creative energy.

### Named Rules
**The Contrast Rule.** Text colors must maintain a contrast ratio of at least 4.5:1 against their backgrounds. Gray body text for "restraint" is strictly prohibited; body text must be off-black (#121212) on light backgrounds, and light gray/white on dark surfaces.

## 3. Typography

**Display Font:** Archivo (with sans-serif fallbacks)
**Body Font:** Archivo (with sans-serif fallbacks)

**Character:** A single-family typography pairing utilizing Archivo in high-contrast weights (900 Black for headers, 400 Normal for copy) to build a clean, bold, editorial look.

### Hierarchy
- **Display** (Black (900), text-[7.5vw], leading-[0.92], letter-spacing[-0.03em]): Used for major hero display typewriter roles.
- **Headline** (Semibold (600), text-5xl to text-7xl, leading-[1.05], letter-spacing[-0.02em]): Used for section titles (e.g. Featured Projects, Testimonials, Let's talk).
- **Title** (Bold (700), text-xl, leading-snug): Used for project names and card titles.
- **Body** (Normal (400), text-sm to text-base, leading-relaxed): Used for all body paragraph text, description cards, and emails.
- **Label** (Bold (700), text-xs to text-sm, uppercase): Used for tags, button actions, and field labels.

### Named Rules
**The Two-Line Cap Rule.** Hero typewriter display text must be restricted to exactly two lines, utilizing `whitespace-nowrap` on spans to prevent layout wrapping on mobile viewports.

## 4. Elevation

The visual system is flat-by-default. Depth is communicated through tonal layering and borders rather than drop shadows.

### Named Rules
**The Flat-By-Default Rule.** Cards, buttons, and form inputs are flat at rest. Dropshadows are completely prohibited except for a subtle, compact shadow on active interactive elements (like the navigation pill and buttons).

## 5. Components

### Navigation Pill
- **Shape:** Full pill (rounded-full)
- **Style:** Compact black block (#121212) floating top-center, containing the brand logo and a white menu dot button.
- **Modal Menu:** Drops down into a dark card with bold navigation links on hover/tap.

### Buttons
- **Shape:** Rounded corners (12px / rounded-xl)
- **Primary:** Sandy Gray fill (#eae9e4) with bold Off-Black (#121212) text.
- **Hover:** Fades to warm off-white (#f4f3ef) on hover.

### Inputs / Fields
- **Style:** Charcoal fill (#1c1c1e), bold labels, and a subtle dark gray border (border-zinc-800).
- **Focus:** Border transitions to lighter gray (border-zinc-700).
- **Textarea:** Supports vertical resizing within strict min-height (140px) and max-height (260px) limits, using a custom dark scrollbar.

## 6. Do's and Don'ts

### Do:
- **Do** map display headings to Archivo font-weight 600 or 900 with a tight negative letter-spacing (-0.03em).
- **Do** apply a zero-width space (`​`) and fixed line height to typewriter elements to stabilize dynamic heights.
- **Do** position 3D decorative assets relative to static centered wrappers (`w-full max-w-5xl mx-auto`) so they stay stationary.

### Don't:
- **Don't** use soft, wide drop shadows on cards or buttons.
- **Don't** use more than a single font family (Archivo) except for the documented Instrument Serif.
- **Don't** wrap display typewriter heading items into three lines.

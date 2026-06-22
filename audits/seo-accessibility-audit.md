# SEO and Accessibility (A11y) Audit

## Executive Summary
This audit evaluates the search engine optimization (SEO) and web accessibility (A11y) qualities of the Aman Portfolio. 

The site is built with highly semantic HTML structures and robust keyboard navigation setups. However, there are minor gaps in metadata (missing canonical tags) and missing search crawl instructions (`robots.txt`, `sitemap.xml`).

---

## 1. Search Engine Optimization (SEO)
### Strengths:
* **Dynamic Titles:** Titles are updated dynamically on hash transitions in `App.tsx`:
  * Default: `Aman | Software Engineer & Creator`
  * Detail Views: `${title} — Aman`
* **Meta Descriptions:** Descriptive descriptions are configured in `index.html`.
* **Social Previews:** Complete Open Graph (`og:`) and Twitter Card (`twitter:`) properties are fully defined, maximizing click-through rates when shared on social networks.
* **Robots Configuration:** `<meta name="robots" content="index, follow, max-image-preview:large" />` is properly set up.

### Areas for Improvement:
* **Missing Canonical Tag:** There is no `<link rel="canonical" href="https://yourdomain.com/" />` tag. Canonical tags are critical for single-page applications using hash systems to prevent search crawlers from index-splitting or treating `domain.com/` and `domain.com/#/about` as duplicate page iterations.
* **Missing Search Engine Assets:** The `public/` directory contains no `robots.txt` or `sitemap.xml`.
  * *Robots.txt:* Instructs search engine bots which pages or sections they can crawl.
  * *Sitemap.xml:* Maps out all routes (e.g. index, projects list, blog list, individual project/blog detail paths) to help indexing engines traverse the site.

---

## 2. Accessibility (A11y) & Usability
### Strengths:
* **Semantic Markups:** Navigation is wrapped in a `<header>` and `<nav aria-label="Primary">`. Sections use `<section>` with proper `aria-labelledby` referencing specific section headings (`#about-title`, `#projects-title`, etc.).
* **Keyboard Focus Visibility:** Focus outlines are explicitly configured in `index.css`:
  ```css
  a:focus-visible, button:focus-visible, ... {
    outline: 2px solid #121212;
    outline-offset: 3px;
  }
  ```
  This is optimized for light and dark modes, ensuring clear accessibility for keyboard-only users.
* **Skip-to-Content Link:** A skip link is implemented at the top of the body:
  ```html
  <a href="#main-content" className="skip-link">Skip to content</a>
  ```
  This allows screen-reader and keyboard users to skip the header navigation directly into the main content.
* **Decorations/Icons Access:** Visual components (such as icons in social blocks, arrow links) are configured with `aria-hidden="true"`, preventing screen readers from reading raw icon tag values or confusing navigational text.
* **Typewriter Cursor A11y:** The typewriter cursor uses a separate node and does not append literal character markers onto the text strings, which would disrupt screen-readers parsing the roles text.

### Areas for Improvement:
* **Decorative Sparks Alt Text:** The logo visual sparks (`starImg` and `boltImg`) in `Hero.tsx` use `alt="" aria-hidden="true"`. This is correct since they are purely decorative.
* **Avatar Description:** The main portrait avatar in `About.tsx` uses `alt="Aman"`. Providing a slightly more descriptive label like `alt="Aman's portrait"` or `alt="Aman, software engineer"` enhances accessibility for visually impaired users.
* **Contrast in Dark Mode:** Muted text spans in dark mode (using `#a1a1aa` and `text-zinc-600`) should be checked for WCAG AA standard color contrast ratios (minimum 4.5:1 for normal text).

---

## Recommendations
1. **Add Robots.txt and Sitemap.xml:**
   * Create `public/robots.txt`:
     ```txt
     User-agent: *
     Allow: /
     Sitemap: https://yourdomain.com/sitemap.xml
     ```
   * Create `public/sitemap.xml` mapping out standard URLs (including hash fallback representations).
2. **Add Canonical Tag:** In the `<head>` of `index.html`, add:
   ```html
   <link rel="canonical" href="https://yourdomain.com/" />
   ```
3. **Enhance Alt Attributes:** Improve the descriptive text for the main portrait avatar image:
   ```tsx
   alt="Aman — Software Engineer Portrait"
   ```

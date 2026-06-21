export function Footer() {
  const row1 = [
    { label: 'Home', href: '#' },
    { label: 'About Me', href: '#about' },
    { label: 'Services', href: '#services' },
  ]
  const row2 = [
    { label: 'Works', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="bg-[#0c0c0e] dark:bg-[#FAF7F3] text-zinc-100 dark:text-zinc-900 pt-28 pb-12 select-none relative overflow-hidden">

      {/* Massive Watermark - absolutely positioned behind content */}
      <div className="absolute inset-x-0 bottom-[-2vw] flex justify-center pointer-events-none z-0 overflow-hidden select-none">
        <span className="text-[24vw] font-bold text-white/[0.02] dark:text-black/[0.04] leading-none font-display uppercase whitespace-nowrap tracking-tighter">
          AMAN
        </span>
      </div>

      <div className="mx-auto max-w-4xl px-6 relative z-10">

        {/* Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 text-left pb-16 items-start">

          {/* Left Column: Heading */}
          <div className="md:col-span-5">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white dark:text-zinc-900 leading-[1.05] font-display md:-ml-20">
              Scaling<br />Start-ups<br />for Growth.
            </h2>
          </div>

          {/* Center Column: Quick Links */}
          <div className="md:col-span-4 flex flex-col items-start gap-3 md:-ml-10">
            <span className="text-[15px] font-bold text-zinc-400 dark:text-zinc-500 font-sans tracking-tight mb-1">
              /Quick links
            </span>
            <div className="flex flex-col gap-2">
              {/* Row 1 */}
              <div className="flex flex-row gap-2">
                {row1.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="px-5 py-2.5 bg-[#eae9e4] dark:bg-[#1f1f1f] hover:bg-zinc-300 dark:hover:bg-zinc-800 text-[13px] font-bold text-[#121212] dark:text-zinc-100 rounded-xl transition-all shadow-sm whitespace-nowrap"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              {/* Row 2 */}
              <div className="flex flex-row gap-2">
                {row2.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="px-5 py-2.5 bg-[#eae9e4] dark:bg-[#1f1f1f] hover:bg-zinc-300 dark:hover:bg-zinc-800 text-[13px] font-bold text-[#121212] dark:text-zinc-100 rounded-xl transition-all shadow-sm whitespace-nowrap"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Info */}
          <div className="md:col-span-3 flex flex-col items-start gap-3 md:pl-10">
            <span className="text-[15px] font-bold text-zinc-400 dark:text-zinc-500 font-sans tracking-tight mb-1">
              /Contact
            </span>
            <a
              href="mailto:amandeavor@gmail.com"
              className="text-base font-bold text-zinc-300 dark:text-zinc-600 hover:text-white dark:hover:text-zinc-900 transition-colors"
            >
              amandeavor@gmail.com
            </a>
          </div>
        </div>

      </div>

    </footer>
  )
}

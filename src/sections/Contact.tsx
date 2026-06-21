import React, { useState } from 'react'
import { motion } from 'motion/react'
import { LinkedinLogo, TwitterLogo, InstagramLogo, YoutubeLogo, GithubLogo, PaperPlaneRight } from '@phosphor-icons/react'

const SOCIAL_LINKS = [
  { icon: TwitterLogo, href: 'https://x.com/amandeavor', label: 'Twitter' },
  { icon: InstagramLogo, href: 'https://instagram.com/amandeavor', label: 'Instagram' },
  { icon: LinkedinLogo, href: 'https://linkedin.com/in/amandeavor', label: 'LinkedIn' },
  { icon: YoutubeLogo, href: 'https://youtube.com/@amandeavor', label: 'YouTube' },
  { icon: GithubLogo, href: 'https://github.com/amandeavor', label: 'GitHub' },
]

export function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.message) return

    // Simple robust email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formState.email)) {
      setError('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('https://formsubmit.co/ajax/amandeavor@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _subject: `New Portfolio Message from ${formState.name}`
        })
      })

      const result = await response.json()
      if (response.ok && result.success === 'true') {
        setSuccess(true)
        setFormState({ name: '', email: '', message: '' })
      } else {
        setError(result.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Failed to send message. Please check your internet connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-6 md:py-24 bg-paper dark:bg-[#111111] px-6 select-none">
      <div className="mx-auto max-w-6xl text-left">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Left Column: Let's talk & Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-6 flex flex-col justify-between h-full min-h-0 md:min-h-[380px] gap-8 md:gap-0"
          >
            <div>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-offblack dark:text-zinc-100 mb-4 font-display leading-[0.9]">
                Let's talk.
              </h2>
              <p className="text-zinc-500 text-sm md:text-base font-normal leading-relaxed mb-8 font-sans md:whitespace-nowrap">
                Have a project or need help? Fill out the form, and we'll get back to you soon.
              </p>
            </div>

            {/* Social Icons at the bottom-left */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((link, idx) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-10 h-10 rounded-xl bg-zinc-200/50 dark:bg-zinc-800/60 flex items-center justify-center text-offblack dark:text-zinc-300 border border-zinc-300/40 dark:border-zinc-700/40 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shadow-sm cursor-pointer"
                  >
                    <Icon size={18} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Right Column: Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-6 w-full bg-[#1f1f1f] dark:bg-[#FAF7F3] p-5 min-[375px]:p-8 rounded-[24px] shadow-lg border border-zinc-800/50 dark:border-zinc-200/60 relative overflow-hidden"
          >
            <div className="relative z-10">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-zinc-800 dark:bg-zinc-200 flex items-center justify-center text-zinc-100 dark:text-zinc-900 mb-2">
                  <PaperPlaneRight size={20} weight="fill" />
                </div>
                <h3 className="text-lg font-bold text-zinc-50 dark:text-zinc-900 font-display">Message sent</h3>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 max-w-[28ch] leading-relaxed">
                  Thank you for reaching out. I will get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="relative w-full">
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder=" "
                    className="peer block w-full bg-[#2b2b2b] dark:bg-white text-zinc-100 dark:text-zinc-900 rounded-xl px-4 pt-6 pb-2 text-sm transition-all focus:outline-none placeholder-transparent border border-zinc-800 dark:border-zinc-300 focus:border-zinc-700 dark:focus:border-zinc-400"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-4 text-xs font-bold text-zinc-400 dark:text-zinc-500 transition-all duration-200 transform origin-[0] -translate-y-2.5 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-focus:scale-75 peer-focus:-translate-y-2.5 pointer-events-none select-none font-sans"
                  >
                    Name
                  </label>
                </div>

                {/* Email */}
                <div className="relative w-full">
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder=" "
                    className="peer block w-full bg-[#2b2b2b] dark:bg-white text-zinc-100 dark:text-zinc-900 rounded-xl px-4 pt-6 pb-2 text-sm transition-all focus:outline-none placeholder-transparent border border-zinc-800 dark:border-zinc-300 focus:border-zinc-700 dark:focus:border-zinc-400"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-4 text-xs font-bold text-zinc-400 dark:text-zinc-500 transition-all duration-200 transform origin-[0] -translate-y-2.5 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-focus:scale-75 peer-focus:-translate-y-2.5 pointer-events-none select-none font-sans"
                  >
                    Email
                  </label>
                </div>

                {/* Message */}
                <div className="relative w-full">
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder=" "
                    className="peer block w-full bg-[#2b2b2b] dark:bg-white text-zinc-100 dark:text-zinc-900 rounded-xl px-4 pt-6 pb-2 text-sm transition-all focus:outline-none placeholder-transparent min-h-[140px] max-h-[260px] resize-y font-sans border border-zinc-800 dark:border-zinc-300 focus:border-zinc-700 dark:focus:border-zinc-400"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-4 top-4 text-xs font-bold text-zinc-400 dark:text-zinc-500 transition-all duration-200 transform origin-[0] -translate-y-2.5 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-focus:scale-75 peer-focus:-translate-y-2.5 pointer-events-none select-none font-sans"
                  >
                    Your Project
                  </label>
                </div>

                {error && (
                  <p className="text-red-500 text-xs font-semibold text-left mb-4">
                    {error}
                  </p>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full py-4 bg-zinc-100 hover:bg-white dark:bg-[#121212] dark:hover:bg-zinc-800 text-[#121212] dark:text-zinc-100 transition-colors text-sm font-bold rounded-xl shadow-sm cursor-pointer select-none"
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </motion.button>
              </form>
            )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

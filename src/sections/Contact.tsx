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

const MAX_NAME_LENGTH = 80
const MAX_EMAIL_LENGTH = 120
const MAX_MESSAGE_LENGTH = 1600

const removeUnsafeCharacters = (value: string, preserveLineBreaks = false) => (
  Array.from(value, (char) => {
    const code = char.charCodeAt(0)
    if (preserveLineBreaks && char === '\n') return char
    if (preserveLineBreaks && char === '\t') return ' '
    if (code < 32 || code === 127 || char === '<' || char === '>') return ' '
    return char
  }).join('')
)

const stripUnsafeText = (value: string, maxLength: number) =>
  removeUnsafeCharacters(value)
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength)

const stripUnsafeMessage = (value: string) =>
  removeUnsafeCharacters(value, true)
    .replace(/[ \t]+\n/g, '\n')
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH)

export function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const honeypot = String(formData.get('_honey') ?? '').trim()
    if (honeypot) {
      setSuccess(true)
      return
    }

    const sanitized = {
      name: stripUnsafeText(formState.name, MAX_NAME_LENGTH),
      email: stripUnsafeText(formState.email, MAX_EMAIL_LENGTH).toLowerCase(),
      message: stripUnsafeMessage(formState.message),
    }

    if (!sanitized.name || !sanitized.email || !sanitized.message) {
      setError('Please complete every field before sending.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(sanitized.email)) {
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
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: sanitized.name,
          email: sanitized.email,
          message: sanitized.message,
          _replyto: sanitized.email,
          _subject: `New Portfolio Message from ${sanitized.name}`,
          _template: 'table',
          _honey: '',
        }),
      })

      const result = await response.json() as { success?: boolean | string; message?: string }
      if (response.ok && (result.success === true || result.success === 'true')) {
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

  const fieldClassName = 'peer block min-h-14 w-full bg-[#2b2b2b] dark:bg-white text-zinc-100 dark:text-zinc-900 rounded-xl px-4 pt-6 pb-2 text-sm transition-colors placeholder-transparent border border-zinc-700 dark:border-zinc-300 focus:border-zinc-400 dark:focus:border-zinc-500 focus-visible:ring-2 focus-visible:ring-zinc-100/30 dark:focus-visible:ring-zinc-900/20'
  const labelClassName = 'absolute left-4 top-4 text-xs font-bold text-zinc-300 dark:text-zinc-600 transition-transform duration-200 origin-[0] -translate-y-2.5 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-focus:scale-75 peer-focus:-translate-y-2.5 pointer-events-none select-none font-sans'

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-6 md:py-24 bg-paper dark:bg-[#111111] px-4 min-[360px]:px-6 select-none">
      <div className="mx-auto max-w-6xl text-left">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-6 flex flex-col justify-between h-full min-h-0 md:min-h-[380px] gap-8 md:gap-0"
          >
            <div>
              <h2 id="contact-title" className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-normal text-offblack dark:text-zinc-100 mb-4 font-display leading-[0.95]">
                Let's talk.
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base font-normal leading-[1.65] mb-8 font-sans max-w-[58ch]">
                Have a project or need help? Fill out the form, and I will get back to you soon.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-11 h-11 rounded-xl bg-zinc-200/60 dark:bg-zinc-800/70 flex items-center justify-center text-offblack dark:text-zinc-200 border border-zinc-300/60 dark:border-zinc-700/60 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shadow-sm cursor-pointer"
                  >
                    <Icon size={18} aria-hidden="true" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

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
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-12 h-12 rounded-full bg-zinc-800 dark:bg-zinc-200 flex items-center justify-center text-zinc-100 dark:text-zinc-900 mb-2">
                    <PaperPlaneRight size={20} weight="fill" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-50 dark:text-zinc-900 font-display tracking-normal">Message sent</h3>
                  <p className="text-xs text-zinc-300 dark:text-zinc-600 max-w-[32ch] leading-[1.65]">
                    Thank you for reaching out. I will get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" aria-busy={isSubmitting}>
                  <div className="absolute left-[-100vw] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                    <label htmlFor="company">Company</label>
                    <input id="company" name="_honey" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="relative w-full">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      maxLength={MAX_NAME_LENGTH}
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder=" "
                      aria-invalid={Boolean(error && !formState.name)}
                      aria-describedby={error ? 'contact-error' : undefined}
                      className={fieldClassName}
                    />
                    <label htmlFor="name" className={labelClassName}>
                      Name
                    </label>
                  </div>

                  <div className="relative w-full">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      autoComplete="email"
                      inputMode="email"
                      maxLength={MAX_EMAIL_LENGTH}
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder=" "
                      aria-invalid={Boolean(error && !formState.email)}
                      aria-describedby={error ? 'contact-error' : undefined}
                      className={fieldClassName}
                    />
                    <label htmlFor="email" className={labelClassName}>
                      Email
                    </label>
                  </div>

                  <div className="relative w-full">
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      maxLength={MAX_MESSAGE_LENGTH}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder=" "
                      aria-invalid={Boolean(error && !formState.message)}
                      aria-describedby={error ? 'contact-error' : undefined}
                      className={`${fieldClassName} min-h-[150px] max-h-[260px] resize-y leading-[1.6]`}
                    />
                    <label htmlFor="message" className={labelClassName}>
                      Your Project
                    </label>
                  </div>

                  {error && (
                    <p id="contact-error" role="alert" className="text-red-300 dark:text-red-700 text-xs font-semibold text-left mb-4 leading-[1.6]">
                      {error}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={isSubmitting ? undefined : { scale: 1.01, y: -2 }}
                    whileTap={isSubmitting ? undefined : { scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full min-h-12 px-5 py-4 bg-zinc-100 hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed dark:bg-[#121212] dark:hover:bg-zinc-800 text-[#121212] dark:text-zinc-100 transition-colors text-sm font-bold rounded-xl shadow-sm cursor-pointer select-none"
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

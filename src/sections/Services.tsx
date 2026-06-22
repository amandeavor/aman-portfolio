import { motion } from 'motion/react'

const SERVICES = [
  {
    title: 'Website Migration',
    tags: 'Web Migration • Optimization • React Rebuild',
  },
  {
    title: 'Component Templates',
    tags: 'Startup • Agency • SaaS',
  },
  {
    title: 'Frontend Development',
    tags: 'UI Dev • Responsive Layouts • Web Performance',
  },
  {
    title: 'Product Consulting',
    tags: 'Product Direction • Web Strategy • Technical Guidance',
  },
]

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="py-6 md:py-24 pt-10 md:pt-40 border-t border-zinc-200/60 bg-paper dark:bg-[#111111] px-4 min-[360px]:px-6 select-none">
      <div className="mx-auto max-w-4xl text-left">
        <h2 id="services-title" className="text-3xl font-bold tracking-normal text-offblack dark:text-zinc-100 mb-12 font-display">
          Services
        </h2>

        <div className="divide-y divide-zinc-200/80 dark:divide-zinc-800/80 border-t border-b border-zinc-200/80 dark:border-zinc-800/80">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 group cursor-pointer"
            >
              <span className="text-lg font-bold text-offblack dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors duration-200 font-display">
                {service.title}
              </span>
              <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 tracking-normal uppercase">
                {service.tags}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

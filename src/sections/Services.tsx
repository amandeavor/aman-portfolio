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
    <section id="services" className="py-6 md:py-24 pt-10 md:pt-40 border-t border-zinc-200/60 bg-paper px-6 select-none">
      <div className="mx-auto max-w-4xl text-left">
        <h2 className="text-3xl font-bold tracking-tight text-offblack mb-12 font-display">
          Services
        </h2>

        <div className="divide-y divide-zinc-200/80 border-t border-b border-zinc-200/80">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 group cursor-pointer"
            >
              <span className="text-lg font-bold text-offblack group-hover:text-zinc-600 transition-colors duration-200 font-display">
                {service.title}
              </span>
              <span className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase">
                {service.tags}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

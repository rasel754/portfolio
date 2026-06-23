import { ServiceGrid } from './ServiceGrid'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'

export function Services() {
  return (
    <section id="services" className="py-24 relative">
      {/* Subtle background accent blob */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.04]"
             style={{ backgroundColor: '#6c63ff' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <Reveal>
          <SectionHeader
            eyebrow="// what_i_do"
            title="Services I Offer"
            subtitle="From idea to deployment — here's how I can help you build something great."
          />
        </Reveal>

        {/* Grid */}
        <ServiceGrid />

        {/* Bottom CTA banner */}
        <Reveal delay={0.5}>
          <div className="mt-16 rounded-2xl bg-surface border border-border-subtle p-8 md:p-10
                          flex flex-col md:flex-row items-center justify-between gap-6
                          hover:border-accent/30 hover:shadow-glow-md transition-all duration-300">
            <div>
              <p className="font-mono text-xs text-[#8b8ba7] uppercase tracking-widest mb-2">
                // ready_to_build
              </p>
              <h3 className="font-display text-2xl md:text-3xl text-[#f0f0ff]">
                Have a project in mind?
              </h3>
              <p className="text-[#8b8ba7] text-sm mt-2 max-w-md">
                I'm currently available for freelance work and full-time opportunities.
                Let's build something great together.
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
              <a
                href="#contact"
                className="bg-accent hover:shadow-glow-md text-white font-semibold rounded-xl px-6 py-3
                           transition-all hover:-translate-y-0.5 whitespace-nowrap"
              >
                Start a Project
              </a>
              <a
                href="/resume.pdf"
                download
                className="border border-accent/40 text-accent hover:bg-accent/10 font-semibold
                           rounded-xl px-6 py-3 transition-all whitespace-nowrap"
              >
                View Resume
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

'use client'
import { Service } from '@/lib/data/services'
import Reveal from '@/components/ui/Reveal'
import { CheckCircle2 } from 'lucide-react'

interface ServiceCardProps {
  service: Service
  index: number
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <Reveal delay={index * 0.08}>
      <div
        className="group relative bg-surface border border-border-subtle rounded-2xl p-6 h-full
                   hover:border-[var(--card-accent-border)] hover:shadow-[0_0_30px_var(--card-accent-glow)]
                   transition-all duration-300 motion-safe:hover:-translate-y-1 overflow-hidden"
        style={{
          '--card-accent': service.accent,
          '--card-accent-glow': `${service.accent}26`, // 15% opacity
          '--card-accent-border': `${service.accent}66`, // 40% opacity
          '--card-accent-icon-glow': `${service.accent}4d`, // 30% opacity
        } as React.CSSProperties}
      >
        {/* Background glow blob on hover */}
        <div
          className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl
                     opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
          style={{ backgroundColor: service.accent }}
        />

        {/* Tag — font-mono label */}
        <p className="font-mono text-xs text-[#8b8ba7] tracking-widest uppercase mb-4">
          {service.tag}
        </p>

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5
                     border transition-all duration-300
                     motion-safe:group-hover:scale-110 group-hover:shadow-[0_0_20px_var(--card-accent-icon-glow)]"
          style={{
            backgroundColor: `${service.accent}15`,
            borderColor: `${service.accent}30`,
          }}
        >
          {service.icon}
        </div>

        {/* Title */}
        <h3 className="font-display text-xl text-[#f0f0ff] mb-3 leading-snug">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-[#8b8ba7] text-sm leading-relaxed mb-5">
          {service.description}
        </p>

        {/* Divider */}
        <div
          className="h-px mb-5 opacity-20"
          style={{ backgroundColor: service.accent }}
        />

        {/* Deliverables list */}
        <ul className="space-y-2">
          {service.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-[#8b8ba7]">
              <CheckCircle2
                size={14}
                className="mt-0.5 shrink-0"
                style={{ color: service.accent }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Bottom CTA — appears on hover */}
        <div className="mt-6 pt-5 border-t border-border-subtle opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: service.accent }}
          >
            Let's work together →
          </a>
        </div>
      </div>
    </Reveal>
  )
}

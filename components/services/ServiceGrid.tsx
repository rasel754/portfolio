import { services } from '@/lib/data/services'
import { ServiceCard } from './ServiceCard'

export function ServiceGrid() {
  const topRow = services.slice(0, 4)
  const bottomRow = services.slice(4)

  return (
    <div className="space-y-5">
      {/* Top row — 4 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {topRow.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
      </div>
      {/* Bottom row — 3 cards, centered */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:max-w-[75%] lg:mx-auto">
        {bottomRow.map((s, i) => <ServiceCard key={s.id} service={s} index={i + 4} />)}
      </div>
    </div>
  )
}

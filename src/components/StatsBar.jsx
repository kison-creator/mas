import { getStats, formatDealSize } from '../data/deals'

const statCards = [
  {
    label: 'Total Pipeline Value',
    getValue: (s) => formatDealSize(s.totalValue),
    color: 'text-brand-cyan',
    bg: 'from-cyan-500/10 to-transparent',
  },
  {
    label: 'Active Deals',
    getValue: (s) => s.activeDeals,
    color: 'text-blue-400',
    bg: 'from-blue-500/10 to-transparent',
  },
  {
    label: 'Avg Deal Size',
    getValue: (s) => formatDealSize(s.avgSize),
    color: 'text-violet-400',
    bg: 'from-violet-500/10 to-transparent',
  },
  {
    label: 'Avg Time to Close',
    getValue: (s) => `${s.avgClose} days`,
    color: 'text-emerald-400',
    bg: 'from-emerald-500/10 to-transparent',
  },
]

export default function StatsBar({ deals }) {
  const stats = getStats(deals)

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-6 py-5 max-w-[1600px] mx-auto">
      {statCards.map((card) => (
        <div
          key={card.label}
          className={`rounded-xl border border-gray-700/50 bg-gradient-to-br ${card.bg} bg-gray-800/50 p-5`}
        >
          <p className="text-sm text-gray-400 font-medium mb-1">{card.label}</p>
          <p className={`text-3xl font-bold ${card.color}`}>
            {card.getValue(stats)}
          </p>
        </div>
      ))}
    </div>
  )
}

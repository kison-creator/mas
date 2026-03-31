import { STATUS_COLORS, INDUSTRY_COLORS, formatDealSize, getDaysOpen } from '../data/deals'

export default function DealTimeline({ deals }) {
  const sorted = [...deals].sort((a, b) => new Date(a.startDate) - new Date(b.startDate))

  return (
    <div className="px-6 py-5 max-w-[1600px] mx-auto">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[140px] top-0 bottom-0 w-px bg-gray-700" />

        <div className="space-y-6">
          {sorted.map((deal, i) => {
            const date = new Date(deal.startDate)
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            const dayStr = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
            const showMonth = i === 0 || dateStr !== new Date(sorted[i - 1].startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

            return (
              <div key={deal.id} className="flex items-start gap-6">
                {/* Date column */}
                <div className="w-[120px] flex-shrink-0 text-right pt-3">
                  {showMonth && (
                    <p className="text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-0.5">
                      {dateStr}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">{dayStr}</p>
                </div>

                {/* Dot */}
                <div className="relative flex-shrink-0 pt-4">
                  <div
                    className="w-3 h-3 rounded-full border-2 border-gray-900"
                    style={{ backgroundColor: STATUS_COLORS[deal.status] }}
                  />
                </div>

                {/* Card */}
                <div className="flex-1 rounded-xl border border-gray-700/50 bg-gray-800/50 p-4 hover:border-gray-600 transition-colors max-w-2xl">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-semibold text-white text-sm">{deal.target}</h3>
                      <p className="text-xs text-gray-400">by {deal.acquirer}</p>
                    </div>
                    <span className="text-lg font-bold text-white whitespace-nowrap">
                      {formatDealSize(deal.dealSize)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3 leading-relaxed">{deal.synopsis}</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: STATUS_COLORS[deal.status] + '20',
                        color: STATUS_COLORS[deal.status],
                      }}
                    >
                      {deal.status}
                    </span>
                    <span
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: INDUSTRY_COLORS[deal.industry] + '20',
                        color: INDUSTRY_COLORS[deal.industry],
                      }}
                    >
                      {deal.industry}
                    </span>
                    <span className="text-xs text-gray-500">
                      {getDaysOpen(deal)} days {deal.closeDate ? '(closed)' : 'open'}
                    </span>
                    <span className="text-xs text-gray-500">{deal.leadAdvisor}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

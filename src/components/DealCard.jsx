import { formatDealSize, getDaysOpen, INDUSTRY_COLORS } from '../data/deals'

const riskStyles = {
  low: 'bg-emerald-500',
  medium: 'bg-amber-500',
  high: 'bg-red-500',
}

export default function DealCard({ deal, expanded, onToggle }) {
  const days = getDaysOpen(deal)

  return (
    <div
      onClick={onToggle}
      className="rounded-xl border border-gray-700/50 bg-gray-800/60 p-4 cursor-pointer hover:border-brand-cyan/40 hover:bg-gray-800 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-white text-sm leading-tight">{deal.target}</h3>
        <span
          className="text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
          style={{
            backgroundColor: INDUSTRY_COLORS[deal.industry] + '20',
            color: INDUSTRY_COLORS[deal.industry],
          }}
        >
          {deal.industry}
        </span>
      </div>

      <p className="text-xs text-gray-400 mb-3">by {deal.acquirer}</p>

      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-white">{formatDealSize(deal.dealSize)}</span>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>{days}d</span>
          <span className={`w-2 h-2 rounded-full ${riskStyles[deal.risk]}`} />
        </div>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-gray-700/50 space-y-2">
          <p className="text-xs text-gray-300 leading-relaxed">{deal.synopsis}</p>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Advisor: {deal.leadAdvisor}</span>
            <span>Started: {new Date(deal.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          {deal.closeDate && (
            <p className="text-xs text-emerald-400">
              Closed: {new Date(deal.closeDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          )}
          <div className="flex items-center gap-1 text-xs">
            <span className={`w-2 h-2 rounded-full ${riskStyles[deal.risk]}`} />
            <span className="text-gray-400 capitalize">{deal.risk} risk</span>
          </div>
        </div>
      )}
    </div>
  )
}

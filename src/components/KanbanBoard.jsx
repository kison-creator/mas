import { useState } from 'react'
import { STATUSES, STATUS_COLORS, formatDealSize } from '../data/deals'
import DealCard from './DealCard'

export default function KanbanBoard({ deals }) {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <div className="px-6 py-5 max-w-[1600px] mx-auto">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STATUSES.map((status) => {
          const columnDeals = deals.filter((d) => d.status === status)
          const totalValue = columnDeals.reduce((sum, d) => sum + d.dealSize, 0)

          return (
            <div key={status} className="flex-shrink-0 w-72">
              <div className="rounded-t-lg px-4 py-3 bg-gray-800/50 border border-gray-700/50 border-b-0">
                <div
                  className="h-1 rounded-full mb-3 w-12"
                  style={{ backgroundColor: STATUS_COLORS[status] }}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-sm text-white">{status}</h2>
                    <span className="text-xs bg-gray-700 text-gray-300 rounded-full px-2 py-0.5">
                      {columnDeals.length}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{formatDealSize(totalValue)}</span>
                </div>
              </div>
              <div className="rounded-b-lg border border-gray-700/50 border-t-0 bg-gray-900/30 p-3 space-y-3 min-h-[200px] max-h-[600px] overflow-y-auto">
                {columnDeals.length === 0 && (
                  <p className="text-xs text-gray-600 text-center py-8">No deals</p>
                )}
                {columnDeals.map((deal) => (
                  <DealCard
                    key={deal.id}
                    deal={deal}
                    expanded={expandedId === deal.id}
                    onToggle={() => setExpandedId(expandedId === deal.id ? null : deal.id)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

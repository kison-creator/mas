import { useState, useMemo } from 'react'
import { deals } from './data/deals'
import Header from './components/Header'
import StatsBar from './components/StatsBar'
import FilterBar from './components/FilterBar'
import KanbanBoard from './components/KanbanBoard'
import DealTimeline from './components/DealTimeline'
import IndustryChart from './components/IndustryChart'

export default function App() {
  const [activeView, setActiveView] = useState('kanban')
  const [filters, setFilters] = useState({
    search: '',
    industry: 'All',
    status: 'All',
  })

  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      if (filters.industry !== 'All' && deal.industry !== filters.industry) return false
      if (filters.status !== 'All' && deal.status !== filters.status) return false
      if (filters.search) {
        const q = filters.search.toLowerCase()
        if (
          !deal.target.toLowerCase().includes(q) &&
          !deal.acquirer.toLowerCase().includes(q)
        )
          return false
      }
      return true
    })
  }, [filters])

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <StatsBar deals={deals} />
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      {activeView === 'kanban' ? (
        <KanbanBoard deals={filteredDeals} />
      ) : (
        <DealTimeline deals={filteredDeals} />
      )}
      <IndustryChart deals={filteredDeals} />
    </div>
  )
}

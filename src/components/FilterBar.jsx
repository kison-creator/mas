import { INDUSTRIES, STATUSES } from '../data/deals'

export default function FilterBar({ filters, setFilters, activeView, setActiveView }) {
  const update = (key, value) => setFilters((f) => ({ ...f, [key]: value }))

  return (
    <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur border-b border-gray-800 px-6 py-3">
      <div className="max-w-[1600px] mx-auto flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search deals..."
            value={filters.search}
            onChange={(e) => update('search', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
          />
        </div>

        <select
          value={filters.industry}
          onChange={(e) => update('industry', e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-brand-cyan"
        >
          <option value="All">All Industries</option>
          {INDUSTRIES.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => update('status', e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-brand-cyan"
        >
          <option value="All">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {(filters.search || filters.industry !== 'All' || filters.status !== 'All') && (
          <button
            onClick={() => setFilters({ search: '', industry: 'All', status: 'All' })}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Clear
          </button>
        )}

        <div className="ml-auto flex rounded-lg border border-gray-700 overflow-hidden">
          <button
            onClick={() => setActiveView('kanban')}
            className={`px-3 py-2 text-sm transition-colors ${
              activeView === 'kanban'
                ? 'bg-brand-cyan/20 text-brand-cyan'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
          </button>
          <button
            onClick={() => setActiveView('timeline')}
            className={`px-3 py-2 text-sm transition-colors ${
              activeView === 'timeline'
                ? 'bg-brand-cyan/20 text-brand-cyan'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

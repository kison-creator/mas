import {
  Treemap,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { INDUSTRY_COLORS } from '../data/deals'

function CustomTreemapContent({ x, y, width, height, name, value }) {
  if (width < 50 || height < 40) return null
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={6} fill={INDUSTRY_COLORS[name] || '#374151'} fillOpacity={0.7} stroke="#1f2937" strokeWidth={2} />
      <text x={x + width / 2} y={y + height / 2 - 8} textAnchor="middle" fill="#f3f4f6" fontSize={11} fontWeight={600}>
        {name}
      </text>
      <text x={x + width / 2} y={y + height / 2 + 10} textAnchor="middle" fill="#d1d5db" fontSize={10}>
        ${(value / 1000).toFixed(1)}B
      </text>
    </g>
  )
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm shadow-xl">
      <p className="text-white font-semibold">{d.name}</p>
      <p className="text-gray-400">{d.deals} deals &middot; ${(d.value / 1000).toFixed(1)}B total</p>
    </div>
  )
}

export default function IndustryChart({ deals }) {
  const industryMap = {}
  deals.forEach((d) => {
    if (!industryMap[d.industry]) industryMap[d.industry] = { value: 0, deals: 0 }
    industryMap[d.industry].value += d.dealSize
    industryMap[d.industry].deals += 1
  })

  const treemapData = Object.entries(industryMap).map(([name, data]) => ({
    name,
    value: data.value,
    deals: data.deals,
  }))

  const barData = Object.entries(industryMap)
    .map(([name, data]) => ({
      name: name.length > 12 ? name.slice(0, 12) + '...' : name,
      fullName: name,
      deals: data.deals,
      value: data.value,
      avg: Math.round(data.value / data.deals),
    }))
    .sort((a, b) => b.value - a.value)

  return (
    <div className="px-6 py-5 max-w-[1600px] mx-auto">
      <h2 className="text-lg font-semibold text-white mb-4">Industry Breakdown</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Treemap */}
        <div className="rounded-xl border border-gray-700/50 bg-gray-800/30 p-5">
          <h3 className="text-sm font-medium text-gray-400 mb-4">Deal Value by Industry</h3>
          <ResponsiveContainer width="100%" height={280}>
            <Treemap
              data={treemapData}
              dataKey="value"
              stroke="#1f2937"
              content={<CustomTreemapContent />}
            >
              <Tooltip content={<CustomTooltip />} />
            </Treemap>
          </ResponsiveContainer>
        </div>

        {/* Bar chart */}
        <div className="rounded-xl border border-gray-700/50 bg-gray-800/30 p-5">
          <h3 className="text-sm font-medium text-gray-400 mb-4">Deal Count & Avg Size by Industry</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <XAxis
                dataKey="name"
                tick={{ fill: '#9CA3AF', fontSize: 10 }}
                axisLine={{ stroke: '#374151' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#9CA3AF', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelStyle={{ color: '#f3f4f6' }}
              />
              <Bar dataKey="deals" radius={[4, 4, 0, 0]} name="Deals">
                {barData.map((entry) => (
                  <Cell key={entry.fullName} fill={INDUSTRY_COLORS[entry.fullName] || '#6B7280'} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

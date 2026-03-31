export default function Header() {
  return (
    <header className="bg-brand-navy border-b border-gray-800 px-6 py-4">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-cyan to-brand-blue flex items-center justify-center font-bold text-white text-lg">
            M
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              M&A Science
            </h1>
            <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">
              Deal Tracker
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            {new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-300">
            MA
          </div>
        </div>
      </div>
    </header>
  )
}

export default function Header() {
    return (
      <header className="h-16 bg-white border-b border-gray-200 flex items-center">
        <div className="mx-auto w-full max-w-[1200px] px-6 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-900">
              CO₂ Monitoring Dashboard
            </div>
            <div className="text-xs text-gray-500">
              Real-time monitoring and prediction of CO₂ levels (8 AM – 10 PM)
            </div>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Live
            </span>
            <span>Updated just now</span>
          </div>
        </div>
      </header>
    );
  }
  
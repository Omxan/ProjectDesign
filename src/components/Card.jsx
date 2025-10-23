export default function Card({ title, subtitle, children, className = "" }) {
    return (
      <div className={`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm ${className}`}>
        {(title || subtitle) && (
          <div className="mb-3">
            {title && <div className="text-sm font-semibold text-gray-800">{title}</div>}
            {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
          </div>
        )}
        {children}
      </div>
    );
  }
  
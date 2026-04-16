"use client"

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-center px-6">
      {/* Centered Premium Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1A1A40] to-[#2563EB] flex items-center justify-center shadow-sm">
          <span className="text-xs font-bold text-white tracking-tight">MSB</span>
        </div>
        <span className="text-xl font-semibold text-[#1A1A40] tracking-tight">
          MSB Intelligence
        </span>
      </div>
    </header>
  )
}

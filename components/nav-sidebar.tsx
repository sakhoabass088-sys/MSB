"use client"

import { 
  Activity, 
  Search, 
  FileText, 
  ChevronLeft, 
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

type Tab = "sourcing" | "devis"

interface NavSidebarProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export function NavSidebar({ activeTab, onTabChange, isCollapsed, onToggleCollapse }: NavSidebarProps) {
  return (
    <aside 
      className={cn(
        "flex-shrink-0 bg-[#1A1A40] h-full flex flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-56"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-lg flex items-center justify-center shadow-sm">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">MSB Intelligence</span>
              <span className="text-[9px] text-blue-300 uppercase tracking-widest">Trade Analytics</span>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-lg flex items-center justify-center shadow-sm mx-auto">
            <Activity className="h-4 w-4 text-white" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        <div className={cn("mb-4", !isCollapsed && "px-2")}>
          {!isCollapsed && (
            <span className="text-[10px] font-semibold text-blue-300/60 uppercase tracking-wider">
              Modules
            </span>
          )}
        </div>

        <button
          onClick={() => onTabChange("sourcing")}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
            activeTab === "sourcing"
              ? "bg-[#2563EB] text-white shadow-md"
              : "text-blue-200 hover:text-white hover:bg-white/5"
          )}
        >
          <Search className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Sourcing Express</span>}
        </button>

        <button
          onClick={() => onTabChange("devis")}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
            activeTab === "devis"
              ? "bg-[#2563EB] text-white shadow-md"
              : "text-blue-200 hover:text-white hover:bg-white/5"
          )}
        >
          <FileText className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Expert Devis</span>}
        </button>
      </nav>

      {/* Bottom Section - Logo */}
      <div className="p-4 border-t border-white/10">
        {!isCollapsed ? (
          <div className="flex items-center gap-2 justify-center">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#2563EB] to-[#D97706] flex items-center justify-center">
              <span className="text-[7px] font-bold text-white">MSB</span>
            </div>
            <span className="text-xs font-medium text-blue-200">MSB Intelligence</span>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#2563EB] to-[#D97706] flex items-center justify-center">
              <span className="text-[7px] font-bold text-white">MSB</span>
            </div>
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggleCollapse}
        className="h-10 flex items-center justify-center border-t border-white/10 text-blue-300 hover:text-white hover:bg-white/5 transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>
    </aside>
  )
}

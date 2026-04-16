"use client"

import { useState } from "react"
import { Search, Sparkles, Clock, TrendingUp, Plus, X, FileSpreadsheet, FileText, Download } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchItem {
  id: string
  query: string
}

const recentSearches = [
  "Composants électroniques",
  "Acier inoxydable",
  "Textile technique",
]

const popularSearches = [
  { term: "Batteries lithium", trend: "+12%" },
  { term: "Semi-conducteurs", trend: "+8%" },
  { term: "Pièces automobiles", trend: "+5%" },
]

interface SearchBarProps {
  onSearchPerformed?: (hasResults: boolean) => void
  hasSearched?: boolean
}

export function SearchBar({ onSearchPerformed, hasSearched = false }: SearchBarProps) {
  const [searchItems, setSearchItems] = useState<SearchItem[]>([
    { id: "1", query: "" }
  ])
  const [isFocused, setIsFocused] = useState(false)
  const [focusedItemId, setFocusedItemId] = useState<string | null>(null)
  const [showExportMenu, setShowExportMenu] = useState(false)

  const addSearchItem = () => {
    const newId = Date.now().toString()
    setSearchItems([...searchItems, { id: newId, query: "" }])
  }

  const removeSearchItem = (id: string) => {
    if (searchItems.length > 1) {
      setSearchItems(searchItems.filter(item => item.id !== id))
    }
  }

  const updateSearchItem = (id: string, query: string) => {
    setSearchItems(searchItems.map(item => 
      item.id === id ? { ...item, query } : item
    ))
  }

  const handleSearch = () => {
    const hasQuery = searchItems.some(item => item.query.trim() !== "")
    if (hasQuery && onSearchPerformed) {
      onSearchPerformed(true)
    }
  }

  const handleExport = (format: 'word' | 'excel') => {
    // Generate simulation report
    const reportData = {
      title: "Simulation d'Approvisionnement MSB Intelligence",
      date: new Date().toLocaleDateString('fr-FR'),
      items: searchItems.filter(item => item.query.trim() !== "").map(item => ({
        product: item.query,
        unitPrice: (Math.random() * 500 + 50).toFixed(2),
        quantity: Math.floor(Math.random() * 100 + 10),
        hsCode: `${Math.floor(Math.random() * 9000 + 1000)}.${Math.floor(Math.random() * 90 + 10)}`,
        customsDuty: `${(Math.random() * 15 + 2).toFixed(1)}%`,
        vat: "20%",
        shippingEstimate: (Math.random() * 2000 + 500).toFixed(2),
      })),
      savings: `${(Math.random() * 25 + 10).toFixed(1)}%`,
      disclaimer: "Ce document est une simulation informative non-contractuelle. Les prix et estimations sont susceptibles de varier."
    }

    console.log(`Generating ${format} report:`, reportData)
    setShowExportMenu(false)
    
    // Show alert for demo
    alert(`Rapport "${reportData.title}" généré en format ${format.toUpperCase()}\n\nContenu:\n- Prix unitaire et total\n- Code SH\n- Droits de douane\n- TVA\n- Frais de transport estimés\n- Économie réalisée: ${reportData.savings}\n\n${reportData.disclaimer}`)
  }

  return (
    <div className="w-full max-w-4xl space-y-3">
      {searchItems.map((item, index) => (
        <div key={item.id} className="relative">
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={item.query}
                onChange={(e) => updateSearchItem(item.id, e.target.value)}
                onFocus={() => {
                  setIsFocused(true)
                  setFocusedItemId(item.id)
                }}
                onBlur={() => setTimeout(() => {
                  setIsFocused(false)
                  setFocusedItemId(null)
                }, 200)}
                placeholder={index === 0 ? "Rechercher produits, fournisseurs, codes SH..." : "Ajouter un autre produit..."}
                className="w-full h-12 pl-12 pr-4 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all shadow-sm"
              />
              {searchItems.length > 1 && (
                <button
                  onClick={() => removeSearchItem(item.id)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {/* Show buttons only on first item */}
            {index === 0 && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleSearch}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white text-sm font-medium rounded-xl hover:from-[#1D4ED8] hover:to-[#1E40AF] transition-all shadow-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  AI Search
                </button>

                {/* Generate Report Button - Disabled until search is performed */}
                <div className="relative">
                  <button
                    onClick={() => hasSearched && setShowExportMenu(!showExportMenu)}
                    disabled={!hasSearched}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl transition-all shadow-sm",
                      hasSearched
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 cursor-pointer"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    )}
                  >
                    <Download className="h-4 w-4" />
                    Générer Rapport
                  </button>

                  {showExportMenu && hasSearched && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setShowExportMenu(false)}
                      />
                      <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-2xl z-20 overflow-hidden">
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                            Simulation d&apos;Approvisionnement
                          </p>
                          <p className="text-[10px] text-gray-500 mt-1">
                            Document informatif non-contractuel
                          </p>
                        </div>
                        <button
                          onClick={() => handleExport('word')}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                        >
                          <FileText className="h-4 w-4 text-[#2563EB]" />
                          <div className="text-left">
                            <p className="font-medium">Export Word</p>
                            <p className="text-[10px] text-gray-500">Rapport détaillé .docx</p>
                          </div>
                        </button>
                        <div className="h-px bg-gray-100" />
                        <button
                          onClick={() => handleExport('excel')}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50 transition-colors"
                        >
                          <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                          <div className="text-left">
                            <p className="font-medium">Export Excel</p>
                            <p className="text-[10px] text-gray-500">Données tableur .xlsx</p>
                          </div>
                        </button>
                        <div className="px-4 py-2 bg-amber-50 border-t border-amber-100">
                          <p className="text-[10px] text-amber-700">
                            Inclut: Prix, Code SH, Droits, TVA, Transport, Économies MSB
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Add Product Button (Pack Pro) */}
      <button
        onClick={addSearchItem}
        className="flex items-center gap-2 px-4 py-2 text-sm text-[#2563EB] hover:text-[#1D4ED8] hover:bg-blue-50 rounded-lg transition-colors mx-auto"
      >
        <Plus className="h-4 w-4" />
        <span className="font-medium">Ajouter un article au pack</span>
        <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold uppercase">
          Pack Pro
        </span>
      </button>

      {/* Dropdown for first item */}
      {isFocused && focusedItemId === "1" && searchItems[0].query === "" && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              <Clock className="h-3.5 w-3.5" />
              Recherches récentes
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => updateSearchItem("1", term)}
                  className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              <TrendingUp className="h-3.5 w-3.5" />
              Tendances
            </div>
            <div className="space-y-1">
              {popularSearches.map((item) => (
                <button
                  key={item.term}
                  onClick={() => updateSearchItem("1", item.term)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="font-medium">{item.term}</span>
                  <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">{item.trend}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

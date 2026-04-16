"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { NavSidebar } from "@/components/nav-sidebar"
import { FiltersSidebar } from "@/components/filters-sidebar"
import { SearchBar } from "@/components/search-bar"

import { ResultsTable } from "@/components/results-table"
import { QuoteForm } from "@/components/quote-form"

type Tab = "sourcing" | "devis"

export default function MSBIntelligence() {
  const [activeTab, setActiveTab] = useState<Tab>("sourcing")
  const [isNavCollapsed, setIsNavCollapsed] = useState(false)
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearchPerformed = (hasResults: boolean) => {
    setHasSearched(hasResults)
  }

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Header */}
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar (collapsible) */}
        <NavSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          isCollapsed={isNavCollapsed}
          onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)}
        />

        {/* Filters Sidebar (collapsible) */}
        <FiltersSidebar 
          isCollapsed={isFiltersCollapsed}
          onToggleCollapse={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
        />
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {activeTab === "sourcing" ? (
            <>
              {/* Search Section */}
              <div className="p-8 bg-white border-b border-gray-100">
                <div className="flex flex-col items-center max-w-4xl mx-auto">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2 text-balance">
                    Sourcing Express
                  </h1>
                  <p className="text-sm text-gray-500 mb-6 text-pretty text-center max-w-xl">
                    Analyse en temps réel de millions de fournisseurs vérifiés dans le monde entier
                  </p>
                  <SearchBar 
                    onSearchPerformed={handleSearchPerformed}
                    hasSearched={hasSearched}
                  />
                </div>
              </div>

              

              {/* Results */}
              <div className="flex-1 p-6 bg-[#F8FAFC] overflow-auto">
                <ResultsTable />
              </div>
            </>
          ) : (
            <QuoteForm />
          )}
        </main>
      </div>

      
    </div>
  )
}

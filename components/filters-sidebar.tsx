"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, ChevronLeft, Globe, FileText, Ship, Receipt, Filter, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FiltersSidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
}

// ALL countries of the world (196 countries)
const allCountries = [
  { value: "af", label: "Afghanistan", flag: "🇦🇫" },
  { value: "al", label: "Albanie", flag: "🇦🇱" },
  { value: "dz", label: "Algerie", flag: "🇩🇿" },
  { value: "ad", label: "Andorre", flag: "🇦🇩" },
  { value: "ao", label: "Angola", flag: "🇦🇴" },
  { value: "ag", label: "Antigua-et-Barbuda", flag: "🇦🇬" },
  { value: "ar", label: "Argentine", flag: "🇦🇷" },
  { value: "am", label: "Armenie", flag: "🇦🇲" },
  { value: "au", label: "Australie", flag: "🇦🇺" },
  { value: "at", label: "Autriche", flag: "🇦🇹" },
  { value: "az", label: "Azerbaidjan", flag: "🇦🇿" },
  { value: "bs", label: "Bahamas", flag: "🇧🇸" },
  { value: "bh", label: "Bahrein", flag: "🇧🇭" },
  { value: "bd", label: "Bangladesh", flag: "🇧🇩" },
  { value: "bb", label: "Barbade", flag: "🇧🇧" },
  { value: "by", label: "Bielorussie", flag: "🇧🇾" },
  { value: "be", label: "Belgique", flag: "🇧🇪" },
  { value: "bz", label: "Belize", flag: "🇧🇿" },
  { value: "bj", label: "Benin", flag: "🇧🇯" },
  { value: "bt", label: "Bhoutan", flag: "🇧🇹" },
  { value: "bo", label: "Bolivie", flag: "🇧🇴" },
  { value: "ba", label: "Bosnie-Herzegovine", flag: "🇧🇦" },
  { value: "bw", label: "Botswana", flag: "🇧🇼" },
  { value: "br", label: "Bresil", flag: "🇧🇷" },
  { value: "bn", label: "Brunei", flag: "🇧🇳" },
  { value: "bg", label: "Bulgarie", flag: "🇧🇬" },
  { value: "bf", label: "Burkina Faso", flag: "🇧🇫" },
  { value: "bi", label: "Burundi", flag: "🇧🇮" },
  { value: "cv", label: "Cap-Vert", flag: "🇨🇻" },
  { value: "kh", label: "Cambodge", flag: "🇰🇭" },
  { value: "cm", label: "Cameroun", flag: "🇨🇲" },
  { value: "ca", label: "Canada", flag: "🇨🇦" },
  { value: "cf", label: "Centrafrique", flag: "🇨🇫" },
  { value: "td", label: "Tchad", flag: "🇹🇩" },
  { value: "cl", label: "Chili", flag: "🇨🇱" },
  { value: "cn", label: "Chine", flag: "🇨🇳" },
  { value: "co", label: "Colombie", flag: "🇨🇴" },
  { value: "km", label: "Comores", flag: "🇰🇲" },
  { value: "cg", label: "Congo", flag: "🇨🇬" },
  { value: "cd", label: "RD Congo", flag: "🇨🇩" },
  { value: "cr", label: "Costa Rica", flag: "🇨🇷" },
  { value: "ci", label: "Cote d'Ivoire", flag: "🇨🇮" },
  { value: "hr", label: "Croatie", flag: "🇭🇷" },
  { value: "cu", label: "Cuba", flag: "🇨🇺" },
  { value: "cy", label: "Chypre", flag: "🇨🇾" },
  { value: "cz", label: "Tchequie", flag: "🇨🇿" },
  { value: "dk", label: "Danemark", flag: "🇩🇰" },
  { value: "dj", label: "Djibouti", flag: "🇩🇯" },
  { value: "dm", label: "Dominique", flag: "🇩🇲" },
  { value: "do", label: "Rep. Dominicaine", flag: "🇩🇴" },
  { value: "ec", label: "Equateur", flag: "🇪🇨" },
  { value: "eg", label: "Egypte", flag: "🇪🇬" },
  { value: "sv", label: "Salvador", flag: "🇸🇻" },
  { value: "gq", label: "Guinee equatoriale", flag: "🇬🇶" },
  { value: "er", label: "Erythree", flag: "🇪🇷" },
  { value: "ee", label: "Estonie", flag: "🇪🇪" },
  { value: "sz", label: "Eswatini", flag: "🇸🇿" },
  { value: "et", label: "Ethiopie", flag: "🇪🇹" },
  { value: "fj", label: "Fidji", flag: "🇫🇯" },
  { value: "fi", label: "Finlande", flag: "🇫🇮" },
  { value: "fr", label: "France", flag: "🇫🇷" },
  { value: "ga", label: "Gabon", flag: "🇬🇦" },
  { value: "gm", label: "Gambie", flag: "🇬🇲" },
  { value: "ge", label: "Georgie", flag: "🇬🇪" },
  { value: "de", label: "Allemagne", flag: "🇩🇪" },
  { value: "gh", label: "Ghana", flag: "🇬🇭" },
  { value: "gr", label: "Grece", flag: "🇬🇷" },
  { value: "gd", label: "Grenade", flag: "🇬🇩" },
  { value: "gt", label: "Guatemala", flag: "🇬🇹" },
  { value: "gn", label: "Guinee", flag: "🇬🇳" },
  { value: "gw", label: "Guinee-Bissau", flag: "🇬🇼" },
  { value: "gy", label: "Guyana", flag: "🇬🇾" },
  { value: "ht", label: "Haiti", flag: "🇭🇹" },
  { value: "hn", label: "Honduras", flag: "🇭🇳" },
  { value: "hu", label: "Hongrie", flag: "🇭🇺" },
  { value: "is", label: "Islande", flag: "🇮🇸" },
  { value: "in", label: "Inde", flag: "🇮🇳" },
  { value: "id", label: "Indonesie", flag: "🇮🇩" },
  { value: "ir", label: "Iran", flag: "🇮🇷" },
  { value: "iq", label: "Irak", flag: "🇮🇶" },
  { value: "ie", label: "Irlande", flag: "🇮🇪" },
  { value: "il", label: "Israel", flag: "🇮🇱" },
  { value: "it", label: "Italie", flag: "🇮🇹" },
  { value: "jm", label: "Jamaique", flag: "🇯🇲" },
  { value: "jp", label: "Japon", flag: "🇯🇵" },
  { value: "jo", label: "Jordanie", flag: "🇯🇴" },
  { value: "kz", label: "Kazakhstan", flag: "🇰🇿" },
  { value: "ke", label: "Kenya", flag: "🇰🇪" },
  { value: "ki", label: "Kiribati", flag: "🇰🇮" },
  { value: "kp", label: "Coree du Nord", flag: "🇰🇵" },
  { value: "kr", label: "Coree du Sud", flag: "🇰🇷" },
  { value: "kw", label: "Koweit", flag: "🇰🇼" },
  { value: "kg", label: "Kirghizistan", flag: "🇰🇬" },
  { value: "la", label: "Laos", flag: "🇱🇦" },
  { value: "lv", label: "Lettonie", flag: "🇱🇻" },
  { value: "lb", label: "Liban", flag: "🇱🇧" },
  { value: "ls", label: "Lesotho", flag: "🇱🇸" },
  { value: "lr", label: "Liberia", flag: "🇱🇷" },
  { value: "ly", label: "Libye", flag: "🇱🇾" },
  { value: "li", label: "Liechtenstein", flag: "🇱🇮" },
  { value: "lt", label: "Lituanie", flag: "🇱🇹" },
  { value: "lu", label: "Luxembourg", flag: "🇱🇺" },
  { value: "mg", label: "Madagascar", flag: "🇲🇬" },
  { value: "mw", label: "Malawi", flag: "🇲🇼" },
  { value: "my", label: "Malaisie", flag: "🇲🇾" },
  { value: "mv", label: "Maldives", flag: "🇲🇻" },
  { value: "ml", label: "Mali", flag: "🇲🇱" },
  { value: "mt", label: "Malte", flag: "🇲🇹" },
  { value: "mh", label: "Iles Marshall", flag: "🇲🇭" },
  { value: "mr", label: "Mauritanie", flag: "🇲🇷" },
  { value: "mu", label: "Maurice", flag: "🇲🇺" },
  { value: "mx", label: "Mexique", flag: "🇲🇽" },
  { value: "fm", label: "Micronesie", flag: "🇫🇲" },
  { value: "md", label: "Moldavie", flag: "🇲🇩" },
  { value: "mc", label: "Monaco", flag: "🇲🇨" },
  { value: "mn", label: "Mongolie", flag: "🇲🇳" },
  { value: "me", label: "Montenegro", flag: "🇲🇪" },
  { value: "ma", label: "Maroc", flag: "🇲🇦" },
  { value: "mz", label: "Mozambique", flag: "🇲🇿" },
  { value: "mm", label: "Myanmar", flag: "🇲🇲" },
  { value: "na", label: "Namibie", flag: "🇳🇦" },
  { value: "nr", label: "Nauru", flag: "🇳🇷" },
  { value: "np", label: "Nepal", flag: "🇳🇵" },
  { value: "nl", label: "Pays-Bas", flag: "🇳🇱" },
  { value: "nz", label: "Nouvelle-Zelande", flag: "🇳🇿" },
  { value: "ni", label: "Nicaragua", flag: "🇳🇮" },
  { value: "ne", label: "Niger", flag: "🇳🇪" },
  { value: "ng", label: "Nigeria", flag: "🇳🇬" },
  { value: "mk", label: "Macedoine du Nord", flag: "🇲🇰" },
  { value: "no", label: "Norvege", flag: "🇳🇴" },
  { value: "om", label: "Oman", flag: "🇴🇲" },
  { value: "pk", label: "Pakistan", flag: "🇵🇰" },
  { value: "pw", label: "Palaos", flag: "🇵🇼" },
  { value: "pa", label: "Panama", flag: "🇵🇦" },
  { value: "pg", label: "Papouasie-N.-Guinee", flag: "🇵🇬" },
  { value: "py", label: "Paraguay", flag: "🇵🇾" },
  { value: "pe", label: "Perou", flag: "🇵🇪" },
  { value: "ph", label: "Philippines", flag: "🇵🇭" },
  { value: "pl", label: "Pologne", flag: "🇵🇱" },
  { value: "pt", label: "Portugal", flag: "🇵🇹" },
  { value: "qa", label: "Qatar", flag: "🇶🇦" },
  { value: "ro", label: "Roumanie", flag: "🇷🇴" },
  { value: "ru", label: "Russie", flag: "🇷🇺" },
  { value: "rw", label: "Rwanda", flag: "🇷🇼" },
  { value: "kn", label: "Saint-Kitts-et-Nevis", flag: "🇰🇳" },
  { value: "lc", label: "Sainte-Lucie", flag: "🇱🇨" },
  { value: "vc", label: "Saint-Vincent", flag: "🇻🇨" },
  { value: "ws", label: "Samoa", flag: "🇼🇸" },
  { value: "sm", label: "Saint-Marin", flag: "🇸🇲" },
  { value: "st", label: "Sao Tome-et-Principe", flag: "🇸🇹" },
  { value: "sa", label: "Arabie Saoudite", flag: "🇸🇦" },
  { value: "sn", label: "Senegal", flag: "🇸🇳" },
  { value: "rs", label: "Serbie", flag: "🇷🇸" },
  { value: "sc", label: "Seychelles", flag: "🇸🇨" },
  { value: "sl", label: "Sierra Leone", flag: "🇸🇱" },
  { value: "sg", label: "Singapour", flag: "🇸🇬" },
  { value: "sk", label: "Slovaquie", flag: "🇸🇰" },
  { value: "si", label: "Slovenie", flag: "🇸🇮" },
  { value: "sb", label: "Iles Salomon", flag: "🇸🇧" },
  { value: "so", label: "Somalie", flag: "🇸🇴" },
  { value: "za", label: "Afrique du Sud", flag: "🇿🇦" },
  { value: "ss", label: "Soudan du Sud", flag: "🇸🇸" },
  { value: "es", label: "Espagne", flag: "🇪🇸" },
  { value: "lk", label: "Sri Lanka", flag: "🇱🇰" },
  { value: "sd", label: "Soudan", flag: "🇸🇩" },
  { value: "sr", label: "Suriname", flag: "🇸🇷" },
  { value: "se", label: "Suede", flag: "🇸🇪" },
  { value: "ch", label: "Suisse", flag: "🇨🇭" },
  { value: "sy", label: "Syrie", flag: "🇸🇾" },
  { value: "tw", label: "Taiwan", flag: "🇹🇼" },
  { value: "tj", label: "Tadjikistan", flag: "🇹🇯" },
  { value: "tz", label: "Tanzanie", flag: "🇹🇿" },
  { value: "th", label: "Thailande", flag: "🇹🇭" },
  { value: "tl", label: "Timor oriental", flag: "🇹🇱" },
  { value: "tg", label: "Togo", flag: "🇹🇬" },
  { value: "to", label: "Tonga", flag: "🇹🇴" },
  { value: "tt", label: "Trinite-et-Tobago", flag: "🇹🇹" },
  { value: "tn", label: "Tunisie", flag: "🇹🇳" },
  { value: "tr", label: "Turquie", flag: "🇹🇷" },
  { value: "tm", label: "Turkmenistan", flag: "🇹🇲" },
  { value: "tv", label: "Tuvalu", flag: "🇹🇻" },
  { value: "ug", label: "Ouganda", flag: "🇺🇬" },
  { value: "ua", label: "Ukraine", flag: "🇺🇦" },
  { value: "ae", label: "Emirats arabes unis", flag: "🇦🇪" },
  { value: "gb", label: "Royaume-Uni", flag: "🇬🇧" },
  { value: "us", label: "Etats-Unis", flag: "🇺🇸" },
  { value: "uy", label: "Uruguay", flag: "🇺🇾" },
  { value: "uz", label: "Ouzbekistan", flag: "🇺🇿" },
  { value: "vu", label: "Vanuatu", flag: "🇻🇺" },
  { value: "va", label: "Vatican", flag: "🇻🇦" },
  { value: "ve", label: "Venezuela", flag: "🇻🇪" },
  { value: "vn", label: "Vietnam", flag: "🇻🇳" },
  { value: "ye", label: "Yemen", flag: "🇾🇪" },
  { value: "zm", label: "Zambie", flag: "🇿🇲" },
  { value: "zw", label: "Zimbabwe", flag: "🇿🇼" },
  { value: "hk", label: "Hong Kong", flag: "🇭🇰" },
  { value: "mo", label: "Macao", flag: "🇲🇴" },
  { value: "ps", label: "Palestine", flag: "🇵🇸" },
  { value: "xk", label: "Kosovo", flag: "🇽🇰" },
]

// ALL 11 official Incoterms 2020
const allIncoterms = [
  { value: "exw", label: "EXW", description: "Ex Works" },
  { value: "fca", label: "FCA", description: "Free Carrier" },
  { value: "cpt", label: "CPT", description: "Carriage Paid To" },
  { value: "cip", label: "CIP", description: "Carriage & Insurance Paid" },
  { value: "dap", label: "DAP", description: "Delivered At Place" },
  { value: "dpu", label: "DPU", description: "Delivered Place Unloaded" },
  { value: "ddp", label: "DDP", description: "Delivered Duty Paid" },
  { value: "fas", label: "FAS", description: "Free Alongside Ship" },
  { value: "fob", label: "FOB", description: "Free On Board" },
  { value: "cfr", label: "CFR", description: "Cost & Freight" },
  { value: "cif", label: "CIF", description: "Cost Insurance Freight" },
]

// Tax ranges
const taxRanges = [
  { value: "0", label: "Exonere (0%)" },
  { value: "0-5", label: "0% - 5%" },
  { value: "5-10", label: "5% - 10%" },
  { value: "10-15", label: "10% - 15%" },
  { value: "15-20", label: "15% - 20%" },
  { value: "20+", label: "> 20%" },
]

// Common HS code chapters
const hsCodeChapters = [
  { value: "84", label: "84 - Machines" },
  { value: "85", label: "85 - Electronique" },
  { value: "87", label: "87 - Vehicules" },
  { value: "90", label: "90 - Instruments" },
  { value: "39", label: "39 - Plastiques" },
  { value: "73", label: "73 - Fer/Acier" },
  { value: "94", label: "94 - Meubles" },
  { value: "61", label: "61 - Vetements" },
  { value: "62", label: "62 - Textile" },
  { value: "44", label: "44 - Bois" },
]

export function FiltersSidebar({ isCollapsed, onToggleCollapse }: FiltersSidebarProps) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedIncoterms, setSelectedIncoterms] = useState<string[]>([])
  const [selectedTaxes, setSelectedTaxes] = useState<string[]>([])
  const [selectedHsCodes, setSelectedHsCodes] = useState<string[]>([])
  const [countrySearch, setCountrySearch] = useState("")
  const [hsSearch, setHsSearch] = useState("")
  const [expandedSections, setExpandedSections] = useState<string[]>(["pays", "incoterms", "taxes", "hs"])

  const toggleSection = (id: string) => {
    setExpandedSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const toggleCountry = (value: string) => {
    setSelectedCountries(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  const toggleIncoterm = (value: string) => {
    setSelectedIncoterms(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  const toggleTax = (value: string) => {
    setSelectedTaxes(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  const toggleHsCode = (value: string) => {
    setSelectedHsCodes(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  const clearAll = () => {
    setSelectedCountries([])
    setSelectedIncoterms([])
    setSelectedTaxes([])
    setSelectedHsCodes([])
  }

  const totalSelected = selectedCountries.length + selectedIncoterms.length + selectedTaxes.length + selectedHsCodes.length

  const filteredCountries = allCountries.filter(c => 
    c.label.toLowerCase().includes(countrySearch.toLowerCase())
  )

  const filteredHsCodes = hsCodeChapters.filter(h =>
    h.label.toLowerCase().includes(hsSearch.toLowerCase())
  )

  if (isCollapsed) {
    return (
      <aside className="w-12 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col items-center py-4">
        <button
          onClick={onToggleCollapse}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors mb-4"
          title="Ouvrir les filtres"
        >
          <Filter className="h-5 w-5 text-gray-600" />
        </button>
        {totalSelected > 0 && (
          <span className="w-5 h-5 bg-[#2563EB] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {totalSelected}
          </span>
        )}
      </aside>
    )
  }

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[#2563EB]" />
          <span className="text-sm font-semibold text-gray-900">Filtres</span>
          {totalSelected > 0 && (
            <span className="px-1.5 py-0.5 bg-[#2563EB] text-white text-[10px] font-bold rounded">
              {totalSelected}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {totalSelected > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-[#2563EB] hover:text-[#1D4ED8] px-2 py-1 rounded hover:bg-blue-50 transition-colors"
            >
              Effacer
            </button>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
            title="Reduire"
          >
            <ChevronLeft className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {/* Pays d'origine */}
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("pays")}
            className="w-full flex items-center justify-between p-3 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-[#2563EB]" />
              <span className="text-sm font-medium text-gray-800">Pays</span>
              {selectedCountries.length > 0 && (
                <span className="text-[10px] bg-[#2563EB] text-white px-1.5 rounded">
                  {selectedCountries.length}
                </span>
              )}
            </div>
            {expandedSections.includes("pays") ? (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
          </button>
          
          {expandedSections.includes("pays") && (
            <div className="px-3 pb-3">
              <div className="relative mb-2">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  className="w-full h-9 pl-3 pr-9 text-xs bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                />
                {countrySearch ? (
                  <button
                    onClick={() => setCountrySearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
                  </button>
                ) : (
                  <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                )}
              </div>
              <div className="max-h-48 overflow-y-auto space-y-0.5">
                {filteredCountries.map((country) => (
                  <button
                    key={country.value}
                    onClick={() => toggleCountry(country.value)}
                    className={cn(
                      "w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded transition-colors",
                      selectedCountries.includes(country.value)
                        ? "bg-[#2563EB] text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    )}
                  >
                    <span>{country.flag}</span>
                    <span className="truncate">{country.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Incoterms */}
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("incoterms")}
            className="w-full flex items-center justify-between p-3 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Ship className="h-4 w-4 text-[#2563EB]" />
              <span className="text-sm font-medium text-gray-800">Incoterms</span>
              {selectedIncoterms.length > 0 && (
                <span className="text-[10px] bg-[#2563EB] text-white px-1.5 rounded">
                  {selectedIncoterms.length}
                </span>
              )}
            </div>
            {expandedSections.includes("incoterms") ? (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
          </button>
          
          {expandedSections.includes("incoterms") && (
            <div className="px-3 pb-3">
              <div className="grid grid-cols-3 gap-1">
                {allIncoterms.map((incoterm) => (
                  <button
                    key={incoterm.value}
                    onClick={() => toggleIncoterm(incoterm.value)}
                    title={incoterm.description}
                    className={cn(
                      "px-2 py-1.5 text-[10px] font-semibold rounded transition-colors",
                      selectedIncoterms.includes(incoterm.value)
                        ? "bg-[#2563EB] text-white"
                        : "bg-white border border-gray-200 text-gray-700 hover:border-[#2563EB] hover:text-[#2563EB]"
                    )}
                  >
                    {incoterm.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Taxes */}
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("taxes")}
            className="w-full flex items-center justify-between p-3 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-[#2563EB]" />
              <span className="text-sm font-medium text-gray-800">Taxes</span>
              {selectedTaxes.length > 0 && (
                <span className="text-[10px] bg-[#2563EB] text-white px-1.5 rounded">
                  {selectedTaxes.length}
                </span>
              )}
            </div>
            {expandedSections.includes("taxes") ? (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
          </button>
          
          {expandedSections.includes("taxes") && (
            <div className="px-3 pb-3">
              <div className="grid grid-cols-2 gap-1">
                {taxRanges.map((tax) => (
                  <button
                    key={tax.value}
                    onClick={() => toggleTax(tax.value)}
                    className={cn(
                      "px-2 py-1.5 text-[10px] font-medium rounded transition-colors",
                      selectedTaxes.includes(tax.value)
                        ? "bg-[#2563EB] text-white"
                        : "bg-white border border-gray-200 text-gray-700 hover:border-[#2563EB] hover:text-[#2563EB]"
                    )}
                  >
                    {tax.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* HS Codes */}
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("hs")}
            className="w-full flex items-center justify-between p-3 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#2563EB]" />
              <span className="text-sm font-medium text-gray-800">Code SH</span>
              {selectedHsCodes.length > 0 && (
                <span className="text-[10px] bg-[#2563EB] text-white px-1.5 rounded">
                  {selectedHsCodes.length}
                </span>
              )}
            </div>
            {expandedSections.includes("hs") ? (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
          </button>
          
          {expandedSections.includes("hs") && (
            <div className="px-3 pb-3">
              <div className="relative mb-2">
                <input
                  type="text"
                  placeholder="Rechercher code..."
                  value={hsSearch}
                  onChange={(e) => setHsSearch(e.target.value)}
                  className="w-full h-9 pl-3 pr-9 text-xs bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                />
                {hsSearch ? (
                  <button
                    onClick={() => setHsSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
                  </button>
                ) : (
                  <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                )}
              </div>
              <div className="space-y-0.5">
                {filteredHsCodes.map((hs) => (
                  <button
                    key={hs.value}
                    onClick={() => toggleHsCode(hs.value)}
                    className={cn(
                      "w-full flex items-center px-2 py-1.5 text-xs rounded transition-colors",
                      selectedHsCodes.includes(hs.value)
                        ? "bg-[#2563EB] text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    )}
                  >
                    <span className="truncate">{hs.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

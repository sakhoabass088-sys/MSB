"use client"

import { ExternalLink, Star, CircleCheck as CheckCircle, MapPin, Package, Tag, TrendingUp } from "lucide-react"

interface SupplierResult {
  id: string
  name: string
  country: string
  countryCode: string
  product: string
  hsCode: string
  incoterm: string
  unitPrice: string
  moq: string
  taxRate: string
  rating: number
  verified: boolean
}

const mockResults: SupplierResult[] = [
  {
    id: "1",
    name: "Shenzhen Tech Components Ltd.",
    country: "Chine",
    countryCode: "CN",
    product: "Circuits intégrés",
    hsCode: "8542.31",
    incoterm: "FOB",
    unitPrice: "€2.45",
    moq: "10,000",
    taxRate: "3.7%",
    rating: 4.8,
    verified: true,
  },
  {
    id: "2",
    name: "Munich Precision GmbH",
    country: "Allemagne",
    countryCode: "DE",
    product: "Capteurs industriels",
    hsCode: "8542.39",
    incoterm: "CIF",
    unitPrice: "€8.90",
    moq: "1,000",
    taxRate: "0%",
    rating: 4.9,
    verified: true,
  },
  {
    id: "3",
    name: "Tokyo Electronics Corp.",
    country: "Japon",
    countryCode: "JP",
    product: "Condensateurs",
    hsCode: "8532.24",
    incoterm: "DAP",
    unitPrice: "€0.85",
    moq: "50,000",
    taxRate: "2.5%",
    rating: 4.7,
    verified: true,
  },
  {
    id: "4",
    name: "Seoul Semiconductor Co.",
    country: "Corée du Sud",
    countryCode: "KR",
    product: "LED haute puissance",
    hsCode: "8541.41",
    incoterm: "FOB",
    unitPrice: "€1.20",
    moq: "5,000",
    taxRate: "4.2%",
    rating: 4.6,
    verified: false,
  },
  {
    id: "5",
    name: "Taiwan Chip Manufacturing",
    country: "Taïwan",
    countryCode: "TW",
    product: "Processeurs",
    hsCode: "8542.31",
    incoterm: "EXW",
    unitPrice: "€15.60",
    moq: "500",
    taxRate: "3.7%",
    rating: 4.9,
    verified: true,
  },
]

export function ResultsTable() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {mockResults.map((result) => (
        <div
          key={result.id}
          className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#2563EB]/30 transition-all duration-200 p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 text-base truncate">
                  {result.name}
                </h3>
                {result.verified && (
                  <CheckCircle className="h-4 w-4 text-[#2563EB] flex-shrink-0" />
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="inline-flex items-center gap-1">
                    <span className="w-5 h-3.5 bg-gray-100 rounded text-[9px] font-bold flex items-center justify-center text-gray-600 border border-gray-200">
                      {result.countryCode}
                    </span>
                    {result.country}
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Package className="h-3.5 w-3.5" />
                  {result.product}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                  <Tag className="h-3 w-3 text-gray-400" />
                  <span className="text-[11px] text-gray-500 font-medium">Code SH</span>
                  <code className="text-xs font-mono font-semibold text-gray-800">{result.hsCode}</code>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1A40]/5 rounded-lg border border-[#1A1A40]/10">
                  <span className="text-[11px] text-gray-500 font-medium">Incoterm</span>
                  <span className="text-xs font-bold text-[#1A1A40]">{result.incoterm}</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                  <span className="text-[11px] text-gray-500 font-medium">MOQ</span>
                  <span className="text-xs font-mono font-semibold text-gray-800">{result.moq}</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                  <TrendingUp className="h-3 w-3 text-gray-400" />
                  <span className="text-[11px] text-gray-500 font-medium">Taxe</span>
                  <span className="text-xs font-mono font-semibold text-gray-800">{result.taxRate}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 flex-shrink-0">
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 font-mono leading-none">
                  {result.unitPrice}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">par unité</div>
              </div>

              <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-amber-700">{result.rating}</span>
              </div>

              <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors shadow-sm">
                <ExternalLink className="h-3.5 w-3.5" />
                Voir
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

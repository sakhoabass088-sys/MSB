"use client"

import { ArrowUpDown, ExternalLink, Star, CheckCircle } from "lucide-react"

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
    <div className="flex-1 overflow-auto bg-white rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-5 py-4 font-semibold text-gray-600">
              <button className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                Fournisseur
                <ArrowUpDown className="h-3.5 w-3.5" />
              </button>
            </th>
            <th className="text-left px-5 py-4 font-semibold text-gray-600">Pays</th>
            <th className="text-left px-5 py-4 font-semibold text-gray-600">Produit</th>
            <th className="text-left px-5 py-4 font-semibold text-gray-600">
              <button className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                Code SH
                <ArrowUpDown className="h-3.5 w-3.5" />
              </button>
            </th>
            <th className="text-left px-5 py-4 font-semibold text-gray-600">Incoterm</th>
            <th className="text-right px-5 py-4 font-semibold text-gray-600">
              <button className="flex items-center gap-1.5 justify-end hover:text-gray-900 transition-colors">
                Prix Unit.
                <ArrowUpDown className="h-3.5 w-3.5" />
              </button>
            </th>
            <th className="text-right px-5 py-4 font-semibold text-gray-600">MOQ</th>
            <th className="text-right px-5 py-4 font-semibold text-gray-600">
              <button className="flex items-center gap-1.5 justify-end hover:text-gray-900 transition-colors">
                Taxe
                <ArrowUpDown className="h-3.5 w-3.5" />
              </button>
            </th>
            <th className="text-center px-5 py-4 font-semibold text-gray-600">Note</th>
            <th className="px-5 py-4"></th>
          </tr>
        </thead>
        <tbody>
          {mockResults.map((result, index) => (
            <tr 
              key={result.id} 
              className={`
                hover:bg-blue-50/50 transition-colors border-b border-gray-100
                ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}
              `}
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{result.name}</span>
                  {result.verified && (
                    <CheckCircle className="h-4 w-4 text-[#2563EB]" />
                  )}
                </div>
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-4 bg-gray-100 rounded text-[10px] font-bold flex items-center justify-center text-gray-600 border border-gray-200">
                    {result.countryCode}
                  </span>
                  <span className="text-gray-600">{result.country}</span>
                </div>
              </td>
              <td className="px-5 py-4 text-gray-600">{result.product}</td>
              <td className="px-5 py-4">
                <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-800 font-mono border border-gray-200">
                  {result.hsCode}
                </code>
              </td>
              <td className="px-5 py-4">
                <span className="text-xs font-semibold text-[#1A1A40] bg-gray-100 px-2 py-1 rounded">{result.incoterm}</span>
              </td>
              <td className="px-5 py-4 text-right font-mono font-semibold text-gray-900">{result.unitPrice}</td>
              <td className="px-5 py-4 text-right font-mono text-gray-600">{result.moq}</td>
              <td className="px-5 py-4 text-right font-mono text-gray-600">{result.taxRate}</td>
              <td className="px-5 py-4">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold text-gray-900">{result.rating}</span>
                </div>
              </td>
              <td className="px-5 py-4">
                <button className="p-2 text-gray-400 hover:text-[#2563EB] hover:bg-blue-50 rounded-lg transition-colors">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

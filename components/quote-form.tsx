"use client"

import { useState } from "react"
import { Calculator, Send, Info, Package, MapPin, Plus, Trash2, Search, ChevronDown, X } from "lucide-react"

// All world countries with flags
const ALL_COUNTRIES = [
  { code: "AF", name: "Afghanistan", flag: "🇦🇫", currency: "AFN" },
  { code: "AL", name: "Albanie", flag: "🇦🇱", currency: "ALL" },
  { code: "DZ", name: "Algerie", flag: "🇩🇿", currency: "DZD" },
  { code: "AD", name: "Andorre", flag: "🇦🇩", currency: "EUR" },
  { code: "AO", name: "Angola", flag: "🇦🇴", currency: "AOA" },
  { code: "AR", name: "Argentine", flag: "🇦🇷", currency: "ARS" },
  { code: "AM", name: "Armenie", flag: "🇦🇲", currency: "AMD" },
  { code: "AU", name: "Australie", flag: "🇦🇺", currency: "AUD" },
  { code: "AT", name: "Autriche", flag: "🇦🇹", currency: "EUR" },
  { code: "AZ", name: "Azerbaidjan", flag: "🇦🇿", currency: "AZN" },
  { code: "BS", name: "Bahamas", flag: "🇧🇸", currency: "BSD" },
  { code: "BH", name: "Bahrein", flag: "🇧🇭", currency: "BHD" },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩", currency: "BDT" },
  { code: "BE", name: "Belgique", flag: "🇧🇪", currency: "EUR" },
  { code: "BJ", name: "Benin", flag: "🇧🇯", currency: "XOF" },
  { code: "BT", name: "Bhoutan", flag: "🇧🇹", currency: "BTN" },
  { code: "BO", name: "Bolivie", flag: "🇧🇴", currency: "BOB" },
  { code: "BA", name: "Bosnie-Herzegovine", flag: "🇧🇦", currency: "BAM" },
  { code: "BW", name: "Botswana", flag: "🇧🇼", currency: "BWP" },
  { code: "BR", name: "Bresil", flag: "🇧🇷", currency: "BRL" },
  { code: "BN", name: "Brunei", flag: "🇧🇳", currency: "BND" },
  { code: "BG", name: "Bulgarie", flag: "🇧🇬", currency: "BGN" },
  { code: "BF", name: "Burkina Faso", flag: "🇧🇫", currency: "XOF" },
  { code: "BI", name: "Burundi", flag: "🇧🇮", currency: "BIF" },
  { code: "KH", name: "Cambodge", flag: "🇰🇭", currency: "KHR" },
  { code: "CM", name: "Cameroun", flag: "🇨🇲", currency: "XAF" },
  { code: "CA", name: "Canada", flag: "🇨🇦", currency: "CAD" },
  { code: "CV", name: "Cap-Vert", flag: "🇨🇻", currency: "CVE" },
  { code: "CF", name: "Centrafrique", flag: "🇨🇫", currency: "XAF" },
  { code: "CL", name: "Chili", flag: "🇨🇱", currency: "CLP" },
  { code: "CN", name: "Chine", flag: "🇨🇳", currency: "CNY" },
  { code: "CY", name: "Chypre", flag: "🇨🇾", currency: "EUR" },
  { code: "CO", name: "Colombie", flag: "🇨🇴", currency: "COP" },
  { code: "KM", name: "Comores", flag: "🇰🇲", currency: "KMF" },
  { code: "CG", name: "Congo", flag: "🇨🇬", currency: "XAF" },
  { code: "CD", name: "RD Congo", flag: "🇨🇩", currency: "CDF" },
  { code: "KR", name: "Coree du Sud", flag: "🇰🇷", currency: "KRW" },
  { code: "KP", name: "Coree du Nord", flag: "🇰🇵", currency: "KPW" },
  { code: "CR", name: "Costa Rica", flag: "🇨🇷", currency: "CRC" },
  { code: "CI", name: "Cote d'Ivoire", flag: "🇨🇮", currency: "XOF" },
  { code: "HR", name: "Croatie", flag: "🇭🇷", currency: "EUR" },
  { code: "CU", name: "Cuba", flag: "🇨🇺", currency: "CUP" },
  { code: "DK", name: "Danemark", flag: "🇩🇰", currency: "DKK" },
  { code: "DJ", name: "Djibouti", flag: "🇩🇯", currency: "DJF" },
  { code: "DO", name: "Rep. Dominicaine", flag: "🇩🇴", currency: "DOP" },
  { code: "EG", name: "Egypte", flag: "🇪🇬", currency: "EGP" },
  { code: "AE", name: "Emirats Arabes Unis", flag: "🇦🇪", currency: "AED" },
  { code: "EC", name: "Equateur", flag: "🇪🇨", currency: "USD" },
  { code: "ER", name: "Erythree", flag: "🇪🇷", currency: "ERN" },
  { code: "ES", name: "Espagne", flag: "🇪🇸", currency: "EUR" },
  { code: "EE", name: "Estonie", flag: "🇪🇪", currency: "EUR" },
  { code: "SZ", name: "Eswatini", flag: "🇸🇿", currency: "SZL" },
  { code: "US", name: "Etats-Unis", flag: "🇺🇸", currency: "USD" },
  { code: "ET", name: "Ethiopie", flag: "🇪🇹", currency: "ETB" },
  { code: "FJ", name: "Fidji", flag: "🇫🇯", currency: "FJD" },
  { code: "FI", name: "Finlande", flag: "🇫🇮", currency: "EUR" },
  { code: "FR", name: "France", flag: "🇫🇷", currency: "EUR" },
  { code: "GA", name: "Gabon", flag: "🇬🇦", currency: "XAF" },
  { code: "GM", name: "Gambie", flag: "🇬🇲", currency: "GMD" },
  { code: "GE", name: "Georgie", flag: "🇬🇪", currency: "GEL" },
  { code: "DE", name: "Allemagne", flag: "🇩🇪", currency: "EUR" },
  { code: "GH", name: "Ghana", flag: "🇬🇭", currency: "GHS" },
  { code: "GR", name: "Grece", flag: "🇬🇷", currency: "EUR" },
  { code: "GT", name: "Guatemala", flag: "🇬🇹", currency: "GTQ" },
  { code: "GN", name: "Guinee", flag: "🇬🇳", currency: "GNF" },
  { code: "GQ", name: "Guinee equatoriale", flag: "🇬🇶", currency: "XAF" },
  { code: "GW", name: "Guinee-Bissau", flag: "🇬🇼", currency: "XOF" },
  { code: "GY", name: "Guyana", flag: "🇬🇾", currency: "GYD" },
  { code: "HT", name: "Haiti", flag: "🇭🇹", currency: "HTG" },
  { code: "HN", name: "Honduras", flag: "🇭🇳", currency: "HNL" },
  { code: "HK", name: "Hong Kong", flag: "🇭🇰", currency: "HKD" },
  { code: "HU", name: "Hongrie", flag: "🇭🇺", currency: "HUF" },
  { code: "IN", name: "Inde", flag: "🇮🇳", currency: "INR" },
  { code: "ID", name: "Indonesie", flag: "🇮🇩", currency: "IDR" },
  { code: "IQ", name: "Irak", flag: "🇮🇶", currency: "IQD" },
  { code: "IR", name: "Iran", flag: "🇮🇷", currency: "IRR" },
  { code: "IE", name: "Irlande", flag: "🇮🇪", currency: "EUR" },
  { code: "IS", name: "Islande", flag: "🇮🇸", currency: "ISK" },
  { code: "IL", name: "Israel", flag: "🇮🇱", currency: "ILS" },
  { code: "IT", name: "Italie", flag: "🇮🇹", currency: "EUR" },
  { code: "JM", name: "Jamaique", flag: "🇯🇲", currency: "JMD" },
  { code: "JP", name: "Japon", flag: "🇯🇵", currency: "JPY" },
  { code: "JO", name: "Jordanie", flag: "🇯🇴", currency: "JOD" },
  { code: "KZ", name: "Kazakhstan", flag: "🇰🇿", currency: "KZT" },
  { code: "KE", name: "Kenya", flag: "🇰🇪", currency: "KES" },
  { code: "KG", name: "Kirghizistan", flag: "🇰🇬", currency: "KGS" },
  { code: "KW", name: "Koweit", flag: "🇰🇼", currency: "KWD" },
  { code: "LA", name: "Laos", flag: "🇱🇦", currency: "LAK" },
  { code: "LS", name: "Lesotho", flag: "🇱🇸", currency: "LSL" },
  { code: "LV", name: "Lettonie", flag: "🇱🇻", currency: "EUR" },
  { code: "LB", name: "Liban", flag: "🇱🇧", currency: "LBP" },
  { code: "LR", name: "Liberia", flag: "🇱🇷", currency: "LRD" },
  { code: "LY", name: "Libye", flag: "🇱🇾", currency: "LYD" },
  { code: "LI", name: "Liechtenstein", flag: "🇱🇮", currency: "CHF" },
  { code: "LT", name: "Lituanie", flag: "🇱🇹", currency: "EUR" },
  { code: "LU", name: "Luxembourg", flag: "🇱🇺", currency: "EUR" },
  { code: "MO", name: "Macao", flag: "🇲🇴", currency: "MOP" },
  { code: "MK", name: "Macedoine du Nord", flag: "🇲🇰", currency: "MKD" },
  { code: "MG", name: "Madagascar", flag: "🇲🇬", currency: "MGA" },
  { code: "MY", name: "Malaisie", flag: "🇲🇾", currency: "MYR" },
  { code: "MW", name: "Malawi", flag: "🇲🇼", currency: "MWK" },
  { code: "MV", name: "Maldives", flag: "🇲🇻", currency: "MVR" },
  { code: "ML", name: "Mali", flag: "🇲🇱", currency: "XOF" },
  { code: "MT", name: "Malte", flag: "🇲🇹", currency: "EUR" },
  { code: "MA", name: "Maroc", flag: "🇲🇦", currency: "MAD" },
  { code: "MU", name: "Maurice", flag: "🇲🇺", currency: "MUR" },
  { code: "MR", name: "Mauritanie", flag: "🇲🇷", currency: "MRU" },
  { code: "MX", name: "Mexique", flag: "🇲🇽", currency: "MXN" },
  { code: "MD", name: "Moldavie", flag: "🇲🇩", currency: "MDL" },
  { code: "MC", name: "Monaco", flag: "🇲🇨", currency: "EUR" },
  { code: "MN", name: "Mongolie", flag: "🇲🇳", currency: "MNT" },
  { code: "ME", name: "Montenegro", flag: "🇲🇪", currency: "EUR" },
  { code: "MZ", name: "Mozambique", flag: "🇲🇿", currency: "MZN" },
  { code: "MM", name: "Myanmar", flag: "🇲🇲", currency: "MMK" },
  { code: "NA", name: "Namibie", flag: "🇳🇦", currency: "NAD" },
  { code: "NP", name: "Nepal", flag: "🇳🇵", currency: "NPR" },
  { code: "NI", name: "Nicaragua", flag: "🇳🇮", currency: "NIO" },
  { code: "NE", name: "Niger", flag: "🇳🇪", currency: "XOF" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", currency: "NGN" },
  { code: "NO", name: "Norvege", flag: "🇳🇴", currency: "NOK" },
  { code: "NZ", name: "Nouvelle-Zelande", flag: "🇳🇿", currency: "NZD" },
  { code: "NL", name: "Pays-Bas", flag: "🇳🇱", currency: "EUR" },
  { code: "OM", name: "Oman", flag: "🇴🇲", currency: "OMR" },
  { code: "UG", name: "Ouganda", flag: "🇺🇬", currency: "UGX" },
  { code: "UZ", name: "Ouzbekistan", flag: "🇺🇿", currency: "UZS" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰", currency: "PKR" },
  { code: "PS", name: "Palestine", flag: "🇵🇸", currency: "ILS" },
  { code: "PA", name: "Panama", flag: "🇵🇦", currency: "PAB" },
  { code: "PG", name: "Papouasie-Nouvelle-Guinee", flag: "🇵🇬", currency: "PGK" },
  { code: "PY", name: "Paraguay", flag: "🇵🇾", currency: "PYG" },
  { code: "PE", name: "Perou", flag: "🇵🇪", currency: "PEN" },
  { code: "PH", name: "Philippines", flag: "🇵🇭", currency: "PHP" },
  { code: "PL", name: "Pologne", flag: "🇵🇱", currency: "PLN" },
  { code: "PT", name: "Portugal", flag: "🇵🇹", currency: "EUR" },
  { code: "QA", name: "Qatar", flag: "🇶🇦", currency: "QAR" },
  { code: "RO", name: "Roumanie", flag: "🇷🇴", currency: "RON" },
  { code: "GB", name: "Royaume-Uni", flag: "🇬🇧", currency: "GBP" },
  { code: "RU", name: "Russie", flag: "🇷🇺", currency: "RUB" },
  { code: "RW", name: "Rwanda", flag: "🇷🇼", currency: "RWF" },
  { code: "SA", name: "Arabie Saoudite", flag: "🇸🇦", currency: "SAR" },
  { code: "SN", name: "Senegal", flag: "🇸🇳", currency: "XOF" },
  { code: "RS", name: "Serbie", flag: "🇷🇸", currency: "RSD" },
  { code: "SG", name: "Singapour", flag: "🇸🇬", currency: "SGD" },
  { code: "SK", name: "Slovaquie", flag: "🇸🇰", currency: "EUR" },
  { code: "SI", name: "Slovenie", flag: "🇸🇮", currency: "EUR" },
  { code: "SO", name: "Somalie", flag: "🇸🇴", currency: "SOS" },
  { code: "SD", name: "Soudan", flag: "🇸🇩", currency: "SDG" },
  { code: "SS", name: "Soudan du Sud", flag: "🇸🇸", currency: "SSP" },
  { code: "LK", name: "Sri Lanka", flag: "🇱🇰", currency: "LKR" },
  { code: "SE", name: "Suede", flag: "🇸🇪", currency: "SEK" },
  { code: "CH", name: "Suisse", flag: "🇨🇭", currency: "CHF" },
  { code: "SR", name: "Suriname", flag: "🇸🇷", currency: "SRD" },
  { code: "SY", name: "Syrie", flag: "🇸🇾", currency: "SYP" },
  { code: "TW", name: "Taiwan", flag: "🇹🇼", currency: "TWD" },
  { code: "TJ", name: "Tadjikistan", flag: "🇹🇯", currency: "TJS" },
  { code: "TZ", name: "Tanzanie", flag: "🇹🇿", currency: "TZS" },
  { code: "TD", name: "Tchad", flag: "🇹🇩", currency: "XAF" },
  { code: "CZ", name: "Tchequie", flag: "🇨🇿", currency: "CZK" },
  { code: "TH", name: "Thailande", flag: "🇹🇭", currency: "THB" },
  { code: "TL", name: "Timor oriental", flag: "🇹🇱", currency: "USD" },
  { code: "TG", name: "Togo", flag: "🇹🇬", currency: "XOF" },
  { code: "TN", name: "Tunisie", flag: "🇹🇳", currency: "TND" },
  { code: "TM", name: "Turkmenistan", flag: "🇹🇲", currency: "TMT" },
  { code: "TR", name: "Turquie", flag: "🇹🇷", currency: "TRY" },
  { code: "UA", name: "Ukraine", flag: "🇺🇦", currency: "UAH" },
  { code: "UY", name: "Uruguay", flag: "🇺🇾", currency: "UYU" },
  { code: "VU", name: "Vanuatu", flag: "🇻🇺", currency: "VUV" },
  { code: "VE", name: "Venezuela", flag: "🇻🇪", currency: "VES" },
  { code: "VN", name: "Viet Nam", flag: "🇻🇳", currency: "VND" },
  { code: "YE", name: "Yemen", flag: "🇾🇪", currency: "YER" },
  { code: "ZM", name: "Zambie", flag: "🇿🇲", currency: "ZMW" },
  { code: "ZW", name: "Zimbabwe", flag: "🇿🇼", currency: "ZWL" },
  { code: "ZA", name: "Afrique du Sud", flag: "🇿🇦", currency: "ZAR" },
]

// All world currencies
const ALL_CURRENCIES = [
  { code: "USD", name: "Dollar americain", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "Livre sterling", symbol: "£" },
  { code: "JPY", name: "Yen japonais", symbol: "¥" },
  { code: "CNY", name: "Yuan chinois", symbol: "¥" },
  { code: "CHF", name: "Franc suisse", symbol: "CHF" },
  { code: "CAD", name: "Dollar canadien", symbol: "CA$" },
  { code: "AUD", name: "Dollar australien", symbol: "A$" },
  { code: "INR", name: "Roupie indienne", symbol: "Rs" },
  { code: "KRW", name: "Won sud-coreen", symbol: "Won" },
  { code: "BRL", name: "Real bresilien", symbol: "R$" },
  { code: "MXN", name: "Peso mexicain", symbol: "MX$" },
  { code: "RUB", name: "Rouble russe", symbol: "Rub" },
  { code: "ZAR", name: "Rand sud-africain", symbol: "R" },
  { code: "SGD", name: "Dollar singapourien", symbol: "S$" },
  { code: "HKD", name: "Dollar hongkongais", symbol: "HK$" },
  { code: "NOK", name: "Couronne norvegienne", symbol: "kr" },
  { code: "SEK", name: "Couronne suedoise", symbol: "kr" },
  { code: "DKK", name: "Couronne danoise", symbol: "kr" },
  { code: "NZD", name: "Dollar neo-zelandais", symbol: "NZ$" },
  { code: "THB", name: "Baht thailandais", symbol: "THB" },
  { code: "MYR", name: "Ringgit malaisien", symbol: "RM" },
  { code: "IDR", name: "Roupie indonesienne", symbol: "Rp" },
  { code: "PHP", name: "Peso philippin", symbol: "PHP" },
  { code: "PLN", name: "Zloty polonais", symbol: "zl" },
  { code: "TRY", name: "Livre turque", symbol: "TRY" },
  { code: "AED", name: "Dirham emirati", symbol: "AED" },
  { code: "SAR", name: "Riyal saoudien", symbol: "SAR" },
  { code: "ILS", name: "Shekel israelien", symbol: "ILS" },
  { code: "EGP", name: "Livre egyptienne", symbol: "E£" },
  { code: "NGN", name: "Naira nigerian", symbol: "NGN" },
  { code: "KES", name: "Shilling kenyan", symbol: "KSh" },
  { code: "MAD", name: "Dirham marocain", symbol: "MAD" },
  { code: "COP", name: "Peso colombien", symbol: "CO$" },
  { code: "ARS", name: "Peso argentin", symbol: "AR$" },
  { code: "CLP", name: "Peso chilien", symbol: "CL$" },
  { code: "PEN", name: "Sol peruvien", symbol: "S/" },
  { code: "VND", name: "Dong vietnamien", symbol: "VND" },
  { code: "PKR", name: "Roupie pakistanaise", symbol: "Rs" },
  { code: "BDT", name: "Taka bangladais", symbol: "Tk" },
  { code: "UAH", name: "Hryvnia ukrainienne", symbol: "UAH" },
  { code: "CZK", name: "Couronne tcheque", symbol: "Kc" },
  { code: "HUF", name: "Forint hongrois", symbol: "Ft" },
  { code: "RON", name: "Leu roumain", symbol: "lei" },
  { code: "BGN", name: "Lev bulgare", symbol: "lv" },
  { code: "TWD", name: "Dollar taiwanais", symbol: "NT$" },
  { code: "QAR", name: "Riyal qatari", symbol: "QAR" },
  { code: "KWD", name: "Dinar koweitien", symbol: "KWD" },
  { code: "BHD", name: "Dinar bahreini", symbol: "BD" },
  { code: "XOF", name: "Franc CFA BCEAO", symbol: "CFA" },
  { code: "XAF", name: "Franc CFA BEAC", symbol: "CFA" },
]

// All Incoterms 2020
const ALL_INCOTERMS = [
  { code: "EXW", name: "Ex Works", desc: "Depart usine" },
  { code: "FCA", name: "Free Carrier", desc: "Franco transporteur" },
  { code: "CPT", name: "Carriage Paid To", desc: "Port paye jusqu'a" },
  { code: "CIP", name: "Carriage & Insurance Paid To", desc: "Port et assurance payes" },
  { code: "DAP", name: "Delivered At Place", desc: "Rendu au lieu" },
  { code: "DPU", name: "Delivered at Place Unloaded", desc: "Rendu decharge" },
  { code: "DDP", name: "Delivered Duty Paid", desc: "Rendu droits acquittes" },
  { code: "FAS", name: "Free Alongside Ship", desc: "Franco le long du navire" },
  { code: "FOB", name: "Free On Board", desc: "Franco a bord" },
  { code: "CFR", name: "Cost and Freight", desc: "Cout et fret" },
  { code: "CIF", name: "Cost, Insurance & Freight", desc: "Cout, assurance et fret" },
]

interface Article {
  id: string
  description: string
  hsCode: string
  quantity: string
  weight: string
  value: string
}

export function QuoteForm() {
  const [originCountry, setOriginCountry] = useState("")
  const [destinationCountry, setDestinationCountry] = useState("")
  const [incoterm, setIncoterm] = useState("FOB")
  const [originSearch, setOriginSearch] = useState("")
  const [destSearch, setDestSearch] = useState("")
  const [showOriginDropdown, setShowOriginDropdown] = useState(false)
  const [showDestDropdown, setShowDestDropdown] = useState(false)
  const [displayCurrency, setDisplayCurrency] = useState("USD")
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false)
  const [currencySearch, setCurrencySearch] = useState("")
  
  const [articles, setArticles] = useState<Article[]>([
    { id: "1", description: "", hsCode: "", quantity: "", weight: "", value: "" }
  ])

  // Get destination country currency
  const destinationCurrencyCode = destinationCountry 
    ? ALL_COUNTRIES.find(c => c.code === destinationCountry)?.currency || "USD"
    : "USD"

  const getCurrencySymbol = (code: string) => {
    return ALL_CURRENCIES.find(c => c.code === code)?.symbol || code
  }

  const addArticle = () => {
    setArticles([
      ...articles,
      { 
        id: Date.now().toString(), 
        description: "", 
        hsCode: "", 
        quantity: "", 
        weight: "", 
        value: ""
      }
    ])
  }

  const removeArticle = (id: string) => {
    if (articles.length > 1) {
      setArticles(articles.filter(a => a.id !== id))
    }
  }

  const updateArticle = (id: string, field: keyof Article, value: string) => {
    setArticles(articles.map(a => a.id === id ? { ...a, [field]: value } : a))
  }

  const filteredOriginCountries = ALL_COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(originSearch.toLowerCase()) ||
    c.code.toLowerCase().includes(originSearch.toLowerCase())
  )

  const filteredDestCountries = ALL_COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(destSearch.toLowerCase()) ||
    c.code.toLowerCase().includes(destSearch.toLowerCase())
  )

  const filteredCurrencies = ALL_CURRENCIES.filter(c =>
    c.name.toLowerCase().includes(currencySearch.toLowerCase()) ||
    c.code.toLowerCase().includes(currencySearch.toLowerCase())
  )

  return (
    <div className="flex-1 p-8 overflow-auto bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto">
        {/* Header with Currency Selector */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Demande de Devis Expert</h2>
            <p className="text-gray-600">
              Obtenez une estimation detaillee des couts d&apos;importation incluant droits de douane, taxes et frais logistiques.
            </p>
          </div>
          
          {/* Currency Selector */}
          <div className="relative">
            <button
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-[#2563EB] transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">{getCurrencySymbol(displayCurrency)}</span>
              <span className="text-sm text-gray-500">{displayCurrency}</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
            
            {showCurrencyDropdown && (
              <div className="absolute right-0 z-50 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-xl">
                <div className="p-2 border-b border-gray-100">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Rechercher devise..."
                      value={currencySearch}
                      onChange={(e) => setCurrencySearch(e.target.value)}
                      className="w-full h-9 pl-3 pr-9 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                    />
                    {currencySearch ? (
                      <button onClick={() => setCurrencySearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2">
                        <X className="h-3.5 w-3.5 text-gray-400" />
                      </button>
                    ) : (
                      <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                    )}
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto p-1">
                  {filteredCurrencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => {
                        setDisplayCurrency(currency.code)
                        setShowCurrencyDropdown(false)
                        setCurrencySearch("")
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                        displayCurrency === currency.code
                          ? "bg-[#2563EB] text-white"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-medium">{currency.symbol}</span>
                        <span>{currency.code}</span>
                      </span>
                      <span className="text-xs opacity-70 truncate ml-2">{currency.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Origin & Destination */}
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <MapPin className="h-4 w-4 text-purple-600" />
              </div>
              Origine & Destination
            </h3>
            <div className="grid grid-cols-2 gap-5">
              {/* Origin Country */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pays d&apos;origine
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={originSearch}
                    onChange={(e) => {
                      setOriginSearch(e.target.value)
                      setShowOriginDropdown(true)
                    }}
                    onFocus={() => setShowOriginDropdown(true)}
                    placeholder="Rechercher un pays..."
                    className="w-full h-11 pl-4 pr-10 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                  />
                  {originCountry ? (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-sm">
                      <span>{ALL_COUNTRIES.find(c => c.code === originCountry)?.flag}</span>
                      <span className="font-medium text-gray-700">{originCountry}</span>
                    </div>
                  ) : (
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  )}
                </div>
                {showOriginDropdown && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredOriginCountries.slice(0, 50).map(country => (
                      <button
                        key={country.code}
                        onClick={() => {
                          setOriginCountry(country.code)
                          setOriginSearch(country.name)
                          setShowOriginDropdown(false)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left"
                      >
                        <span className="text-lg">{country.flag}</span>
                        <span className="text-sm text-gray-800">{country.name}</span>
                        <span className="text-xs text-gray-400 ml-auto">{country.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Destination Country */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pays de destination
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={destSearch}
                    onChange={(e) => {
                      setDestSearch(e.target.value)
                      setShowDestDropdown(true)
                    }}
                    onFocus={() => setShowDestDropdown(true)}
                    placeholder="Rechercher un pays..."
                    className="w-full h-11 pl-4 pr-10 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                  />
                  {destinationCountry ? (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-sm">
                      <span>{ALL_COUNTRIES.find(c => c.code === destinationCountry)?.flag}</span>
                      <span className="font-medium text-gray-700">{destinationCountry}</span>
                    </div>
                  ) : (
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  )}
                </div>
                {showDestDropdown && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredDestCountries.slice(0, 50).map(country => (
                      <button
                        key={country.code}
                        onClick={() => {
                          setDestinationCountry(country.code)
                          setDestSearch(country.name)
                          setShowDestDropdown(false)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left"
                      >
                        <span className="text-lg">{country.flag}</span>
                        <span className="text-sm text-gray-800">{country.name}</span>
                        <span className="text-xs text-gray-400 ml-auto">{country.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Incoterm Selection */}
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Incoterm</h3>
            <div className="grid grid-cols-6 gap-2">
              {ALL_INCOTERMS.map((inc) => (
                <button
                  key={inc.code}
                  onClick={() => setIncoterm(inc.code)}
                  title={`${inc.name} - ${inc.desc}`}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                    incoterm === inc.code
                      ? "bg-[#2563EB] text-white shadow-sm"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {inc.code}
                </button>
              ))}
            </div>
          </div>

          {/* Articles */}
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Package className="h-4 w-4 text-blue-600" />
                </div>
                Articles ({articles.length})
              </h3>
              {destinationCountry && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>Devise locale:</span>
                  <span className="font-semibold text-gray-700">{destinationCurrencyCode}</span>
                  <span className="text-gray-300">|</span>
                  <span>Affichage:</span>
                  <span className="font-semibold text-[#2563EB]">{displayCurrency}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              {articles.map((article, index) => (
                <div key={article.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-500">Article {index + 1}</span>
                    {articles.length > 1 && (
                      <button
                        onClick={() => removeArticle(article.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                      <input
                        type="text"
                        value={article.description}
                        onChange={(e) => updateArticle(article.id, "description", e.target.value)}
                        placeholder="Ex: Composants electroniques"
                        className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Code SH</label>
                      <input
                        type="text"
                        value={article.hsCode}
                        onChange={(e) => updateArticle(article.id, "hsCode", e.target.value)}
                        placeholder="Ex: 8542.31"
                        className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Quantite</label>
                      <input
                        type="number"
                        value={article.quantity}
                        onChange={(e) => updateArticle(article.id, "quantity", e.target.value)}
                        placeholder="100"
                        className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Poids (kg)</label>
                      <input
                        type="number"
                        value={article.weight}
                        onChange={(e) => updateArticle(article.id, "weight", e.target.value)}
                        placeholder="50"
                        className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Valeur estimee ({getCurrencySymbol(displayCurrency)})
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                          {getCurrencySymbol(displayCurrency)}
                        </span>
                        <input
                          type="number"
                          value={article.value}
                          onChange={(e) => updateArticle(article.id, "value", e.target.value)}
                          placeholder="10000"
                          className="w-full h-10 pl-10 pr-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Article Button - Navy Blue */}
            <button
              onClick={addArticle}
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-[#1A1A40] hover:bg-[#2A2A50] text-white rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Ajouter un article</span>
            </button>
          </div>

          {/* Info Notice */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800 font-medium mb-1">Simulation informative</p>
              <p className="text-xs text-blue-600">
                Ce document est une estimation non-contractuelle basee sur les donnees fournies. 
                Les couts reels peuvent varier selon les conditions de marche et les reglementations en vigueur.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors font-medium">
              <Calculator className="h-5 w-5" />
              Calculer Estimation
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl transition-colors font-medium shadow-sm">
              <Send className="h-5 w-5" />
              Envoyer la Demande
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

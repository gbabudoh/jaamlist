'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, Users, DollarSign, Radio, Search, MapPin, Filter, Grid, List, Music, Mic, Theater, Laugh, Globe, ChevronDown, X, Sparkles, CheckCircle2 } from 'lucide-react'
import { formatDate, formatPrice, getEventTypeColor, getEventStatusColor } from '@/lib/utils'

interface Event {
  id: string
  title: string
  description: string
  thumbnail?: string
  type: string
  status: string
  price?: number
  scheduledAt: string
  currentViewers: number
  country?: string
  category?: string
  creator: {
    name: string
    avatar?: string
  }
  sponsors: Array<{
    name: string
    logo: string
  }>
}

const countries = [
  { code: 'all', name: 'All Countries', flag: '🌍' },
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫' },
  { code: 'AL', name: 'Albania', flag: '🇦🇱' },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿' },
  { code: 'AS', name: 'American Samoa', flag: '🇦🇸' },
  { code: 'AD', name: 'Andorra', flag: '🇦🇩' },
  { code: 'AO', name: 'Angola', flag: '🇦🇴' },
  { code: 'AI', name: 'Anguilla', flag: '🇦🇮' },
  { code: 'AQ', name: 'Antarctica', flag: '🇦🇶' },
  { code: 'AG', name: 'Antigua and Barbuda', flag: '🇦🇬' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'AM', name: 'Armenia', flag: '🇦🇲' },
  { code: 'AW', name: 'Aruba', flag: '🇦🇼' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿' },
  { code: 'BS', name: 'Bahamas', flag: '🇧🇸' },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'BB', name: 'Barbados', flag: '🇧🇧' },
  { code: 'BY', name: 'Belarus', flag: '🇧🇾' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'BZ', name: 'Belize', flag: '🇧🇿' },
  { code: 'BJ', name: 'Benin', flag: '🇧🇯' },
  { code: 'BM', name: 'Bermuda', flag: '🇧🇲' },
  { code: 'BT', name: 'Bhutan', flag: '🇧🇹' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴' },
  { code: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
  { code: 'BW', name: 'Botswana', flag: '🇧🇼' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'IO', name: 'British Indian Ocean Territory', flag: '🇮🇴' },
  { code: 'BN', name: 'Brunei Darussalam', flag: '🇧🇳' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
  { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫' },
  { code: 'BI', name: 'Burundi', flag: '🇧🇮' },
  { code: 'CV', name: 'Cabo Verde', flag: '🇨🇻' },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭' },
  { code: 'CM', name: 'Cameroon', flag: '🇨🇲' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'KY', name: 'Cayman Islands', flag: '🇰🇾' },
  { code: 'CF', name: 'Central African Republic', flag: '🇨🇫' },
  { code: 'TD', name: 'Chad', flag: '🇹🇩' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'CX', name: 'Christmas Island', flag: '🇨🇽' },
  { code: 'CC', name: 'Cocos (Keeling) Islands', flag: '🇨🇨' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'KM', name: 'Comoros', flag: '🇰🇲' },
  { code: 'CD', name: 'Congo (DRC)', flag: '🇨🇩' },
  { code: 'CG', name: 'Congo (Republic)', flag: '🇨🇬' },
  { code: 'CK', name: 'Cook Islands', flag: '🇨🇰' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷' },
  { code: 'CU', name: 'Cuba', flag: '🇨🇺' },
  { code: 'CW', name: 'Curaçao', flag: '🇨🇼' },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'DJ', name: 'Djibouti', flag: '🇩🇯' },
  { code: 'DM', name: 'Dominica', flag: '🇩🇲' },
  { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻' },
  { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶' },
  { code: 'ER', name: 'Eritrea', flag: '🇪🇷' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪' },
  { code: 'SZ', name: 'Eswatini', flag: '🇸🇿' },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
  { code: 'FK', name: 'Falkland Islands', flag: '🇫🇰' },
  { code: 'FO', name: 'Faroe Islands', flag: '🇫🇴' },
  { code: 'FJ', name: 'Fiji', flag: '🇫🇯' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'GF', name: 'French Guiana', flag: '🇬🇫' },
  { code: 'PF', name: 'French Polynesia', flag: '🇵🇫' },
  { code: 'GA', name: 'Gabon', flag: '🇬🇦' },
  { code: 'GM', name: 'Gambia', flag: '🇬🇲' },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'GI', name: 'Gibraltar', flag: '🇬🇮' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'GL', name: 'Greenland', flag: '🇬🇱' },
  { code: 'GD', name: 'Grenada', flag: '🇬🇩' },
  { code: 'GP', name: 'Guadeloupe', flag: '🇬🇵' },
  { code: 'GU', name: 'Guam', flag: '🇬🇺' },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹' },
  { code: 'GG', name: 'Guernsey', flag: '🇬🇬' },
  { code: 'GN', name: 'Guinea', flag: '🇬🇳' },
  { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼' },
  { code: 'GY', name: 'Guyana', flag: '🇬🇾' },
  { code: 'HT', name: 'Haiti', flag: '🇭🇹' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'IS', name: 'Iceland', flag: '🇮🇸' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'IR', name: 'Iran', flag: '🇮🇷' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'IM', name: 'Isle of Man', flag: '🇮🇲' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'CI', name: 'Ivory Coast', flag: '🇨🇮' },
  { code: 'JM', name: 'Jamaica', flag: '🇯🇲' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'JE', name: 'Jersey', flag: '🇯🇪' },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'KI', name: 'Kiribati', flag: '🇰🇮' },
  { code: 'KP', name: 'North Korea', flag: '🇰🇵' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬' },
  { code: 'LA', name: 'Laos', flag: '🇱🇦' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'LS', name: 'Lesotho', flag: '🇱🇸' },
  { code: 'LR', name: 'Liberia', flag: '🇱🇷' },
  { code: 'LY', name: 'Libya', flag: '🇱🇾' },
  { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺' },
  { code: 'MO', name: 'Macao', flag: '🇲🇴' },
  { code: 'MG', name: 'Madagascar', flag: '🇲🇬' },
  { code: 'MW', name: 'Malawi', flag: '🇲🇼' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'MV', name: 'Maldives', flag: '🇲🇻' },
  { code: 'ML', name: 'Mali', flag: '🇲🇱' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹' },
  { code: 'MH', name: 'Marshall Islands', flag: '🇲🇭' },
  { code: 'MQ', name: 'Martinique', flag: '🇲🇶' },
  { code: 'MR', name: 'Mauritania', flag: '🇲🇷' },
  { code: 'MU', name: 'Mauritius', flag: '🇲🇺' },
  { code: 'YT', name: 'Mayotte', flag: '🇾🇹' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'FM', name: 'Micronesia', flag: '🇫🇲' },
  { code: 'MD', name: 'Moldova', flag: '🇲🇩' },
  { code: 'MC', name: 'Monaco', flag: '🇲🇨' },
  { code: 'MN', name: 'Mongolia', flag: '🇲🇳' },
  { code: 'ME', name: 'Montenegro', flag: '🇲🇪' },
  { code: 'MS', name: 'Montserrat', flag: '🇲🇸' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
  { code: 'MZ', name: 'Mozambique', flag: '🇲🇿' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲' },
  { code: 'NA', name: 'Namibia', flag: '🇳🇦' },
  { code: 'NR', name: 'Nauru', flag: '🇳🇷' },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'NC', name: 'New Caledonia', flag: '🇳🇨' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮' },
  { code: 'NE', name: 'Niger', flag: '🇳🇪' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'NU', name: 'Niue', flag: '🇳🇺' },
  { code: 'NF', name: 'Norfolk Island', flag: '🇳🇫' },
  { code: 'MK', name: 'North Macedonia', flag: '🇲🇰' },
  { code: 'MP', name: 'Northern Mariana Islands', flag: '🇲🇵' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'OM', name: 'Oman', flag: '🇴🇲' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'PW', name: 'Palau', flag: '🇵🇼' },
  { code: 'PS', name: 'Palestine', flag: '🇵🇸' },
  { code: 'PA', name: 'Panama', flag: '🇵🇦' },
  { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'PN', name: 'Pitcairn', flag: '🇵🇳' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'PR', name: 'Puerto Rico', flag: '🇵🇷' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦' },
  { code: 'RE', name: 'Réunion', flag: '🇷🇪' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼' },
  { code: 'BL', name: 'Saint Barthélemy', flag: '🇧🇱' },
  { code: 'SH', name: 'Saint Helena', flag: '🇸🇭' },
  { code: 'KN', name: 'Saint Kitts and Nevis', flag: '🇰🇳' },
  { code: 'LC', name: 'Saint Lucia', flag: '🇱🇨' },
  { code: 'MF', name: 'Saint Martin', flag: '🇲🇫' },
  { code: 'PM', name: 'Saint Pierre and Miquelon', flag: '🇵🇲' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', flag: '🇻🇨' },
  { code: 'WS', name: 'Samoa', flag: '🇼🇸' },
  { code: 'SM', name: 'San Marino', flag: '🇸🇲' },
  { code: 'ST', name: 'Sao Tome and Principe', flag: '🇸🇹' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳' },
  { code: 'RS', name: 'Serbia', flag: '🇷🇸' },
  { code: 'SC', name: 'Seychelles', flag: '🇸🇨' },
  { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'SX', name: 'Sint Maarten', flag: '🇸🇽' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮' },
  { code: 'SB', name: 'Solomon Islands', flag: '🇸🇧' },
  { code: 'SO', name: 'Somalia', flag: '🇸🇴' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'GS', name: 'South Georgia', flag: '🇬🇸' },
  { code: 'SS', name: 'South Sudan', flag: '🇸🇸' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'SD', name: 'Sudan', flag: '🇸🇩' },
  { code: 'SR', name: 'Suriname', flag: '🇸🇷' },
  { code: 'SJ', name: 'Svalbard and Jan Mayen', flag: '🇸🇯' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'SY', name: 'Syria', flag: '🇸🇾' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼' },
  { code: 'TJ', name: 'Tajikistan', flag: '🇹🇯' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'TL', name: 'Timor-Leste', flag: '🇹🇱' },
  { code: 'TG', name: 'Togo', flag: '🇹🇬' },
  { code: 'TK', name: 'Tokelau', flag: '🇹🇰' },
  { code: 'TO', name: 'Tonga', flag: '🇹🇴' },
  { code: 'TT', name: 'Trinidad and Tobago', flag: '🇹🇹' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'TM', name: 'Turkmenistan', flag: '🇹🇲' },
  { code: 'TC', name: 'Turks and Caicos Islands', flag: '🇹🇨' },
  { code: 'TV', name: 'Tuvalu', flag: '🇹🇻' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
  { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿' },
  { code: 'VU', name: 'Vanuatu', flag: '🇻🇺' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'WF', name: 'Wallis and Futuna', flag: '🇼🇫' },
  { code: 'EH', name: 'Western Sahara', flag: '🇪🇭' },
  { code: 'YE', name: 'Yemen', flag: '🇾🇪' },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲' },
  { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼' },
]

const categories = [
  { id: 'all', name: 'All Categories', icon: Grid },
  { id: 'Live Concerts', name: 'Live Concerts', icon: Music },
  { id: 'Live Interviews', name: 'Live Interviews', icon: Mic },
  { id: 'Live Stage Dramas', name: 'Live Stage Dramas', icon: Theater },
  { id: 'Live Comedy Shows', name: 'Live Comedy Shows', icon: Laugh },
]

const statusFilters = [
  { id: 'all', name: 'All Events' },
  { id: 'LIVE', name: 'Live Now', dot: true },
  { id: 'APPROVED', name: 'Upcoming' },
  { id: 'ENDED', name: 'Past Events' },
]

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [countryFilter, setCountryFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [loading, setLoading] = useState(true)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [countrySearchQuery, setCountrySearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.append('status', statusFilter)
      if (countryFilter !== 'all') params.append('country', countryFilter)
      if (categoryFilter !== 'all') params.append('category', categoryFilter)
      
      const response = await fetch(`/api/events?${params}`)
      const data = await response.json()
      setEvents(data.events || [])
    } catch (error) {
      console.error('Failed to fetch events:', error)
      setEvents([])
    } finally {
      setLoading(false)
    }
  }, [statusFilter, countryFilter, categoryFilter])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  const filteredEvents = events.filter(event => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      event.creator.name.toLowerCase().includes(query)
    )
  })

  const selectedCountry = countries.find(c => c.code === countryFilter)
  const activeFiltersCount = [statusFilter, countryFilter, categoryFilter].filter(f => f !== 'all').length

  const clearAllFilters = () => {
    setStatusFilter('all')
    setCountryFilter('all')
    setCategoryFilter('all')
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#2d2d2a] to-[#1a1a18] text-white px-4 py-16">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 lg:mb-12"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f7e774]/20 border border-[#f7e774]/30 px-4 py-2 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-[#f7e774]" />
              <span className="text-[10px] sm:text-sm font-black uppercase tracking-widest text-[#f7e774]">Discover Live Experiences</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black mb-4 tracking-tighter">
              Live <span className="text-[#f7e774]">Events</span>
            </h1>
            <p className="text-sm sm:text-lg text-white/50 max-w-2xl mx-auto font-medium leading-relaxed px-4">
              Step into the front row of global culture. Join high-fidelity streams from the world&apos;s most talented creators.
            </p>
          </motion.div>

          {/* Search & Country Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#f7e774] transition-colors" />
                <Input
                  type="text"
                  placeholder="Artist, show, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 h-14 sm:h-16 text-sm sm:text-base bg-white/10 border-white/10 backdrop-blur-xl text-white placeholder:text-white/30 rounded-2xl focus:ring-4 focus:ring-[#f7e774]/20 focus:border-[#f7e774] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              
              {/* Country Selector */}
              <div className="relative md:w-72">
                <button
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="w-full h-14 sm:h-16 px-6 bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl flex items-center gap-3 hover:bg-white/20 transition-all text-white group"
                >
                  <MapPin className="h-5 w-5 text-[#f7e774]" />
                  <span className="text-sm font-black truncate">
                    {selectedCountry?.flag} {selectedCountry?.name}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-white/30 ml-auto transition-transform duration-300 ${showCountryDropdown ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showCountryDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full mt-3 right-0 left-0 md:left-auto md:w-80 bg-white rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100 z-[100] overflow-hidden"
                    >
                      <div className="p-4 border-b bg-slate-50/50">
                        <div className="relative">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            autoFocus
                            placeholder="Find your region..."
                            value={countrySearchQuery}
                            onChange={(e) => setCountrySearchQuery(e.target.value)}
                            className="pl-11 h-12 text-sm bg-white border-slate-200 rounded-xl"
                          />
                        </div>
                      </div>
                      
                      <div className="max-h-72 overflow-y-auto no-scrollbar py-2">
                        {countries
                          .filter(country => 
                            country.name.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
                            country.code === 'all'
                          )
                          .map((country) => (
                          <button
                            key={country.code}
                            onClick={() => {
                              setCountryFilter(country.code)
                              setShowCountryDropdown(false)
                              setCountrySearchQuery('')
                            }}
                            className={`w-full px-5 py-3.5 flex items-center gap-4 hover:bg-slate-50 transition-all text-left ${
                              countryFilter === country.code ? 'bg-[#f7e774]/10' : ''
                            }`}
                          >
                            <span className="text-2xl flex-shrink-0">{country.flag}</span>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm ${countryFilter === country.code ? 'font-black text-[#856404]' : 'font-bold text-[#0f172a]'}`}>
                                {country.name}
                              </p>
                              {country.code === 'all' && <p className="text-[10px] font-medium text-slate-400">Global Search</p>}
                            </div>
                            {countryFilter === country.code && (
                              <CheckCircle2 className="h-4 w-4 text-[#d4a500]" />
                            )}
                          </button>
                        ))}
                        {countries.filter(c => c.name.toLowerCase().includes(countrySearchQuery.toLowerCase())).length === 0 && (
                          <div className="p-8 text-center text-sm text-muted-foreground">
                            <p>No country found</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="sticky top-[80px] z-40 bg-background border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Status Filters */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
              {statusFilters.map((status) => (
                <Button
                  key={status.id}
                  variant={statusFilter === status.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter(status.id)}
                  className={`whitespace-nowrap h-10 px-6 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all ${
                    statusFilter === status.id 
                      ? 'bg-[#0f172a] text-white hover:bg-[#d4a500] border-none shadow-lg' 
                      : 'border-slate-200 text-slate-500 hover:border-[#f7e774] hover:text-[#0f172a]'
                  }`}
                >
                  {status.dot && (
                    <span className="relative flex h-1.5 w-1.5 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                    </span>
                  )}
                  {status.name}
                </Button>
              ))}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3 ml-auto sm:ml-0">
              {/* Category Filter */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={`gap-2 h-10 px-5 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all ${
                  showFilters ? 'bg-[#f7e774]/10 border-[#f7e774] text-[#856404]' : 'border-slate-200 text-slate-500'
                }`}
              >
                <Filter className="h-3.5 w-3.5" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="bg-[#f7e774] text-[#856404] text-[10px] px-1.5 py-0.5 rounded-full font-black">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center p-1 bg-slate-100 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-[#0f172a] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-[#0f172a] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-6 border-t mt-4">
                  <div className="flex flex-col gap-6">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 block">Event Classification</span>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <Button
                            key={cat.id}
                            variant={categoryFilter === cat.id ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setCategoryFilter(cat.id)}
                            className={`h-11 px-6 rounded-xl font-bold text-xs transition-all gap-3 ${
                              categoryFilter === cat.id 
                                ? 'bg-[#0f172a] text-white shadow-lg' 
                                : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                            }`}
                          >
                            <cat.icon className={`h-4 w-4 ${categoryFilter === cat.id ? 'text-[#f7e774]' : ''}`} />
                            {cat.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {activeFiltersCount > 0 && (
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400">Showing filtered results</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearAllFilters}
                          className="h-10 px-4 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 font-black text-[10px] uppercase tracking-widest"
                        >
                          <X className="h-3.5 w-3.5 mr-2" />
                          Reset Filters
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {loading ? 'Loading...' : `${filteredEvents.length} events found`}
            {countryFilter !== 'all' && ` in ${selectedCountry?.name}`}
          </p>
        </div>

        {/* Events Grid/List */}
        {loading ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg" />
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-[#f7e774]/20 flex items-center justify-center mx-auto mb-6">
              <Radio className="h-10 w-10 text-[#d4a500]" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {searchQuery 
                ? `No events match "${searchQuery}". Try a different search term.`
                : 'No events match your current filters. Try adjusting your search criteria.'}
            </p>
            <Button onClick={clearAllFilters} className="bg-[#f7e774] text-[#2d2d2a] hover:bg-[#f0df5f]">
              Clear all filters
            </Button>
          </motion.div>
        ) : (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/events/${event.id}`}>
                  <Card className={`group overflow-hidden transition-all hover:shadow-xl border-2 hover:border-[#f7e774] h-full ${
                    viewMode === 'list' ? 'flex flex-row' : ''
                  }`}>
                    {/* Thumbnail */}
                    <div className={`relative overflow-hidden bg-gradient-to-br from-[#f7e774]/10 to-[#60615b]/10 ${
                      viewMode === 'list' ? 'w-64 aspect-[4/3]' : 'aspect-video'
                    }`}>
                      {event.thumbnail ? (
                        <Image
                          src={event.thumbnail}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Radio className="h-16 w-16 text-muted-foreground/30" />
                        </div>
                      )}
                      
                      {/* Status Badge */}
                      <div className="absolute top-3 right-3 flex gap-2">
                        <span className={`rounded-full ${getEventStatusColor(event.status)} px-3 py-1 text-xs font-semibold text-white shadow-lg`}>
                          {event.status === 'LIVE' && (
                            <span className="relative flex h-2 w-2 mr-1.5 inline-block">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                          )}
                          {event.status}
                        </span>
                      </div>

                      {/* Type Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`rounded-full ${getEventTypeColor(event.type)} px-3 py-1 text-xs font-semibold text-white shadow-lg`}>
                          {event.type}
                        </span>
                      </div>

                      {/* Country Badge */}
                      {event.country && (
                        <div className="absolute bottom-3 left-3">
                          <span className="rounded-full bg-white/90 backdrop-blur px-2 py-1 text-xs font-medium shadow flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {event.country}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className={viewMode === 'list' ? 'flex-1' : ''}>
                      <CardHeader>
                        <CardTitle className="line-clamp-2 group-hover:text-[#d4a500] transition-colors">
                          {event.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {event.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(new Date(event.scheduledAt))}</span>
                        </div>

                        {event.status === 'LIVE' && (
                          <div className="flex items-center gap-2 text-sm text-red-500 font-medium">
                            <Users className="h-4 w-4" />
                            <span>{event.currentViewers.toLocaleString()} watching now</span>
                          </div>
                        )}

                        {event.type === 'PAID' && event.price && (
                          <div className="flex items-center gap-2 text-sm font-semibold text-[#d4a500]">
                            <DollarSign className="h-4 w-4" />
                            <span>{formatPrice(event.price)}</span>
                          </div>
                        )}

                        {event.sponsors && event.sponsors.length > 0 && (
                          <div className="pt-2 border-t">
                            <p className="text-xs text-muted-foreground mb-2">Sponsored by</p>
                            <div className="flex gap-2">
                              {event.sponsors.slice(0, 3).map((sponsor) => (
                                <div key={sponsor.name} className="relative h-8 w-8 rounded-full border bg-white p-1">
                                  <Image
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="pt-2 flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            by <span className="font-medium text-foreground">{event.creator.name}</span>
                          </p>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
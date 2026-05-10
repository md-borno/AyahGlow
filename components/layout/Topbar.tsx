// 'use client'

// import {
//   Moon,
//   Sun,
// } from 'lucide-react'
// import { useSettings } from '@/providers/settings-provider'
// import SearchBar from '../search/SearchBar'
// import { useEffect, useMemo, useState } from 'react'
// import { getSurah, getSurahs } from '@/services/quran.service'



// export default function Topbar() {
//   const [surahs, setSurahs] = useState<Surah[]>([])
//     const [selectedSurahId, setSelectedSurahId] = useState(1)
//     const [selectedSurahData, setSelectedSurahData] = useState<any>(null)
//     const [loading, setLoading] = useState(true)
//     const [sidebarSearch, setSidebarSearch] = useState('')
//     const [searchQuery, setSearchQuery] = useState('')
//     const [searchResults, setSearchResults] = useState<any[]>([])
//     const [searchLoading, setSearchLoading] = useState(false)
//     const [mobilePanel, setMobilePanel] = useState<'surah' | 'settings' | null>(null)
  
//     const {
//       arabicFontFamily,
//       translationLanguage,
//     } = useSettings()
  
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const surahsData = await getSurahs()
//           setSurahs(surahsData)
//           const firstSurahData = await getSurah(1)
//           setSelectedSurahData(firstSurahData)
//         } catch (error) {
//           console.error('Failed to fetch data:', error)
//         } finally {
//           setLoading(false)
//         }
//       }
  
//       fetchData()
//     }, [])
  
//     useEffect(() => {
//       if (!searchQuery || searchQuery.length < 2) {
//         // eslint-disable-next-line react-hooks/set-state-in-effect
//         setSearchResults([])
//         return
//       }
  
//       const controller = new AbortController()
//       const timer = window.setTimeout(async () => {
//         setSearchLoading(true)
  
//         try {
//           const response = await fetch(
//             `/api/search?q=${encodeURIComponent(searchQuery)}`,
//             {
//               signal: controller.signal,
//             }
//           )
  
//           if (!response.ok) {
//             throw new Error('Search failed')
//           }
  
//           const results = await response.json()
//           setSearchResults(results)
//         } catch (error) {
//           if ((error as any).name !== 'AbortError') {
//             console.error(error)
//           }
//         } finally {
//           setSearchLoading(false)
//         }
//       }, 350)
  
//       return () => {
//         controller.abort()
//         window.clearTimeout(timer)
//       }
//     }, [searchQuery])
  
//     const filteredSurahs = useMemo(
//       () =>
//         surahs.filter((surah) =>
//           surah.englishName.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
//           surah.englishNameTranslation.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
//           surah.name.toLowerCase().includes(sidebarSearch.toLowerCase())
//         ),
//       [surahs, sidebarSearch]
//     )
  
//     const arabicFontClass =
//       arabicFontFamily === 'Scheherazade New'
//         ? 'font-arabic-scheherazade'
//         : 'font-arabic-amiri'
  
//     const translationFontClass =
//       translationLanguage === 'bangla'
//         ? 'font-translation-bn'
//         : 'font-translation-en'
  
//     const handleSurahSelect = async (surahId: number) => {
//       setSelectedSurahId(surahId)
//       setSearchQuery('')
//       setMobilePanel(null)
//       setLoading(true)
  
//       try {
//         const data = await getSurah(surahId)
//         setSelectedSurahData(data)
//       } catch (error) {
//         console.error('Failed to fetch surah:', error)
//       } finally {
//         setLoading(false)
//       }
//     }
  
//     if (loading) {
//       return <div className="flex h-screen items-center justify-center">Loading...</div>
//     }
//   const { theme, setTheme } = useSettings()

//   return (
   
//       <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6">
//         <div>
//           <h1 className="text-3xl font-bold sm:text-4xl">
//             Quran Mazid
//           </h1>
//           <p className="max-w-2xl text-sm text-gray-600 dark:text-gray-300 mt-2">
//             Read, Study, and Learn The Quran
//           </p>
//         </div>

//         <div className="flex flex-col gap-3 w-full max-w-xl">
//           <SearchBar
//             onSearch={setSearchQuery}
//             placeholder="Search ayahs by Arabic or English text"
//           />
//           <div className="hidden md:flex items-center justify-between gap-3">
//             <button
//               type="button"
//               onClick={() => setMobilePanel('surah')}
//               className="rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-[#111827] dark:text-gray-200 dark:hover:bg-gray-900"
//             >
//               Browse Surahs
//             </button>
//             <button
//               type="button"
//               onClick={() => setMobilePanel('settings')}
//               className="rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-[#111827] dark:text-gray-200 dark:hover:bg-gray-900"
//             >
//               Settings
//             </button>
//           </div>
//         </div>
//       </div>

      
//   )
// }
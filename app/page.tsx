'use client'

import { useEffect, useMemo, useState } from 'react'
import { getSurahs, getSurah, getJuz } from '@/services/quran.service'
import ReadingLayout from '@/components/layout/ReadingLayout'
import SurahList from '@/components/quran/SurahList'
import SurahReaderClient from '@/components/quran/SurahReaderClient'
import { useSettings } from '@/providers/settings-provider'
import {
  Moon, Sun, Menu, X, Search, Settings,
  ChevronDown, ChevronUp, BookOpen,
} from 'lucide-react'
import { Surah } from '@/types/surah'
import JuzList from '@/components/quran/JuzzList'

type Tab = 'Surah' | 'Juz' | 'Page'

export default function HomePage() {
  const [surahs, setSurahs] = useState<Surah[]>([])
  const [selectedSurahId, setSelectedSurahId] = useState(1)
  const [selectedSurahData, setSelectedSurahData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarSearch, setSidebarSearch] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('Surah')
  const [juzs, setJuzs] = useState<any[]>([])
  const [selectedJuzId, setSelectedJuzId] = useState(1)
  const [selectedJuzData, setSelectedJuzData] = useState<any>(null)
  // Mobile only
  const [mobilePanel, setMobilePanel] = useState<'surah' | 'settings' | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)

  // Desktop right panel accordions
  const [readingOpen, setReadingOpen] = useState(false)
  const [fontOpen, setFontOpen] = useState(true)

  const {
    theme, setTheme,
    arabicFontFamily, setArabicFontFamily,
    arabicFontSize, setArabicFontSize,
    translationFontSize, setTranslationFontSize,
    translationLanguage, setTranslationLanguage,
  } = useSettings()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const surahsData = await getSurahs()
        setSurahs(surahsData)
        const firstSurahData = await getSurah(1)
        setSelectedSurahData(firstSurahData)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2) {
      setSearchResults([])
      return
    }
    const controller = new AbortController()
    const timer = window.setTimeout(async () => {
      setSearchLoading(true)
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(searchQuery)}`,
          { signal: controller.signal }
        )
        if (!response.ok) throw new Error('Search failed')
        const results = await response.json()
        setSearchResults(results)
      } catch (error) {
        if ((error as any).name !== 'AbortError') console.error(error)
      } finally {
        setSearchLoading(false)
      }
    }, 350)
    return () => { controller.abort(); window.clearTimeout(timer) }
  }, [searchQuery])
  useEffect(() => {
    if (activeTab !== 'Juz') return

    const fetchJuz = async () => {
      const allJuz = []

      for (let i = 1; i <= 30; i++) {
        const res = await getJuz(i)
        allJuz.push(res)
      }

      setJuzs(allJuz)
    }

    fetchJuz()
  }, [activeTab])
  const filteredSurahs = useMemo(
    () => surahs.filter((s) =>
      s.englishName.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
      s.englishNameTranslation.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
      s.name.toLowerCase().includes(sidebarSearch.toLowerCase())
    ),
    [surahs, sidebarSearch]
  )
  const handleJuzSelect = async (juzId: number) => {
    setSelectedJuzId(juzId)
    setLoading(true)

    try {
      const data = await getJuz(juzId)
      setSelectedJuzData(data)
    } finally {
      setLoading(false)
    }
  }
  const arabicFontClass = arabicFontFamily === 'Scheherazade New'
    ? 'font-arabic-scheherazade' : 'font-arabic-amiri'

  const translationFontClass = translationLanguage === 'bangla'
    ? 'font-translation-bn' : 'font-translation-en'

  const handleSurahSelect = async (surahId: number) => {
    setSelectedSurahId(surahId)
    setSearchQuery('')
    setMobilePanel(null)
    setLoading(true)
    try {
      const data = await getSurah(surahId)
      setSelectedSurahData(data)
    } catch (error) {
      console.error('Failed to fetch surah:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-400">
        Loading…
      </div>
    )
  }

  // ─────────────────────────────────────────
  // Shared: Surah list tabs + search + list
  // ─────────────────────────────────────────
  const SurahPanel = (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex gap-1 p-1 mb-4 bg-gray-100 dark:bg-gray-800 rounded-full shrink-0">
        {(['Surah', 'Juz', 'Page'] as Tab[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-full py-1.5 text-sm font-medium transition-all
              ${activeTab === tab
                ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-3 shrink-0">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search Surah"
          value={sidebarSearch}
          onChange={(e) => setSidebarSearch(e.target.value)}
          className="w-full rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-9 pr-4 py-2 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 outline-none focus:border-green-400 transition"
        />
      </div>

      {/* Scrollable list */}
      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'Surah' && (
          <SurahList
            surahs={filteredSurahs}
            selectedSurahId={selectedSurahId}
            onSelect={handleSurahSelect}
          />
        )}

        {activeTab === 'Juz' && (
          <JuzList
            juzs={juzs}
            selectedJuzId={selectedJuzId}
            onSelect={handleJuzSelect}
          />
        )}

        {activeTab === 'Page' && (
          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            {Array.from({ length: 604 }, (_, i) => (
              <button
                key={i + 1}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Page {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  // ─────────────────────────────────────────
  // Shared: Settings accordions
  // ─────────────────────────────────────────
  const SettingsPanel = (
    <div>
      {/* Translation / Reading mode toggle */}
      <div className="flex gap-1 p-1 mb-5 bg-gray-100 dark:bg-gray-800 rounded-full">
        {['Translation', 'Reading'].map((mode) => (
          <button
            key={mode}
            type="button"
            className={`flex-1 rounded-full py-1.5 text-sm font-medium transition-all
              ${mode === 'Translation'
                ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Reading Settings accordion */}
      <button
        type="button"
        onClick={() => setReadingOpen((v) => !v)}
        className="flex w-full items-center justify-between py-3.5 text-sm font-medium text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800"
      >
        <span className="flex items-center gap-2">
          <BookOpen size={15} className="text-gray-400 dark:text-gray-500" />
          Reading Settings
        </span>
        {readingOpen ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
      </button>
      {readingOpen && (
        <div className="py-4 space-y-4 border-b border-gray-100 dark:border-gray-800">
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Translation language</label>
            <select
              value={translationLanguage}
              onChange={(e) => setTranslationLanguage(e.target.value as 'english' | 'bangla')}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 outline-none"
            >
              <option value="english">English</option>
              <option value="bangla">Bangla</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">Arabic Font Face</label>
            <button
              type="button"
              onClick={() => setArabicFontFamily(arabicFontFamily === 'Amiri' ? 'Scheherazade New' : 'Amiri')}
              className="flex w-full items-center justify-between rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <span>{arabicFontFamily}</span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>
          </div>
        </div>
      )}

      {/* Font Settings accordion */}
      <button
        type="button"
        onClick={() => setFontOpen((v) => !v)}
        className="flex w-full items-center justify-between py-3.5 text-sm font-semibold text-green-700 dark:text-green-400 border-b border-gray-100 dark:border-gray-800"
      >
        <span className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-green-600 text-white text-[11px] font-bold">T</span>
          Font Settings
        </span>
        {fontOpen ? <ChevronUp size={15} className="text-green-600 dark:text-green-400" /> : <ChevronDown size={15} className="text-green-600 dark:text-green-400" />}
      </button>
      {fontOpen && (
        <div className="py-4 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Arabic Font Size</span>
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">{arabicFontSize}</span>
            </div>
            <input
              type="range" min="28" max="80" step="2"
              value={arabicFontSize}
              onChange={(e) => setArabicFontSize(Number(e.target.value))}
              className="w-full accent-green-600"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Translation Font Size</span>
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">{translationFontSize}</span>
            </div>
            <input
              type="range" min="14" max="32" step="1"
              value={translationFontSize}
              onChange={(e) => setTranslationFontSize(Number(e.target.value))}
              className="w-full accent-green-600"
            />
          </div>

          
        </div>
      )}
    </div>
  )

  // ─────────────────────────────────────────
  // Shared: Search results
  // ─────────────────────────────────────────
  const SearchContent = (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Search results</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Matches for "{searchQuery}"</p>
        </div>
        <button
          type="button"
          onClick={() => { setSearchQuery(''); setSearchOpen(false) }}
          className="rounded-full border border-gray-200 dark:border-gray-700 px-4 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          Clear
        </button>
      </div>
      {searchLoading ? (
        <div className="py-14 text-center text-gray-400">Searching…</div>
      ) : searchResults.length ? (
        <div className="space-y-5">
          {searchResults.map((result) => (
            <div key={`${result.surah.number}-${result.number}`} className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Surah {result.surah.number} · {result.surah.englishName}</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Ayah {result.number}</p>
                </div>
                <a href={`/surah/${result.surah.number}`} className="text-xs font-semibold text-green-600 dark:text-green-400 hover:underline">
                  Open →
                </a>
              </div>
              <div className="px-5 py-4 bg-white dark:bg-gray-900">
                <p className={`text-right ${arabicFontClass} leading-loose mb-3`} style={{ fontSize: arabicFontSize }}>
                  {result.text}
                </p>
                <p className={`${translationFontClass} text-gray-600 dark:text-gray-300 leading-7`} style={{ fontSize: translationFontSize }}>
                  {result.translation}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-14 text-center text-gray-400">No matches found.</div>
      )}
    </div>
  )

  return (
    <ReadingLayout>
      <div className="hidden lg:flex flex-col h-full ">

        {/* ── Desktop top navbar ── */}
        <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shrink-0">
          {/* Left: title */}
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">Quran Mazid</h1>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Read, Study, and Learn The Quran</p>
          </div>

          {/* Right: search + theme toggle */}
          <div className="flex items-center gap-3">
            {/* Inline search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search ayahs…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-9 pr-4 py-1.5 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 outline-none focus:border-green-400 focus:w-72 transition-all duration-200"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-9 w-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </header>

        {/* ── Desktop 3-column body ── */}
        <div className="flex flex-1 overflow-hidden">

          {/* Left panel — surah list (always visible on desktop) */}
          <aside className="w-[280px] shrink-0 flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
            <div className="flex-1 overflow-hidden flex flex-col p-4">
              {SurahPanel}
            </div>
          </aside>

          {/* Center — reader */}
          <main className="flex-1 overflow-y-auto bg-[#f8f7f4] dark:bg-gray-950">
            <div className="w-full mx-auto ">
              {searchQuery ? SearchContent : selectedSurahData
                ? <SurahReaderClient surahId={selectedSurahId} data={selectedSurahData} />
                : null}
            </div>
          </main>

          {/* Right panel — settings (always visible on desktop) */}
          <aside className="w-[260px] shrink-0 flex flex-col border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-y-auto">
            <div className="p-4">
              {SettingsPanel}
            </div>
          </aside>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MOBILE LAYOUT  (below lg)
          Navbar: hamburger left | title center-ish | search+settings icons right
          Surah list and settings hidden behind drawers
      ══════════════════════════════════════════════════════ */}
      <div className="lg:hidden flex flex-col h-full">

        {/* Mobile top navbar */}
        <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-3">
            {/* Hamburger — opens surah list drawer */}
            <button
              type="button"
              onClick={() => setMobilePanel('surah')}
              className="h-9 w-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Open surah list"
            >
              <Menu size={18} />
            </button>
            <div>
              <p className="text-base font-bold text-gray-900 dark:text-white leading-tight">Quran Mazid</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Read, Study, and Learn</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Search icon — toggles inline search bar */}
            <button
              type="button"
              onClick={() => { setSearchOpen((v) => !v); if (searchOpen) setSearchQuery('') }}
              className="h-9 w-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle search"
            >
              {searchOpen ? <X size={18} /> : <Search size={18} />}
            </button>

            {/* Settings icon — opens settings drawer */}
            <button
              type="button"
              onClick={() => setMobilePanel('settings')}
              className="h-9 w-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Settings"
            >
              <Settings size={18} />
            </button>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-9 w-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </header>

        {/* Collapsible search bar (mobile) */}
        {searchOpen && (
          <div className="px-4 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shrink-0">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                autoFocus
                type="text"
                placeholder="Search ayahs by Arabic or English text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-9 pr-4 py-2 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 outline-none focus:border-green-400 transition"
              />
            </div>
          </div>
        )}

        {/* Mobile reader content */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-950 px-4 py-5">
          {searchQuery ? SearchContent : selectedSurahData
            ? <SurahReaderClient surahId={selectedSurahId} data={selectedSurahData} />
            : null}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MOBILE DRAWERS  (lg:hidden)
      ══════════════════════════════════════════════════════ */}

      {/* Backdrop */}
      {mobilePanel && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobilePanel(null)}
        />
      )}

      {/* Surah drawer — slides from left */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm flex flex-col
        bg-white dark:bg-gray-900 shadow-2xl
        transition-transform duration-300 ease-in-out
        ${mobilePanel === 'surah' ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <h2 className="font-semibold text-gray-900 dark:text-white">Surah list</h2>
          <button
            type="button"
            onClick={() => setMobilePanel(null)}
            className="h-9 w-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-hidden flex flex-col px-4 py-4">
          {SurahPanel}
        </div>
      </div>

      {/* Settings drawer — slides from right */}
      <div className={`lg:hidden fixed inset-y-0 right-0 z-50 w-[85vw] max-w-sm flex flex-col
        bg-white dark:bg-gray-900 shadow-2xl
        transition-transform duration-300 ease-in-out
        ${mobilePanel === 'settings' ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <h2 className="font-semibold text-gray-900 dark:text-white">Reading settings</h2>
          <button
            type="button"
            onClick={() => setMobilePanel(null)}
            className="h-9 w-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-2">
          {SettingsPanel}
        </div>
      </div>

    </ReadingLayout>
  )
}
'use client'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface SettingsState {
  theme: 'light' | 'dark'
  arabicFontFamily: 'Amiri' | 'Scheherazade New'
  arabicFontSize: number
  translationFontSize: number
  translationLanguage: 'english' | 'bangla'
}

interface SettingsContextValue extends SettingsState {
  setTheme: (theme: 'light' | 'dark') => void
  setArabicFontFamily: (font: 'Amiri' | 'Scheherazade New') => void
  setArabicFontSize: (size: number) => void
  setTranslationFontSize: (size: number) => void
  setTranslationLanguage: (language: 'english' | 'bangla') => void
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined)

const STORAGE_KEY = 'ayahglow-settings'

const defaultSettings: SettingsState = {
  theme: 'dark',
  arabicFontFamily: 'Amiri',
  arabicFontSize: 48,
  translationFontSize: 18,
  translationLanguage: 'english',
}

export function SettingsProvider({
  children,
}: {
  children: ReactNode
}) {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<SettingsState>
        setSettings((current) => ({ ...current, ...parsed }))
      } catch (error) {
        console.error('Unable to parse settings', error)
      }
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    document.documentElement.classList.toggle('dark', settings.theme === 'dark')
  }, [settings])

  const value = useMemo(
    () => ({
      ...settings,
      setTheme: (theme: 'light' | 'dark') =>
        setSettings((current) => ({ ...current, theme })),
      setArabicFontFamily: (arabicFontFamily: 'Amiri' | 'Scheherazade New') =>
        setSettings((current) => ({ ...current, arabicFontFamily })),
      setArabicFontSize: (arabicFontSize: number) =>
        setSettings((current) => ({ ...current, arabicFontSize })),
      setTranslationFontSize: (translationFontSize: number) =>
        setSettings((current) => ({ ...current, translationFontSize })),
      setTranslationLanguage: (
        translationLanguage: 'english' | 'bangla'
      ) => setSettings((current) => ({ ...current, translationLanguage })),
    }),
    [settings]
  )

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)

  if (!context) {
    throw new Error(
      'useSettings must be used within SettingsProvider'
    )
  }

  return context
}

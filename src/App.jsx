import { createContext, useContext, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import LiveChat from './pages/LiveChat.jsx'
import Skills from './pages/Skills.jsx'
import Certificates from './pages/Certificates.jsx'
import Contact from './pages/Contact.jsx'


export const ThemeContext = createContext(null)
export function useTheme() { return useContext(ThemeContext) }

const THEMES = [
  { id: 'cyan',    label: 'Cyan',    color: '#06b6d4', gradient: 'from-cyan-500 to-blue-500' },
  { id: 'violet',  label: 'Violet',  color: '#8b5cf6', gradient: 'from-violet-500 to-purple-500' },
  { id: 'emerald', label: 'Emerald', color: '#10b981', gradient: 'from-emerald-500 to-teal-500' },
  { id: 'amber',   label: 'Amber',   color: '#f59e0b', gradient: 'from-amber-500 to-orange-500' },
  { id: 'rose',    label: 'Rose',    color: '#f43f5e', gradient: 'from-rose-500 to-pink-500' },
]

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'cyan')

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme)

    const selectedTheme = THEMES.find(t => t.id === theme)
    const accentColor = selectedTheme ? selectedTheme.color : '#06b6d4'
    const gradientClass = selectedTheme ? selectedTheme.gradient : 'from-cyan-500 to-blue-500'

    document.documentElement.style.setProperty('--bg-main', '#0a0a0a')
    document.documentElement.style.setProperty('--bg-sidebar', '#0f0f0f')
    document.documentElement.style.setProperty('--bg-card', '#1a1a1a')
    document.documentElement.style.setProperty('--bg-card-hover', '#222222')
    document.documentElement.style.setProperty('--border-color', '#2a2a2a')
    document.documentElement.style.setProperty('--text-primary', '#ffffff')
    document.documentElement.style.setProperty('--text-secondary', '#a0a0a0')
    document.documentElement.style.setProperty('--text-muted', '#6b6b6b')
    document.documentElement.style.setProperty('--accent', accentColor)
    document.documentElement.style.setProperty('--accent-dim', `${accentColor}20`)
    document.documentElement.style.setProperty('--accent-border', `${accentColor}40`)
    document.documentElement.style.setProperty('--gradient', gradientClass)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      <div className="min-h-screen bg-black">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="skills" element={<Skills />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="contact" element={<Contact />} />
            <Route path="livechat" element={<LiveChat />} />
          </Route>
        </Routes>
      </div>
    </ThemeContext.Provider>
  )
}

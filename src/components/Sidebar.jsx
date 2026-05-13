import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  Home, User, Zap, Award, Mail,
  Github, Linkedin, Send,
  Menu, X, Shield, ChevronRight, MessageCircle,
  Instagram, Bot
} from 'lucide-react'
import { useTheme } from '../App.jsx'
import AIChatModal from './AIChatModal'

const NAV_ITEMS = [
  { path: '/',            label: 'Home',       icon: Home },
  { path: '/about',       label: 'Tentang',    icon: User },
  { path: '/skills',      label: 'Skills',     icon: Zap },
  { path: '/certificates',label: 'Sertifikat', icon: Award },
  { path: '/livechat',    label: 'Live Chat',  icon: MessageCircle },
  { path: '/contact',     label: 'Kontak',     icon: Mail },
]

const SOCIAL_LINKS = [
  { href: 'https://github.com/zenithxnecxus',      icon: Github,    label: 'GitHub' },
  { href: 'https://linkedin.com/in/zaidan03',       icon: Linkedin,  label: 'LinkedIn' },
  { href: 'https://instagram.com/idann.notsefuh',   icon: Instagram, label: 'Instagram' },
  { href: 'https://t.me/zenithx_9',                 icon: Send,      label: 'Telegram' },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAIOpen, setIsAIOpen] = useState(false)
  const { theme, setTheme, themes } = useTheme()
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getAccent = () => {
    const t = themes?.find(t => t.id === theme)
    return t ? t.color : '#06b6d4'
  }

  return (
    <div>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md transition-all duration-200"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-primary)'
        }}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-40 flex flex-col transition-transform duration-300 ease-in-out w-[280px] ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{
          background: 'var(--bg-sidebar)',
          borderRight: `1px solid ${getAccent()}`
        }}
      >
        {/* Profile */}
        <div className="px-6 pt-8 pb-6 text-center">
          <div className="relative inline-block mb-4">
            <div
              className="w-[110px] h-[110px] rounded-full mx-auto overflow-hidden"
              style={{ border: '2px solid #333' }}
            >
              <img
                src="https://ui-avatars.com/api/?name=AZ&background=0a0a0a&color=ff3333&size=110&bold=true"
                alt="Ahmad Zaidan"
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border-2"
              style={{ background: '#22c55e', borderColor: 'var(--bg-sidebar)' }}
            />
          </div>

          <h1 className="text-base font-bold leading-tight mb-1" style={{ color: 'var(--text-primary)' }}>
            Ahmad Zaidan
            <br />
            <span style={{ color: getAccent() }}>Qotrunnada</span>
          </h1>

          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono mt-1"
            style={{
              background: 'var(--accent-dim)',
              color: getAccent(),
              border: `1px solid var(--accent-border)`
            }}
          >
            <Shield size={10} />
            Security Researcher
          </div>

          <p className="text-xs mt-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Bug hunter & penetration tester yang passionate dalam keamanan siber.
          </p>
        </div>

        {/* Social Links */}
        <div className="px-6 pb-4 flex justify-center gap-3">
          {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-md flex items-center justify-center transition-all"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent-dim)'
                e.currentTarget.style.borderColor = 'var(--accent-border)'
                e.currentTarget.style.color = getAccent()
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--bg-card)'
                e.currentTarget.style.borderColor = 'var(--border-color)'
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              <Icon size={14} />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="mx-6 mb-4" style={{ height: '1px', background: 'var(--border-color)' }} />

        {/* Navigation */}
        <nav className="px-3 flex-1 overflow-y-auto">
          <p className="text-xs font-mono px-3 mb-2" style={{ color: 'var(--text-muted)' }}>
            NAVIGASI
          </p>
          <ul className="space-y-1">
            {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive ? 'nav-active' : 'nav-inactive'
                    }`
                  }
                  style={({ isActive }) => ({
                    background: isActive ? 'var(--accent-dim)' : 'transparent',
                    color: isActive ? getAccent() : 'var(--text-secondary)',
                    borderLeft: isActive ? `2px solid ${getAccent()}` : '2px solid transparent',
                  })}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                  <ChevronRight
                    size={12}
                    className="ml-auto"
                    style={{ color: getAccent(), opacity: 0.4 }}
                  />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Divider */}
        <div className="mx-6 mt-4 mb-4" style={{ height: '1px', background: 'var(--border-color)' }} />

        {/* Quick Access */}
        <div className="px-6 pb-4">
          <p className="text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
            AKSES CEPAT
          </p>
          <div className="flex gap-2">
            <NavLink
              to="/livechat"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-mono transition-all duration-200"
              style={{
                background: 'var(--accent-dim)',
                border: `1px solid var(--accent-border)`,
                color: getAccent(),
              }}
            >
              <MessageCircle size={14} /> Chat
            </NavLink>
            <button
              onClick={() => setIsAIOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-mono transition-all duration-200"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent-dim)'
                e.currentTarget.style.borderColor = 'var(--accent-border)'
                e.currentTarget.style.color = getAccent()
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--bg-card)'
                e.currentTarget.style.borderColor = 'var(--border-color)'
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              <Bot size={14} /> AI
            </button>
          </div>
        </div>

        {/* Theme Switcher - Glassmorphism */}
        <div className="px-6 pb-4">
          <p className="text-xs font-mono mb-3 text-center tracking-wider" style={{ color: 'var(--text-muted)' }}>
            — THEME —
          </p>
          <div className="flex justify-center gap-3">
            {themes?.map(({ id, label, color }) => (
              <button
                key={id}
                onClick={() => setTheme(id)}
                className="relative group"
              >
                <div
                  className={`w-10 h-10 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                    theme === id ? 'scale-110' : 'scale-100 hover:scale-105'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${color}40, ${color}10)`,
                    border: `1px solid ${theme === id ? color : 'rgba(255,255,255,0.1)'}`,
                    boxShadow: theme === id ? `0 0 20px ${color}50` : 'none',
                  }}
                />
                <span
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 text-center">
          <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            © 2026 Zaidan
          </p>
          <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>
            All rights reserved.
          </p>
        </div>
      </div>

      {/* AI Modal */}
      {isAIOpen && <AIChatModal onClose={() => setIsAIOpen(false)} />}
    </div>
  )
}

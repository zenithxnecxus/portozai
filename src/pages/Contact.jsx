import { useState } from 'react'
import { Mail, Github, Linkedin, Send, Check, AlertCircle, MessageSquare, User, AtSign } from 'lucide-react'

const SOCIAL_LINKS = [
  {
    icon: Github,
    label: 'GitHub',
    value: '@zenithx',
    href: 'https://github.com/zenithxnecxus',
    color: '#f0f0f0',
    desc: 'Open-source tools & projects',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Ahmad Zaidan Q.',
    href: 'https://linkedin.com/in/zaidan03',
    color: '#0077b5',
    desc: 'Professional network',
  },
  {
    icon: Send,
    label: 'Telegram',
    value: '@zenithx_9',
    href: 'https://t.me/zenithx_9',
    color: '#2ca5e0',
    desc: 'Fastest response',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Nama wajib diisi'
    if (!form.email.trim()) e.email = 'Email wajib diisi'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Format email tidak valid'
    if (!form.message.trim()) e.message = 'Pesan wajib diisi'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }
    setErrors({})
    setStatus('sending')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
        name: form.name,
        email: form.email,
        message: form.message,
        }),
      const result = await response.json()

      if (result.success) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
        setTimeout(() => setStatus(null), 4000)
      } else {
        setStatus('error')
        console.error('Web3Forms error:', result)
      }
    } catch (error) {
      setStatus('error')
      console.error('Network error:', error)
    }
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  return (
    <div className="py-8">
      {/* HEADER */}
      <div className="mb-8 stagger">
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-2" style={{ color: 'var(--text-primary)' }}>
          Hubungi Saya
        </h1>
        <div className="w-12 h-0.5" style={{ background: 'var(--accent)' }} />
        <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Ada proyek, kolaborasi, atau laporan kerentanan? Jangan ragu untuk menghubungi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* FORM KONTAK */}
        <div className="lg:col-span-3 p-6 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <h2 className="text-base font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <MessageSquare size={16} style={{ color: 'var(--accent)' }} />
            Kirim Pesan
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                <User size={11} className="inline mr-1" />
                Nama Lengkap *
              </label>
              <input
                type="text"
                placeholder="Ahmad Budi"
                value={form.name}
                onChange={e => handleChange('name', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-200"
                style={{
                  background: 'var(--bg-main)',
                  border: `1px solid ${errors.name ? '#ef4444' : 'var(--border-color)'}`,
                  color: 'var(--text-primary)',
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--accent-border)'}
                onBlur={e => { if (!errors.name) e.currentTarget.style.borderColor = 'var(--border-color)' }}
              />
              {errors.name && <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#ef4444' }}><AlertCircle size={10} /> {errors.name}</p>}
            </div>

            <div>
              <label className="text-xs font-mono mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                <AtSign size={11} className="inline mr-1" />
                Email *
              </label>
              <input
                type="email"
                placeholder="kamu@email.com"
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-200"
                style={{
                  background: 'var(--bg-main)',
                  border: `1px solid ${errors.email ? '#ef4444' : 'var(--border-color)'}`,
                  color: 'var(--text-primary)',
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--accent-border)'}
                onBlur={e => { if (!errors.email) e.currentTarget.style.borderColor = 'var(--border-color)' }}
              />
              {errors.email && <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#ef4444' }}><AlertCircle size={10} /> {errors.email}</p>}
            </div>

            <div>
              <label className="text-xs font-mono mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                <MessageSquare size={11} className="inline mr-1" />
                Pesan *
              </label>
              <textarea
                placeholder="Tulis pesanmu di sini..."
                value={form.message}
                onChange={e => handleChange('message', e.target.value)}
                rows={5}
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-200 resize-none"
                style={{
                  background: 'var(--bg-main)',
                  border: `1px solid ${errors.message ? '#ef4444' : 'var(--border-color)'}`,
                  color: 'var(--text-primary)',
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--accent-border)'}
                onBlur={e => { if (!errors.message) e.currentTarget.style.borderColor = 'var(--border-color)' }}
              />
              {errors.message && <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#ef4444' }}><AlertCircle size={10} /> {errors.message}</p>}
            </div>

            <button
              onClick={handleSubmit}
              disabled={status === 'sending' || status === 'success'}
              className="w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                background: status === 'success' ? '#22c55e' : 'var(--accent)',
                color: status === 'success' ? '#fff' : '#000',
                opacity: status === 'sending' ? 0.7 : 1,
              }}
            >
              {status === 'sending' && <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />}
              {status === 'success' && <Check size={15} />}
              {status === 'sending' ? 'Mengirim...' : status === 'success' ? 'Pesan Terkirim!' : <><Send size={14} /> Kirim Pesan</>}
            </button>
            {status === 'error' && <p className="text-xs text-center mt-2" style={{ color: '#ef4444' }}>❌ Gagal mengirim pesan. Coba lagi nanti.</p>}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <p className="text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>EMAIL LANGSUNG</p>
            <a href="mailto:zaidan147248@gmail.com" className="flex items-center gap-2 text-sm font-mono transition-all duration-200" style={{ color: 'var(--accent)' }}>
              <Mail size={14} /> zaidan147248@gmail.com
            </a>
            <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>Respon dalam 24 jam kerja</p>
          </div>

          <div className="p-4 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <p className="text-xs font-mono mb-3" style={{ color: 'var(--text-muted)' }}>SOSIAL MEDIA</p>
            <div className="space-y-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, value, href, color, desc }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 group" style={{ border: '1px solid transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.background = color + '10'; e.currentTarget.style.borderColor = color + '30' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: color + '15' }}>
                    <Icon size={15} style={{ color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{value}</p>
                    <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
              <p className="text-xs font-mono font-bold" style={{ color: 'var(--accent)' }}>AVAILABLE FOR WORK</p>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Tersedia untuk freelance, bug bounty collaboration, dan security consulting.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

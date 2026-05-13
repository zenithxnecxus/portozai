import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Bug, Award, Wrench } from 'lucide-react'

const STATS = [
  { value: '3+',  label: 'Tahun Pengalaman', icon: Shield },
  { value: '50+', label: 'Bug Ditemukan',    icon: Bug    },
  { value: '10+', label: 'Sertifikat',       icon: Award  },
  { value: '5+',  label: 'Tools Dibuat',     icon: Wrench },
]

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-8">

      {/* ===== HERO ===== */}
      <div className="stagger mb-12">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-6"
          style={{
            background: 'var(--accent-dim)',
            color: 'var(--accent)',
            border: '1px solid var(--accent-border)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
          Available for freelance & bug bounty
        </div>

        {/* Nama Besar */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Hi, I'm{' '}
          <span
            className="relative"
            style={{
              color: 'var(--accent)',
              textShadow: '0 0 40px var(--accent-glow)',
            }}
          >
            Ahmad Zaidan Qotrunnada
          </span>
        </h1>

        {/* Subtitle */}
        <h2
          className="text-lg sm:text-xl font-mono mb-6"
          style={{ color: 'var(--text-secondary)' }}
        >
          Security Researcher
          <span style={{ color: 'var(--accent)' }}> & </span>
          Bug Hunter
          <span className="cursor-blink" style={{ color: 'var(--accent)' }}>_</span>
        </h2>

        {/* Deskripsi */}
        <p
          className="text-sm sm:text-base leading-relaxed max-w-2xl mb-8"
          style={{ color: 'var(--text-secondary)' }}
        >
          Spesialis keamanan siber yang berfokus pada{' '}
          <span style={{ color: 'var(--accent-text)' }}>web application security</span>,{' '}
          <span style={{ color: 'var(--accent-text)' }}>penetration testing</span>, dan{' '}
          <span style={{ color: 'var(--accent-text)' }}>bug bounty hunting</span>.
          Telah menemukan dan melaporkan lebih dari 50 kerentanan kritis pada platform
          internasional. Berkomitmen menjadikan internet lebih aman, satu bug dalam satu waktu.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="btn-gradient"
          >
            Hubungi Saya <ArrowRight size={15} />
          </Link>

          <Link
            to="/certificates"
            className="btn-neon"
          >
            Lihat Sertifikat <Award size={15} />
          </Link>
        </div>
      </div>

      {/* ===== STATISTIK ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STATS.map(({ value, label, icon: Icon }, i) => (
          <div
            key={label}
            className="card-bg p-4 rounded-xl transition-all duration-300 hover:scale-105 cursor-default"
            style={{
              animation: `fadeIn 0.5s ease ${i * 0.1 + 0.3}s forwards`,
              opacity: 0,
            }}
          >
            <Icon size={14} style={{ color: 'var(--accent)' }} className="mb-2" />
            <div
              className="text-2xl font-extrabold font-mono mb-1"
              style={{ color: 'var(--accent)' }}
            >
              {value}
            </div>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, ExternalLink, Calendar, Building2, X, ZoomIn, Shield, BookOpen, Star } from 'lucide-react'

const CERTIFICATES = [
  {
    id: 1,
    title: 'Apresiasi Diskominfo DIY',
    issuer: 'Dinas Komunikasi dan Informatika DIY',
    date: '26 Maret 2026',
    credentialId: 'BROKEN-LINK-HIJACKING-2026',
    category: 'Appreciation',
    url: 'https://files.catbox.moe/pihan3.jpg',
    desc: 'Menemukan dan melaporkan vulnerability Broken Link Hijacking pada website visitingjogia.jogjaprov.go.id',
    image: 'https://files.catbox.moe/owicb7.jpg',
  },
  {
    id: 2,
    title: 'Apresiasi Bmkg-Csrit',
    issuer: 'BMKG-CSRIT',
    date: '2 April 2026',
    category: 'Appreciation',
    url: 'https://files.catbox.moe/3rmaqh.jpg',
    desc: 'Menemukan dan melaporkan vulnerability pada sistem BMKG',
    image: 'https://files.catbox.moe/3rmaqh.jpg',
  },
  {
    id: 3,
    title: 'Certified Red Team Operations Management (CRTOM)',
    issuer: 'Red Team Leaders',
    date: '23 Desember 2025',
    credentialId: 'CRTOM-2025-001',
    category: 'Certification',
    url: 'https://files.catbox.moe/3rmaqh.jpg',
    desc: 'Berhasil menyelesaikan semua persyaratan dan lulus ujian sertifikasi Red Team Operations Management',
    image: 'https://files.catbox.moe/rbndpx.jpg',
  },
  {
    id: 4,
    title: 'Introduction to Information Security',
    issuer: 'Cyber Academy Indonesia',
    date: '18 Desember 2025',
    credentialId: 'PKM01112254755',
    category: 'Course',
    url: 'https://files.catbox.moe/n42eb9.jpg',
    desc: 'Menyelesaikan kursus Introduction to Information Security dengan pemahaman yang baik',
    image: 'https://files.catbox.moe/n42eb9.jpg',
  },
  {
    id: 5,
    title: 'Memulai dengan Bahasa Pemrograman C',
    issuer: 'Dicoding',
    date: '22 Desember 2025',
    category: 'Course',
    url: 'https://files.catbox.moe/e49ugw.png',
    desc: 'Menyelesaikan kursus Memulai dengan bahasa pemrograman C dengan pemahaman yang baik',
    image: 'https://files.catbox.moe/e49ugw.png',
  },
]

const CATEGORY_META = {
  Appreciation: { color: '#ff3333', icon: Star,      label: 'Appreciation' },
  Certification: { color: '#f59e0b', icon: Shield,    label: 'Certification' },
  Course:        { color: '#22c55e', icon: BookOpen,  label: 'Course' },
}

const TABS = [
  { id: 'all', label: 'Semua' },
  { id: 'Appreciation', label: 'Appreciation' },
  { id: 'Certification', label: 'Certification' },
  { id: 'Course', label: 'Course' },
]

// ─────────────────────────────────────────────
// IMAGE MODAL
// ─────────────────────────────────────────────
function ImageModal({ image, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="relative w-[92vw] max-w-3xl"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={image}
          alt="Certificate"
          className="w-full rounded-2xl object-contain shadow-2xl"
          style={{ maxHeight: '80vh' }}
        />
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-9 h-9 flex items-center justify-center rounded-full transition-all"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
        >
          <X size={16} style={{ color: 'var(--text-secondary)' }} />
        </button>
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// CERT CARD
// ─────────────────────────────────────────────
function CertCard({ cert, onClickImage }) {
  const meta = CATEGORY_META[cert.category]
  const Icon = meta.icon

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl overflow-hidden flex flex-col h-full"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${meta.color}55`
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.5), 0 0 0 1px ${meta.color}22`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-color)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
      style2={{ transition: 'all 0.2s ease' }}
    >
      {/* ── Image ── */}
      <div
        className="relative overflow-hidden cursor-zoom-in flex-shrink-0"
        style={{ height: '160px', background: '#0a0a0a' }}
        onClick={() => onClickImage(cert.image)}
      >
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-full object-cover transition-transform duration-500"
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        {/* overlay gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.65) 100%)' }}
        />
        {/* zoom hint */}
        <div
          className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-mono"
          style={{ background: 'rgba(0,0,0,0.6)', color: 'white' }}
        >
          <ZoomIn size={9} /> zoom
        </div>
        {/* category badge on image */}
        <div
          className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold"
          style={{ background: `${meta.color}22`, color: meta.color, border: `1px solid ${meta.color}44` }}
        >
          <Icon size={8} />
          {cert.category}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        <h3
          className="text-sm font-bold leading-snug line-clamp-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {cert.title}
        </h3>

        <p
          className="text-[11px] leading-relaxed line-clamp-2"
          style={{ color: 'var(--text-secondary)' }}
        >
          {cert.desc}
        </p>

        {/* divider */}
        <div className="h-px mt-auto mb-2" style={{ background: 'var(--border-color)' }} />

        {/* Meta */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <Building2 size={10} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <span className="text-[10px] truncate" style={{ color: 'var(--text-secondary)' }}>
              {cert.issuer}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={10} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <span className="text-[10px] font-mono" style={{ color: 'var(--text-secondary)' }}>
              {cert.date}
            </span>
          </div>
        </div>

        {/* Credential ID + verify link */}
        <div className="flex items-center justify-between mt-1">
          {cert.credentialId ? (
            <span
              className="text-[9px] font-mono px-2 py-0.5 rounded"
              style={{ background: 'var(--bg-main)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}
            >
              {cert.credentialId}
            </span>
          ) : <span />}

          <a
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] font-mono font-semibold transition-opacity hover:opacity-70"
            style={{ color: meta.color }}
          >
            <ExternalLink size={10} /> Verifikasi
          </a>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// CERTIFICATES PAGE
// ─────────────────────────────────────────────
export default function Certificates() {
  const [activeTab, setActiveTab] = useState('all')
  const [modalImage, setModalImage] = useState(null)

  const filtered = activeTab === 'all'
    ? CERTIFICATES
    : CERTIFICATES.filter(c => c.category === activeTab)

  const counts = {
    all: CERTIFICATES.length,
    Appreciation: CERTIFICATES.filter(c => c.category === 'Appreciation').length,
    Certification: CERTIFICATES.filter(c => c.category === 'Certification').length,
    Course: CERTIFICATES.filter(c => c.category === 'Course').length,
  }

  return (
    <div className="py-8">

      {/* HEADER */}
      <div className="mb-8">
        <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>
          $ ls -la certificates/
        </span>
        <h1
          className="text-3xl sm:text-4xl font-extrabold mt-2 mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Sertifikat
        </h1>
        <div className="w-12 h-0.5 mb-3" style={{ background: 'var(--accent)' }} />
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Sertifikasi, apresiasi, dan kursus yang telah diselesaikan.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {['Appreciation','Certification','Course'].map(cat => {
          const meta = CATEGORY_META[cat]
          const CatIcon = meta.icon
          return (
            <div
              key={cat}
              className="rounded-xl p-3 flex items-center gap-3"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${meta.color}18` }}
              >
                <CatIcon size={15} style={{ color: meta.color }} />
              </div>
              <div>
                <div className="text-lg font-extrabold font-mono leading-none" style={{ color: meta.color }}>
                  {counts[cat]}
                </div>
                <div className="text-[9px] font-mono mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  {cat}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* FILTER TABS */}
      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map(({ id, label }) => {
          const isActive = activeTab === id
          const meta = id !== 'all' ? CATEGORY_META[id] : null
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200"
              style={{
                background: isActive
                  ? (meta ? `${meta.color}20` : 'var(--accent-dim)')
                  : 'var(--bg-card)',
                border: `1px solid ${isActive
                  ? (meta ? `${meta.color}55` : 'var(--accent-border)')
                  : 'var(--border-color)'}`,
                color: isActive
                  ? (meta ? meta.color : 'var(--accent)')
                  : 'var(--text-secondary)',
              }}
            >
              {meta && <meta.icon size={10} />}
              {label}
              <span
                className="text-[9px] px-1.5 py-0.5 rounded-full font-mono"
                style={{
                  background: isActive
                    ? (meta ? `${meta.color}22` : 'var(--accent-dim)')
                    : 'var(--bg-main)',
                  color: isActive
                    ? (meta ? meta.color : 'var(--accent)')
                    : 'var(--text-muted)',
                }}
              >
                {counts[id]}
              </span>
            </button>
          )
        })}
      </div>

      {/* GRID */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map(cert => (
            <CertCard
              key={cert.id}
              cert={cert}
              onClickImage={setModalImage}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* IMAGE MODAL */}
      <AnimatePresence>
        {modalImage && (
          <ImageModal image={modalImage} onClose={() => setModalImage(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

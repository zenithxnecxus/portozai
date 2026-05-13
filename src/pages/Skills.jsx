import { useState } from 'react'
import { Shield, Code2, Search, Wrench, Zap } from 'lucide-react'

function Logo3D({ id, from, to, shadow, children, size = 56 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`g-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      {/* drop shadow */}
      <rect x="5" y="7" width="38" height="38" rx="11" fill={shadow} fillOpacity="0.45" />
      {/* base */}
      <rect x="3" y="3" width="42" height="42" rx="11" fill={`url(#g-${id})`} />
      {/* top shine */}
      <rect x="5" y="5" width="38" height="16" rx="9" fill="white" fillOpacity="0.18" />
      {/* bottom edge depth */}
      <rect x="5" y="38" width="38" height="5" rx="5" fill="black" fillOpacity="0.15" />
      {children}
    </svg>
  )
}

// ─────────────────────────────────────────────
// PROGRAMMING LOGOS
// ─────────────────────────────────────────────
const PythonLogo = () => (
  <Logo3D id="py" from="#356fbd" to="#1a4a8a" shadow="#1a4a8a">
    <path d="M24 10c-5 0-4.7 2.2-4.7 2.2l.01 2.3h4.8v.7H17.5S14 14.8 14 20s2.6 4.9 2.6 4.9h1.6v-2.4s-.1-2.6 2.6-2.6h4.5s2.5.04 2.5-2.4V12.3S27.8 10 24 10zm-2.5 1.5c.45 0 .8.35.8.8s-.35.8-.8.8-.8-.35-.8-.8.35-.8.8-.8z" fill="#ffd43b"/>
    <path d="M24 38c5 0 4.7-2.2 4.7-2.2l-.01-2.3h-4.8v-.7h6.6S33 32.2 33 27s-2.6-4.9-2.6-4.9h-1.6v2.4s.1 2.6-2.6 2.6h-4.5s-2.5-.04-2.5 2.4v4.2S20.2 38 24 38zm2.5-1.5c-.45 0-.8-.35-.8-.8s.35-.8.8-.8.8.35.8.8-.35.8-.8.8z" fill="white" fillOpacity="0.9"/>
  </Logo3D>
)

const GolangLogo = () => (
  <Logo3D id="go" from="#00acd7" to="#007ea8" shadow="#005f80">
    <text x="8" y="30" fontFamily="Arial,sans-serif" fontSize="17" fontWeight="900" fill="white" letterSpacing="1">Go</text>
    <circle cx="35" cy="19" r="3" fill="#f7b731" />
  </Logo3D>
)

const RustLogo = () => (
  <Logo3D id="rust" from="#e05a2b" to="#a03000" shadow="#7a2000">
    <circle cx="24" cy="24" r="11" stroke="white" strokeWidth="2.5" fill="none"/>
    <circle cx="24" cy="24" r="5" fill="white"/>
    {/* gear teeth */}
    {[0,45,90,135,180,225,270,315].map((deg,i) => {
      const r = Math.PI * deg / 180
      const x1 = 24 + 11 * Math.cos(r), y1 = 24 + 11 * Math.sin(r)
      const x2 = 24 + 14 * Math.cos(r), y2 = 24 + 14 * Math.sin(r)
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    })}
  </Logo3D>
)

const ReactLogo = () => (
  <Logo3D id="react" from="#23d5f5" to="#0a8fa8" shadow="#066070">
    <circle cx="24" cy="24" r="3.5" fill="white"/>
    <ellipse cx="24" cy="24" rx="10" ry="4" stroke="white" strokeWidth="2" fill="none"/>
    <ellipse cx="24" cy="24" rx="10" ry="4" stroke="white" strokeWidth="2" fill="none" transform="rotate(60 24 24)"/>
    <ellipse cx="24" cy="24" rx="10" ry="4" stroke="white" strokeWidth="2" fill="none" transform="rotate(120 24 24)"/>
  </Logo3D>
)

const JSLogo = () => (
  <Logo3D id="js" from="#f7df1e" to="#c8b400" shadow="#806600">
    <text x="10" y="32" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="900" fill="#1a1a1a">JS</text>
  </Logo3D>
)

const NodeLogo = () => (
  <Logo3D id="node" from="#3d9c43" to="#1e6622" shadow="#0d3d10">
    <path d="M24 12l11 6.5v13L24 38l-11-6.5v-13z" stroke="white" strokeWidth="2" fill="none"/>
    <text x="18" y="28" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="white">JS</text>
  </Logo3D>
)

// ─────────────────────────────────────────────
// SECURITY TOOL LOGOS
// ─────────────────────────────────────────────
const BurpLogo = () => (
  <Logo3D id="burp" from="#f97316" to="#b84d00" shadow="#7a2f00">
    <circle cx="24" cy="24" r="11" stroke="white" strokeWidth="2.5" fill="none"/>
    <path d="M18 18c0 3.5 4.5 3.5 4.5 6S18 27.5 18 31" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M30 18c0 3.5-4.5 3.5-4.5 6s4.5 3.5 4.5 7" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
  </Logo3D>
)

const NucleiLogo = () => (
  <Logo3D id="nuclei" from="#7c3aed" to="#4c1d95" shadow="#2e0f6e">
    <circle cx="24" cy="24" r="5" fill="white"/>
    <circle cx="24" cy="24" r="10" stroke="white" strokeWidth="1.8" fill="none" strokeDasharray="4 2.5"/>
    <path d="M24 10v4M24 34v4M10 24h4M34 24h4" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
  </Logo3D>
)

const SQLmapLogo = () => (
  <Logo3D id="sqlmap" from="#ef4444" to="#991b1b" shadow="#5a0a0a">
    <ellipse cx="24" cy="15" rx="10" ry="3.5" fill="white" fillOpacity="0.9"/>
    <path d="M14 15v6c0 2 4.5 3.5 10 3.5s10-1.5 10-3.5v-6" stroke="white" strokeWidth="2" fill="none"/>
    <path d="M14 21v6c0 2 4.5 3.5 10 3.5s10-1.5 10-3.5v-6" stroke="white" strokeWidth="2" fill="none"/>
  </Logo3D>
)

const NmapLogo = () => (
  <Logo3D id="nmap" from="#16a34a" to="#064e1b" shadow="#022b0d">
    <circle cx="24" cy="24" r="4" fill="white"/>
    <circle cx="24" cy="24" r="8" stroke="white" strokeWidth="1.8" fill="none" strokeDasharray="5 3"/>
    <path d="M24 10v4M24 34v4M10 24h4M34 24h4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M15.5 15.5l2.8 2.8M29.7 29.7l2.8 2.8M15.5 32.5l2.8-2.8M29.7 18.3l2.8-2.8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </Logo3D>
)

const MetasploitLogo = () => (
  <Logo3D id="msf" from="#3b82f6" to="#1e3a8a" shadow="#0f1f5a">
    <path d="M24 11l11 19.5H13L24 11z" stroke="white" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
    <path d="M17 25l7-11 7 11" stroke="white" strokeWidth="1.8" fill="none" strokeLinejoin="round" fillOpacity="0.4"/>
  </Logo3D>
)

const FfufLogo = () => (
  <Logo3D id="ffuf" from="#10b981" to="#064e36" shadow="#022c1e">
    <path d="M12 14h18M12 20h13M12 26h15M12 32h9" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M29 23l5 5-5 5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </Logo3D>
)

// ─────────────────────────────────────────────
// WEB SECURITY LOGOS
// ─────────────────────────────────────────────
const SQLiLogo = () => (
  <Logo3D id="sqli" from="#dc2626" to="#7f1d1d" shadow="#4a0e0e">
    <path d="M11 16h26M11 22h26M11 28h26" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M28 11l5 5-5 5" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </Logo3D>
)

const XSSLogo = () => (
  <Logo3D id="xss" from="#ea580c" to="#7c2d12" shadow="#4a1506">
    <path d="M14 16l-5 7 5 7M34 16l5 7-5 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M30 12l-12 20" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
  </Logo3D>
)

const IDORLogo = () => (
  <Logo3D id="idor" from="#9333ea" to="#4c1d95" shadow="#2e0f6e">
    <rect x="13" y="22" width="22" height="15" rx="3" fill="none" stroke="white" strokeWidth="2.2"/>
    <path d="M17 22v-4a7 7 0 0114 0v4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 2"/>
    <path d="M26 29l-5 3" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="24" cy="29" r="2.5" fill="white"/>
  </Logo3D>
)

const SSRFLogo = () => (
  <Logo3D id="ssrf" from="#0891b2" to="#164e63" shadow="#082c38">
    <circle cx="24" cy="24" r="10" stroke="white" strokeWidth="2" fill="none"/>
    <path d="M14 24h20M24 14v20" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M24 14c-4 5-4 15 0 20M24 14c4 5 4 15 0 20" stroke="white" strokeWidth="1.5" fill="none"/>
  </Logo3D>
)

const XXELogo = () => (
  <Logo3D id="xxe" from="#db2777" to="#831843" shadow="#4d0f29">
    <rect x="11" y="13" width="26" height="22" rx="3" fill="none" stroke="white" strokeWidth="2"/>
    <path d="M15 19h6M15 24h10M15 29h5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M27 21l3 3-3 3" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Logo3D>
)

const CSRFLogo = () => (
  <Logo3D id="csrf" from="#d97706" to="#78350f" shadow="#451e07">
    <path d="M30 14c-3-3-9-3-12 0a8 8 0 000 12" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M26 11l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 34c3 3 9 3 12 0" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="2.5 2"/>
  </Logo3D>
)

const RCELogo = () => (
  <Logo3D id="rce" from="#b91c1c" to="#450a0a" shadow="#280404">
    <rect x="8" y="13" width="32" height="22" rx="4" fill="none" stroke="white" strokeWidth="2"/>
    <path d="M13 21l5 3-5 3" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 27h14" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
  </Logo3D>
)

const LFILogo = () => (
  <Logo3D id="lfi" from="#7c3aed" to="#2e1065" shadow="#180833">
    <path d="M13 13h13l7 7v15H13z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M26 13v7h7" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M17 26h14M17 30h8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M22 22l-3 3 3 3" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Logo3D>
)

const OpenRedirectLogo = () => (
  <Logo3D id="or" from="#0284c7" to="#0c4a6e" shadow="#072d42">
    <path d="M10 24h20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M23 17l8 7-8 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M31 31v3a3 3 0 01-3 3H12a3 3 0 01-3-3v-3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeDasharray="2.5 2"/>
  </Logo3D>
)

const JWTLogo = () => (
  <Logo3D id="jwt" from="#c026d3" to="#701a75" shadow="#400e44">
    <path d="M24 11v8M24 29v8M20 19l-7-4M31 33l-7-4M20 29l-7 4M31 15l-7 4" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="24" cy="24" r="5" fill="none" stroke="white" strokeWidth="2"/>
    <circle cx="24" cy="24" r="2" fill="white"/>
  </Logo3D>
)

const CORSLogo = () => (
  <Logo3D id="cors" from="#059669" to="#064e3b" shadow="#022c20">
    <rect x="7" y="15" width="13" height="18" rx="3" fill="none" stroke="white" strokeWidth="2"/>
    <rect x="28" y="15" width="13" height="18" rx="3" fill="none" stroke="white" strokeWidth="2"/>
    <path d="M20 24h8" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M21 21l-2 3 2 3M27 21l2 3-2 3" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Logo3D>
)

const AuthBypassLogo = () => (
  <Logo3D id="ab" from="#e11d48" to="#881337" shadow="#50091f">
    <rect x="13" y="22" width="22" height="15" rx="3" fill="none" stroke="white" strokeWidth="2.2"/>
    <path d="M17 22v-4a7 7 0 0114 0v4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 2"/>
    <path d="M29 12l-8 11" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="24" cy="29" r="2.5" fill="white"/>
  </Logo3D>
)

// ─────────────────────────────────────────────
// OSINT LOGOS
// ─────────────────────────────────────────────
const SubEnumLogo = () => (
  <Logo3D id="sub" from="#7e22ce" to="#3b0764" shadow="#1e0340">
    <circle cx="24" cy="24" r="11" stroke="white" strokeWidth="2" fill="none"/>
    <path d="M13 24h22M24 13c-5 6-5 16 0 22M24 13c5 6 5 16 0 22" stroke="white" strokeWidth="1.8" fill="none"/>
  </Logo3D>
)

const GoogleDorkLogo = () => (
  <Logo3D id="gd" from="#ea4335" to="#7f1d1d" shadow="#4a0e0e">
    <circle cx="21" cy="20" r="8" fill="none" stroke="white" strokeWidth="2.2"/>
    <path d="M27 26l7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M18 20h7M21 17v7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </Logo3D>
)

const ShodanLogo = () => (
  <Logo3D id="sho" from="#f43f5e" to="#881337" shadow="#4c0519">
    <path d="M8 33s3-10 16-10 16 10 16 10" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="24" cy="17" r="6" fill="none" stroke="white" strokeWidth="2.2"/>
    <circle cx="24" cy="17" r="2.5" fill="white"/>
  </Logo3D>
)

const SocialEngLogo = () => (
  <Logo3D id="se" from="#b45309" to="#451a03" shadow="#261003">
    <circle cx="18" cy="16" r="5" fill="none" stroke="white" strokeWidth="2"/>
    <path d="M9 33c0-5 4-8 9-8" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="30" cy="16" r="5" fill="none" stroke="white" strokeWidth="2" strokeDasharray="3 2"/>
    <path d="M27 25c3 0 9 3 9 8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 2"/>
  </Logo3D>
)

const DNSReconLogo = () => (
  <Logo3D id="dns" from="#0e7490" to="#083344" shadow="#041b24">
    <rect x="8" y="14" width="32" height="20" rx="4" fill="none" stroke="white" strokeWidth="2"/>
    <path d="M13 21l6 3-6 3" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 24h14" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
  </Logo3D>
)

// ─────────────────────────────────────────────
// SKILL CATEGORIES DATA
// ─────────────────────────────────────────────
const SKILL_CATEGORIES = [
  {
    id: 'programming',
    label: 'Programming',
    icon: Code2,
    skills: [
      { name: 'Python',      Logo: PythonLogo },
      { name: 'Go (Golang)', Logo: GolangLogo },
      { name: 'Rust',        Logo: RustLogo },
      { name: 'React / JSX', Logo: ReactLogo },
      { name: 'JavaScript',  Logo: JSLogo },
      { name: 'Node.js',     Logo: NodeLogo },
    ],
  },
  {
    id: 'web-security',
    label: 'Web Security',
    icon: Shield,
    skills: [
      { name: 'SQL Injection',         Logo: SQLiLogo },
      { name: 'XSS',                   Logo: XSSLogo },
      { name: 'IDOR',                  Logo: IDORLogo },
      { name: 'SSRF',                  Logo: SSRFLogo },
      { name: 'XXE Injection',         Logo: XXELogo },
      { name: 'CSRF',                  Logo: CSRFLogo },
      { name: 'RCE',                   Logo: RCELogo },
      { name: 'LFI / RFI',            Logo: LFILogo },
      { name: 'Open Redirect',         Logo: OpenRedirectLogo },
      { name: 'JWT Vulnerabilities',   Logo: JWTLogo },
      { name: 'CORS Misconfiguration', Logo: CORSLogo },
      { name: 'Authentication Bypass', Logo: AuthBypassLogo },
      { name: 'Business Logic Bugs',   Logo: () => (
        <Logo3D id="blb" from="#15803d" to="#052e16" shadow="#021a0c">
          <path d="M11 11h10v10H11zM27 11h10v10H27zM11 27h10v10H11z" fill="none" stroke="white" strokeWidth="2"/>
          <path d="M27 32h10M32 27v10" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
        </Logo3D>
      )},
    ],
  },
  {
    id: 'osint',
    label: 'OSINT',
    icon: Search,
    skills: [
      { name: 'Subdomain Enum',  Logo: SubEnumLogo },
      { name: 'Google Dorking',  Logo: GoogleDorkLogo },
      { name: 'Shodan',          Logo: ShodanLogo },
      { name: 'Social Eng.',     Logo: SocialEngLogo },
      { name: 'DNS Recon',       Logo: DNSReconLogo },
    ],
  },
  {
    id: 'tools',
    label: 'Security Tools',
    icon: Wrench,
    skills: [
      { name: 'Burp Suite',      Logo: BurpLogo },
      { name: 'Nuclei',          Logo: NucleiLogo },
      { name: 'SQLmap',          Logo: SQLmapLogo },
      { name: 'Nmap',            Logo: NmapLogo },
      { name: 'Metasploit',      Logo: MetasploitLogo },
      { name: 'ffuf / Gobuster', Logo: FfufLogo },
    ],
  },
]

// ─────────────────────────────────────────────
// SKILL CARD — logo only
// ─────────────────────────────────────────────
function SkillCard({ name, Logo }) {
  return (
    <div
      className="flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-200 cursor-default"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent-border)'
        e.currentTarget.style.background = 'var(--bg-card-hover)'
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-color)'
        e.currentTarget.style.background = 'var(--bg-card)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <Logo />
      <span
        className="text-xs font-mono text-center leading-tight"
        style={{ color: 'var(--text-secondary)' }}
      >
        {name}
      </span>
    </div>
  )
}

// ─────────────────────────────────────────────
// SKILLS PAGE
// ─────────────────────────────────────────────
export default function Skills() {
  const [activeTab, setActiveTab] = useState('all')

  const filtered = activeTab === 'all'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter(c => c.id === activeTab)

  return (
    <div className="py-8">

      {/* HEADER */}
      <div className="mb-8">
        <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>
          $ ls -la skills/
        </span>
        <h1
          className="text-3xl sm:text-4xl font-extrabold mt-2 mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Skills & Keahlian
        </h1>
        <div className="w-12 h-0.5 mb-3" style={{ background: 'var(--accent)' }} />
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Kumpulan skill dan tools yang dikuasai dalam bidang keamanan siber.
        </p>
      </div>

      {/* FILTER TABS */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTab('all')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200"
          style={{
            background: activeTab === 'all' ? 'var(--accent-dim)' : 'var(--bg-card)',
            border: `1px solid ${activeTab === 'all' ? 'var(--accent-border)' : 'var(--border-color)'}`,
            color: activeTab === 'all' ? 'var(--accent)' : 'var(--text-secondary)',
          }}
        >
          <Zap size={11} /> Semua
        </button>
        {SKILL_CATEGORIES.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200"
            style={{
              background: activeTab === id ? 'var(--accent-dim)' : 'var(--bg-card)',
              border: `1px solid ${activeTab === id ? 'var(--accent-border)' : 'var(--border-color)'}`,
              color: activeTab === id ? 'var(--accent)' : 'var(--text-secondary)',
            }}
          >
            <Icon size={11} /> {label}
          </button>
        ))}
      </div>

      {/* SKILL SECTIONS */}
      <div className="space-y-10">
        {filtered.map(({ id, label, icon: Icon, skills }) => (
          <div key={id}>
            {/* Category header */}
            <div className="flex items-center gap-2 mb-5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}
              >
                <Icon size={14} />
              </div>
              <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                {label}
              </h2>
              <div className="flex-1 h-px" style={{ background: 'var(--border-color)' }} />
              <span
                className="text-xs font-mono px-2 py-0.5 rounded"
                style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}
              >
                {skills.length} skills
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {skills.map((skill) => (
                <SkillCard key={skill.name} {...skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

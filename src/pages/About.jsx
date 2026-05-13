import { Shield, Code2, Search, Server, GraduationCap } from 'lucide-react'
import EducationCard from '../components/EducationCard'

// =============================================
// DATA
// =============================================
const TOOLS = [
  { name: 'Burp Suite',    icon: Shield, level: 'Advanced'     },
  { name: 'Metasploit',    icon: Shield, level: 'Intermediate' },
  { name: 'Nuclei',        icon: Code2,  level: 'Advanced'     },
  { name: 'SQLmap',        icon: Code2,  level: 'Advanced'     },
  { name: 'Nmap',          icon: Server, level: 'Advanced'     },
  { name: 'Shodan',        icon: Search, level: 'Intermediate' },
  { name: 'Amass',         icon: Search, level: 'Intermediate' },
  { name: 'Subfinder',     icon: Search, level: 'Intermediate' },
  { name: 'ffuf',          icon: Code2,  level: 'Advanced'     },
  { name: 'Wireshark',     icon: Server, level: 'Intermediate' },
]

const EDUCATION_DATA = [
  {
    id: 1,
    school: 'SMPIT PERMATA BUNDA ALAWIYAH',
    major: '-',
    degree: 'SMP',
    logo: 'https://files.catbox.moe/wf8kws.png',
    start_year: 2025,
    end_year: 2028,
    location: 'Bandar Lampung, Indonesia',
    link: 'http://smpitpbalawiyah.sch.id',
    GPA: null,
  },
]

// =============================================
// KOMPONEN ABOUT
// =============================================
export default function About() {
  return (
    <div className="py-8 stagger">

      {/* ===== HEADER ===== */}
      <div className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-extrabold mt-2 mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Tentang Saya
        </h1>
        <div className="w-12 h-0.5" style={{ background: 'var(--accent)' }} />
      </div>

      {/* ===== BIO ===== */}
      <div
        className="p-6 rounded-xl mb-8"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
      >
        <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          Saya adalah <span style={{ color: 'var(--accent)' }}>Ahmad Zaidan Qotrunnada</span>, 
          seorang Security Researcher dan Bug Hunter berpengalaman dari Indonesia. Dengan lebih dari 
          3 tahun pengalaman di dunia keamanan siber, saya telah membantu ratusan perusahaan 
          menemukan dan memperbaiki kerentanan kritis sebelum dieksploitasi oleh pihak jahat.
        </p>
        <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          Spesialisasi saya mencakup <span style={{ color: 'var(--accent)' }}>Web Application Security</span>, 
          {' '}<span style={{ color: 'var(--accent)' }}>API Security Testing</span>, 
          {' '}<span style={{ color: 'var(--accent)' }}>OSINT</span>, dan 
          {' '}<span style={{ color: 'var(--accent)' }}>Network Penetration Testing</span>. 
          Saya aktif berpartisipasi di platform bug bounty seperti HackerOne dan Bugcrowd, 
          serta rutin mengikuti CTF (Capture The Flag) competition.
        </p>
        <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Selain hunting bugs, saya juga mengembangkan tools keamanan open-source yang digunakan 
          oleh komunitas security researcher di seluruh dunia. Filosofi saya sederhana: 
          <span style={{ color: 'var(--accent)' }}> "Hack ethically, report responsibly, make the internet safer."</span>
        </p>
      </div>

      {/* ===== TOOLS ===== */}
      <div className="mb-10">
        <h2
          className="text-lg font-bold mb-4 flex items-center gap-2"
          style={{ color: 'var(--text-primary)' }}
        >
          <Code2 size={18} style={{ color: 'var(--accent)' }} />
          Tools yang Dikuasai
        </h2>
        <div className="flex flex-wrap gap-2">
          {TOOLS.map(({ name, icon: Icon, level }) => (
            <div
              key={name}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-all duration-200 cursor-default"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.color = 'var(--accent)'
                e.currentTarget.style.background = 'var(--accent-dim)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-color)'
                e.currentTarget.style.color = 'var(--text-secondary)'
                e.currentTarget.style.background = 'var(--bg-card)'
              }}
            >
              <Icon size={12} />
              {name}
              <span
                className="px-1.5 py-0.5 rounded text-[10px]"
                style={{
                  background: 'var(--accent-dim)',
                  color: 'var(--accent)',
                }}
              >
                {level}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== PENDIDIKAN ===== */}
      <div className="mb-10">
        <h2
          className="text-lg font-bold mb-4 flex items-center gap-2"
          style={{ color: 'var(--text-primary)' }}
        >
          <GraduationCap size={18} style={{ color: 'var(--accent)' }} />
          Pendidikan
        </h2>
        <div className="space-y-4">
          {EDUCATION_DATA.map((edu) => (
            <EducationCard
              key={edu.id}
              school={edu.school}
              major={edu.major}
              degree={edu.degree}
              logo={edu.logo}
              start_year={edu.start_year}
              end_year={edu.end_year}
              location={edu.location}
              link={edu.link}
              GPA={edu.GPA}
            />
          ))}
        </div>
      </div>

    </div>
  )
}

import { Building2 } from 'lucide-react'

export default function EducationCard({
  school,
  major,
  logo,
  degree,
  start_year,
  end_year,
  link,
  location,
  GPA,
}) {
  return (
    <div
      className="flex items-start gap-4 p-5 rounded-xl transition-all duration-300 hover:scale-[1.01]"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
      }}
    >
      {logo ? (
        <img
          width={60}
          height={60}
          src={logo}
          alt={school}
          className="w-[60px] h-[60px] object-contain rounded-lg"
        />
      ) : (
        <div
          className="w-[60px] h-[60px] rounded-lg flex items-center justify-center"
          style={{ background: 'var(--accent-dim)' }}
        >
          <Building2 size={32} style={{ color: 'var(--accent)' }} />
        </div>
      )}

      <div className="space-y-1.5 flex-1">
        <a
          href={link || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition"
        >
          <h6 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
            {school}
          </h6>
        </a>

        <div className="space-y-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <div className="flex flex-col gap-1 md:flex-row md:gap-2 md:items-center">
            <span>{degree}</span>
            <span className="hidden md:inline text-neutral-500">•</span>
            <span>{major}</span>
            {GPA && (
              <div className="flex gap-1">
                <span className="hidden md:inline text-neutral-500">•</span>
                <span>GPA: </span>
                <span className="font-semibold" style={{ color: 'var(--accent)' }}>
                  {GPA}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1 text-[12px] md:flex-row md:gap-2">
            <span className="opacity-60">
              {start_year} - {end_year}
            </span>
            <span className="hidden md:inline text-neutral-500">•</span>
            <span className="opacity-60">{location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

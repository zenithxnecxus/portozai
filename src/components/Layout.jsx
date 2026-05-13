import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Sidebar from './Sidebar.jsx'
import FloatingButtons from './FloatingButtons.jsx'

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-main)' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className="flex-1 min-h-screen"
        style={{
          marginLeft: '280px',
          background: 'var(--bg-main)',
        }}
      >
        {/* Responsive: di mobile, hilangkan marginLeft */}
        <style>{`
          @media (max-width: 767px) {
            main { margin-left: 0 !important; }
          }
        `}</style>

        {/* Grid background halus */}
        <div
          className="min-h-screen grid-bg"
          style={{ paddingTop: '2rem', paddingBottom: '4rem' }}
        >
          <div key={location.pathname} className="page-enter px-6 md:px-8 lg:px-12 max-w-5xl">
            <Outlet />
          </div>
        </div>
      </main>

      {/* FLOATING BUTTONS (Live Chat + AI) */}
      <FloatingButtons />
    </div>
  )
}

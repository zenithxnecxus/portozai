import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, MessageCircle } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import AIChatModal from './AIChatModal'

export default function FloatingButtons() {
  const [isAIOpen, setIsAIOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Jangan tampilkan di halaman livechat
  if (location.pathname === '/livechat') {
    return null
  }

  const openLiveChat = () => {
    navigate('/livechat')
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Live Chat Button */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={openLiveChat}
          className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--accent)', color: 'var(--accent)' }}
          title="Buka Live Chat"
        >
          <MessageCircle size={22} />
        </motion.button>

        {/* AI Assistant Button */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsAIOpen(true)}
          className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center"
          style={{ background: 'var(--accent)', color: '#000' }}
          title="Tanya AI Assistant"
        >
          <Bot size={22} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isAIOpen && <AIChatModal onClose={() => setIsAIOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

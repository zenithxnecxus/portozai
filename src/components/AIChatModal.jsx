import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, Loader2, Minimize2, Maximize2 } from 'lucide-react'
import { getAIResponse } from '../lib/gemini'

export default function AIChatModal({ onClose }) {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('ai_chat_history')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        return [{ role: 'ai', content: 'Halo! Saya asisten Zyne AI. Ada yang bisa saya bantu? 😊' }]
      }
    }
    return [{ role: 'ai', content: 'Halo! Saya asisten Zyne Ai. Ada yang bisa saya bantu? 😊' }]
  })
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('ai_chat_history', JSON.stringify(messages))
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const aiReply = await getAIResponse(input)
      setMessages(prev => [...prev, { role: 'ai', content: aiReply }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Maaf, AI sedang sibuk. Coba lagi nanti ya! 🤖' }])
    } finally {
      setIsLoading(false)
    }
  }

  const clearHistory = () => {
    if (confirm('Hapus semua riwayat chat?')) {
      setMessages([{ role: 'ai', content: 'Halo! Saya asisten Zyne Ai. Ada yang bisa saya bantu? 😊' }])
      localStorage.removeItem('ai_chat_history')
    }
  }

  return (
    <AnimatePresence>
      {!isMinimized ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            exit={{ y: 20 }}
            className="w-[90vw] max-w-md h-[500px] rounded-xl shadow-xl flex flex-col overflow-hidden"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-2">
                <Bot size={20} style={{ color: 'var(--accent)' }} />
                <h3 className="font-bold">AI Assistant</h3>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={clearHistory} 
                  className="text-xs opacity-50 hover:opacity-100 px-2 py-1 rounded"
                  title="Hapus riwayat"
                >
                  Clear
                </button>
                <button 
                  onClick={() => setIsMinimized(true)} 
                  className="p-1 rounded-full hover:bg-black/20"
                  title="Minimize"
                >
                  <Minimize2 size={16} />
                </button>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-black/20" title="Close">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] p-2.5 rounded-xl text-sm ${
                      msg.role === 'user' ? 'rounded-br-none' : 'rounded-bl-none'
                    }`}
                    style={{
                      background: msg.role === 'user' ? 'var(--accent-dim)' : 'var(--bg-main)',
                      border: '1px solid var(--border-color)',
                      color: msg.role === 'user' ? 'var(--accent)' : 'var(--text-primary)',
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'var(--bg-main)' }}>
                    <Loader2 size={14} className="animate-spin" style={{ color: 'var(--accent)' }} />
                    <span className="text-xs opacity-70">AI sedang mengetik...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 border-t flex gap-2" style={{ borderColor: 'var(--border-color)' }}>
              <input
                type="text"
                placeholder="Tanya soal keamanan siber, tools, atau Zaidan..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-lg transition-all disabled:opacity-50"
                style={{ background: 'var(--accent)', color: '#000' }}
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        </motion.div>
      ) : (
        // Minimized mode - floating bubble
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
          style={{ background: 'var(--accent)', color: '#000' }}
        >
          <Bot size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

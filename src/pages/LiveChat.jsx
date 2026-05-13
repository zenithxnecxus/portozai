import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, MessageSquare, Trash2, LogOut, Reply, Menu, X, Image, Edit2, Pin, PinOff } from 'lucide-react'
import { auth } from '../lib/firebase'
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth'
import { supabase } from '../lib/supabase'
import MediaUpload from '../components/MediaUpload'
import ReCAPTCHA from 'react-google-recaptcha'

export default function LiveChat() {
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [replyTo, setReplyTo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(false)
  const [mentionSuggestions, setMentionSuggestions] = useState([])
  const [showMention, setShowMention] = useState(false)
  const [cursorPosition, setCursorPosition] = useState(0)
  const [typingUsers, setTypingUsers] = useState([])
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [editingMsg, setEditingMsg] = useState(null)
  const [editText, setEditText] = useState('')
  const [showMediaUpload, setShowMediaUpload] = useState(false)
  const [captchaToken, setCaptchaToken] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const typingTimeoutRef = useRef(null)
  const navigate = useNavigate()

  // CEK LOGIN
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setUser(null)
      } else {
        setUser(currentUser)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // FETCH & SUBSCRIBE MESSAGES
  useEffect(() => {
    if (!user) return

    let subscription = null

    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: true })
      
      if (data) {
        const pinned = data.filter(m => m.is_pinned)
        const unpinned = data.filter(m => !m.is_pinned)
        setMessages([...pinned, ...unpinned])
        scrollToBottom()
      }
    }

    fetchMessages()

    subscription = supabase
      .channel('messages-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages(prev => {
          if (prev.some(msg => msg.id === payload.new.id)) return prev
          if (payload.new.is_pinned) return [payload.new, ...prev]
          return [...prev, payload.new]
        })
        scrollToBottom()
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'messages' }, (payload) => {
        setMessages(prev => prev.filter(m => m.id !== payload.old.id))
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'messages' }, (payload) => {
        setMessages(prev => prev.map(m => m.id === payload.new.id ? payload.new : m))
      })
      .subscribe()

    return () => subscription?.unsubscribe()
  }, [user])

  // TYPING INDICATOR
  useEffect(() => {
    if (!user) return

    const typingChannel = supabase.channel('typing')
      .on('broadcast', { event: 'typing' }, ({ payload }) => {
        if (payload.userId !== user.id) {
          setTypingUsers(prev => {
            const filtered = prev.filter(u => u.userId !== payload.userId)
            return [...filtered, { userId: payload.userId, name: payload.name }]
          })
          setTimeout(() => {
            setTypingUsers(prev => prev.filter(u => u.userId !== payload.userId))
          }, 2000)
        }
      })
      .subscribe()

    return () => typingChannel.unsubscribe()
  }, [user])

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const sendTyping = () => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    
    supabase.channel('typing').send({
      type: 'broadcast',
      event: 'typing',
      payload: { userId: user?.id, name: user?.displayName || user?.email?.split('@')[0] }
    })
    
    typingTimeoutRef.current = setTimeout(() => {}, 2000)
  }

  const handleGoogleLogin = async () => {
    if (!captchaToken) {
      alert('Harap verifikasi reCAPTCHA dulu!')
      return
    }

    setAuthLoading(true)
    const provider = new GoogleAuthProvider()
    
    try {
      // Verifikasi captcha ke backend (opsional)
      try {
        const verifyRes = await fetch('/api/verify-captcha', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: captchaToken })
        })
        const verifyData = await verifyRes.json()
        
        if (!verifyData.success) {
          console.log('reCAPTCHA verification skipped, continuing anyway')
        }
      } catch (err) {
        console.log('Backend verification not available, continuing')
      }
      
      await signInWithPopup(auth, provider)
    } catch (error) {
      alert('Login gagal: ' + error.message)
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    setUser(null)
    setMessages([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user || !message.trim()) return

    // Validasi input message (cegah XSS)
    const cleanMessage = message.trim().slice(0, 500)
    const dangerousPatterns = ['<script', '</script>', 'javascript:', 'onload=', 'onerror=']
    if (dangerousPatterns.some(p => cleanMessage.toLowerCase().includes(p))) {
      alert('Pesan mengandung karakter yang tidak diizinkan')
      return
    }

    const newMessage = {
      name: user.displayName || user.email?.split('@')[0],
      email: user.email,
      photo_url: user.photoURL || `https://ui-avatars.com/api/?name=${user.email?.charAt(0)}&background=ff0000&color=fff`,
      message: cleanMessage,
      reply_to: replyTo?.name || null,
    }

    const { error } = await supabase.from('messages').insert([newMessage])
    if (error) {
      alert('Gagal mengirim pesan: ' + error.message)
    } else {
      setMessage('')
      setReplyTo(null)
      setShowMention(false)
    }
  }

  const handleDelete = async (id, msgEmail) => {
    if (user?.email !== msgEmail && user?.email !== 'zaidan147248@gmail.com') {
      alert('Kamu tidak punya akses hapus pesan ini')
      return
    }
    await supabase.from('messages').delete().eq('id', id)
  }

  const editMessage = async (id, newText) => {
    if (!newText.trim()) return
    await supabase
      .from('messages')
      .update({ message: newText.trim(), is_edited: true, edited_at: new Date() })
      .eq('id', id)
    setEditingMsg(null)
    setEditText('')
  }

  const togglePin = async (msg) => {
    if (user?.email !== 'zaidan147248@gmail.com') {
      alert('Hanya admin yang bisa pin pesan')
      return
    }
    await supabase
      .from('messages')
      .update({ 
        is_pinned: !msg.is_pinned, 
        pinned_at: !msg.is_pinned ? new Date() : null 
      })
      .eq('id', msg.id)
  }

  // MENTION FUNCTIONS
  const handleMessageChange = (e) => {
    const value = e.target.value
    setMessage(value)
    
    const cursorPos = e.target.selectionStart
    setCursorPosition(cursorPos)
    
    const textBeforeCursor = value.slice(0, cursorPos)
    const lastAtIndex = textBeforeCursor.lastIndexOf('@')
    
    if (lastAtIndex !== -1 && cursorPos - lastAtIndex > 1) {
      const query = textBeforeCursor.slice(lastAtIndex + 1).toLowerCase()
      
      const uniqueUsers = [...new Map(messages.map(msg => [msg.email, {
        name: msg.name,
        email: msg.email
      }])).values()]
      
      const filtered = uniqueUsers.filter(u => 
        u.name.toLowerCase().includes(query) && u.email !== user?.email
      )
      
      setMentionSuggestions(filtered)
      setShowMention(filtered.length > 0)
    } else {
      setShowMention(false)
    }
  }

  const insertMention = (mentionedUser) => {
    const textBeforeCursor = message.slice(0, cursorPosition)
    const textAfterCursor = message.slice(cursorPosition)
    const lastAtIndex = textBeforeCursor.lastIndexOf('@')
    
    const newText = textBeforeCursor.slice(0, lastAtIndex) + `@${mentionedUser.name} ` + textAfterCursor
    setMessage(newText)
    setShowMention(false)
    inputRef.current?.focus()
  }

  const formatMessageWithMentions = (text) => {
    if (!text) return text
    const parts = text.split(/(@\w+)/g)
    return parts.map((part, index) => {
      if (part.startsWith('@')) {
        return (
          <span key={index} className="text-blue-400 font-semibold">
            {part}
          </span>
        )
      }
      return part
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent)' }} />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full p-6 rounded-2xl text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <h1 className="text-2xl font-bold mb-2">Live Chat</h1>
          <div className="w-12 h-0.5 mx-auto mb-4" style={{ background: 'var(--accent)' }} />
          <p className="text-sm opacity-70 mb-6">Chat real-time dengan Google Account</p>
          
          <div className="flex justify-center mb-4">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(token) => setCaptchaToken(token)}
            />
          </div>
          
          <button
            onClick={handleGoogleLogin}
            disabled={authLoading || !captchaToken}
            className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-lg font-medium transition-all disabled:opacity-50"
            style={{ background: 'var(--accent)', color: '#000' }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {authLoading ? 'Loading...' : 'Login dengan Google'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {/* HEADER */}
      <div className="sticky top-0 z-20 px-4 py-3 border-b flex justify-between items-center" 
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Live Chat</h1>
          <p className="text-xs opacity-60 truncate max-w-[200px]">{user?.email}</p>
        </div>
        
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="p-2 rounded-lg md:hidden"
          style={{ background: 'var(--accent-dim)' }}
        >
          {showMobileMenu ? <X size={18} /> : <Menu size={18} />}
        </button>
        
        <button
          onClick={handleLogout}
          className="hidden md:flex text-xs opacity-50 hover:opacity-100 items-center gap-1"
        >
          <LogOut size={12} /> Logout
        </button>
      </div>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <div className="fixed inset-0 bg-black/50 z-30" onClick={() => setShowMobileMenu(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-[57px] right-0 bottom-0 w-64 z-40 p-4 shadow-lg"
              style={{ background: 'var(--bg-card)', borderLeft: '1px solid var(--border-color)' }}
            >
              <div className="flex flex-col gap-4">
                <div className="text-center p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <img src={user?.photoURL} className="w-12 h-12 rounded-full mx-auto mb-2" alt="avatar" />
                  <p className="text-sm font-medium">{user?.displayName}</p>
                  <p className="text-xs opacity-60">{user?.email}</p>
                </div>
                <button
                  onClick={() => { handleLogout(); setShowMobileMenu(false) }}
                  className="flex items-center justify-center gap-2 py-2 rounded-lg text-red-500"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CHAT MESSAGES */}
      <div 
        className="flex-1 overflow-y-auto px-3 py-3"
        style={{ background: 'var(--bg-main)' }}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <MessageSquare size={48} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm opacity-60">Belum ada pesan</p>
            <p className="text-xs opacity-40 mt-1">Jadilah yang pertama!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isOwn = msg.email === user.email
            const isReply = msg.reply_to
            const isOwner = msg.email === 'zaidan147248@gmail.com'
            const isPinned = msg.is_pinned

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mb-3 flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[85%] ${isOwn ? 'flex-row-reverse' : ''}`}>
                  <img 
                    src={msg.photo_url} 
                    alt={msg.name} 
                    className="w-7 h-7 rounded-full flex-shrink-0 hidden sm:block" 
                  />
                  <div>
                    <div className={`flex items-center gap-1 mb-0.5 text-xs ${isOwn ? 'justify-end' : 'justify-start'}`}>
                      <span className="font-medium max-w-[120px] truncate">{msg.name}</span>
                      {isOwner && (
                        <span className="text-blue-500 text-[10px]">✓</span>
                      )}
                      {isPinned && (
                        <span className="text-yellow-500 text-[10px] flex items-center gap-0.5">
                          <Pin size={10} /> Pinned
                        </span>
                      )}
                      <span className="text-[9px] opacity-50">
                        {new Date(msg.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    
                    <div
                      className={`p-2.5 rounded-2xl ${isOwn ? 'rounded-br-md' : 'rounded-bl-md'} ${isPinned ? 'border-yellow-500/30' : ''}`}
                      style={{
                        background: isOwn ? 'var(--accent-dim)' : 'var(--bg-card)',
                        border: isPinned ? '1px solid rgba(234, 179, 8, 0.3)' : `1px solid var(--border-color)`,
                      }}
                    >
                      {isReply && (
                        <div className="text-[9px] mb-1 p-1 rounded opacity-60 bg-black/20">
                          <Reply size={8} className="inline mr-1" /> @{msg.reply_to}
                        </div>
                      )}
                      
                      {editingMsg?.id === msg.id ? (
                        <div className="flex gap-1 mt-1">
                          <input 
                            defaultValue={msg.message}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') editMessage(msg.id, e.target.value)
                              if (e.key === 'Escape') setEditingMsg(null)
                            }}
                            className="flex-1 px-2 py-1 text-sm rounded outline-none bg-black/20"
                            autoFocus
                          />
                          <button onClick={() => editMessage(msg.id, editText || msg.message)} className="text-green-500 text-xs">✓</button>
                          <button onClick={() => setEditingMsg(null)} className="text-red-500 text-xs">✕</button>
                        </div>
                      ) : (
                        <>
                          {/* MEDIA (FOTO/VIDEO) */}
                          {msg.media_url && (
                            msg.media_type === 'video' ? (
                              <video 
                                src={msg.media_url} 
                                className="max-w-full rounded mb-1 max-h-40 cursor-pointer" 
                                controls 
                                onClick={(e) => e.stopPropagation()} 
                              />
                            ) : (
                              <img 
                                src={msg.media_url} 
                                className="max-w-full rounded mb-1 max-h-40 cursor-pointer" 
                                onClick={() => window.open(msg.media_url)} 
                                alt="media" 
                              />
                            )
                          )}
                          <p className="text-sm break-words leading-relaxed">
                            {formatMessageWithMentions(msg.message)}
                          </p>
                          {msg.is_edited && (
                            <span className="text-[9px] opacity-50 ml-1">(diedit)</span>
                          )}
                        </>
                      )}
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-0.5">
                      <button onClick={() => setReplyTo(msg)} className="text-[9px] opacity-40 hover:opacity-100">
                        <Reply size={10} />
                      </button>
                      {user.email === msg.email && (
                        <button onClick={() => {
                          setEditingMsg(msg)
                          setEditText(msg.message)
                        }} className="text-[9px] opacity-40 hover:opacity-100">
                          <Edit2 size={10} />
                        </button>
                      )}
                      {(user.email === msg.email || user.email === 'zaidan147248@gmail.com') && (
                        <button onClick={() => handleDelete(msg.id, msg.email)} className="text-[9px] opacity-40 hover:opacity-100">
                          <Trash2 size={10} />
                        </button>
                      )}
                      {user.email === 'zaidan147248@gmail.com' && (
                        <button onClick={() => togglePin(msg)} className="text-[9px] opacity-40 hover:opacity-100">
                          {isPinned ? <PinOff size={10} /> : <Pin size={10} />}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* TYPING INDICATOR */}
      {typingUsers.length > 0 && (
        <div className="px-3 py-1 text-xs opacity-50">
          {typingUsers.slice(0, 2).map(u => u.name).join(', ')} 
          {typingUsers.length > 2 && ` +${typingUsers.length - 2} lain`} sedang mengetik...
        </div>
      )}

      {/* INPUT FORM */}
      <div className="sticky bottom-0 px-3 py-2 border-t" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        <form onSubmit={handleSubmit} className="relative">
          {replyTo && (
            <div className="mb-2 p-1.5 rounded-lg flex justify-between items-center text-xs" 
              style={{ background: 'var(--accent-dim)' }}>
              <span>Membalas: @{replyTo.name}</span>
              <button type="button" onClick={() => setReplyTo(null)} className="px-2">✕</button>
            </div>
          )}
          
          {showMention && mentionSuggestions.length > 0 && (
            <div className="absolute bottom-full mb-1 w-56 rounded-lg shadow-lg z-10 max-h-32 overflow-y-auto"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              {mentionSuggestions.map(suggestion => (
                <button
                  key={suggestion.email}
                  type="button"
                  onClick={() => insertMention(suggestion)}
                  className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  @{suggestion.name}
                </button>
              ))}
            </div>
          )}
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowMediaUpload(true)}
              className="p-2 rounded-full opacity-70 hover:opacity-100 transition"
            >
              <Image size={18} />
            </button>
            <input
              ref={inputRef}
              type="text"
              placeholder="Pesan... @ untuk mention"
              value={message}
              onChange={handleMessageChange}
              onKeyDown={sendTyping}
              className="flex-1 px-3 py-2 rounded-full text-sm outline-none"
              style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="p-2 rounded-full transition-all disabled:opacity-50 w-10 h-10 flex items-center justify-center"
              style={{ background: 'var(--accent)', color: '#000' }}
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>

      {/* MEDIA UPLOAD MODAL */}
      {showMediaUpload && (
        <MediaUpload 
          onMediaUploaded={async (url, mediaType) => {
            await supabase.from('messages').insert([{
              name: user.displayName || user.email?.split('@')[0],
              email: user.email,
              photo_url: user.photoURL || `https://ui-avatars.com/api/?name=${user.email?.charAt(0)}&background=ff0000&color=fff`,
              media_url: url,
              media_type: mediaType,
              reply_to: replyTo?.name || null,
            }])
            setShowMediaUpload(false)
            setReplyTo(null)
          }} 
          onClose={() => setShowMediaUpload(false)} 
        />
      )}
    </div>
  )
}

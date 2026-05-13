import { useState } from 'react'
import { Image, Video, X } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function MediaUpload({ onMediaUploaded, onClose }) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const [mediaType, setMediaType] = useState(null)

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    const isImage = selectedFile.type.startsWith('image/')
    const isVideo = selectedFile.type.startsWith('video/')

    if (!isImage && !isVideo) {
      alert('Hanya file gambar (jpg, png, gif) atau video (mp4, webm)')
      return
    }

    const maxSize = isVideo ? 10 * 1024 * 1024 : 2 * 1024 * 1024
    if (selectedFile.size > maxSize) {
      alert(`Ukuran maksimal ${isVideo ? '10MB' : '2MB'}`)
      return
    }

    setFile(selectedFile)
    setMediaType(isImage ? 'image' : 'video')
    setPreview(URL.createObjectURL(selectedFile))
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('chat-media')
      .upload(fileName, file)

    if (uploadError) {
      alert('Gagal upload: ' + uploadError.message)
      setUploading(false)
      return
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from('chat-media')
      .getPublicUrl(fileName)
    
    onMediaUploaded(publicUrl, mediaType)
    setUploading(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="rounded-xl p-4 w-96 max-w-[90vw]" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold">Upload Media</h3>
          <button onClick={onClose} className="opacity-70 hover:opacity-100">
            <X size={18} />
          </button>
        </div>
        
        {preview ? (
          <div className="mb-3">
            {mediaType === 'image' ? (
              <img src={preview} className="w-full max-h-48 object-cover rounded-lg" alt="Preview" />
            ) : (
              <video src={preview} className="w-full max-h-48 rounded-lg" controls />
            )}
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-lg cursor-pointer hover:opacity-80 transition">
            <div className="flex gap-4 mb-2">
              <div className="flex flex-col items-center">
                <Image size={32} className="opacity-50" />
                <span className="text-xs mt-1">Foto</span>
              </div>
              <div className="flex flex-col items-center">
                <Video size={32} className="opacity-50" />
                <span className="text-xs mt-1">Video</span>
              </div>
            </div>
            <span className="text-xs opacity-60">Klik untuk pilih file</span>
            <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileSelect} />
          </label>
        )}
        
        <div className="flex gap-2 mt-3">
          <button onClick={onClose} className="flex-1 py-2 rounded-lg text-sm opacity-70 hover:opacity-100 transition">
            Batal
          </button>
          {preview && (
            <button 
              onClick={handleUpload} 
              disabled={uploading} 
              className="flex-1 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
              style={{ background: 'var(--accent)', color: '#000' }}
            >
              {uploading ? 'Uploading...' : 'Kirim'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

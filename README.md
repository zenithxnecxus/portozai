
# Portfolio


```
## 📁 Struktur Folder
portfolio/
├── public/
│ └── favicon.svg
├── src/
│ ├── components/
│ │ ├── Sidebar.jsx
│ │ ├── Layout.jsx
│ │ ├── AIChatModal.jsx
│ │ └── MediaUpload.jsx
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── About.jsx
│ │ ├── Skills.jsx
│ │ ├── Certificates.jsx
│ │ ├── Contact.jsx
│ │ ├── LiveChat.jsx
│ │ └── CVETracker.jsx
│ ├── lib/
│ │ ├── firebase.js
│ │ └── supabase.js
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── vercel.json
└── .gitignore
```
## 🚀 Cara Menjalankan

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Buat file `.env.local` di root project dan isi dengan:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
VITE_WEB3FORMS_ACCESS_KEY=your-web3forms-key
VITE_DEEPSEEK_API_KEY=your-deepseek-api-key
```

### 3. Jalankan Development Server
```bash
npm run dev
```
Buka browser di `http://localhost:5173`

### 4. Build untuk Production
```bash
npm run build
```

---

## 🔥 Cara Mendapatkan API Keys

### Firebase Config
1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project Anda (atau buat baru)
3. Klik **Project Settings** (icon gear) → **General** → **Your apps**
4. Jika belum ada app, klik **Add app** → pilih **Web** (</>)
5. Copy konfigurasi dari bagian **SDK setup and configuration**

```js
// Contoh config yang akan Anda dapatkan
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "xxxxx.firebaseapp.com",
  projectId: "xxxxx",
  storageBucket: "xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxx"
};
```

### Supabase Config
1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Klik **Project Settings** → **API**
4. Copy **Project URL** dan **anon public key**

### reCAPTCHA Site Key
1. Buka [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Buat site dengan type **v2** → **"I'm not a robot" checkbox**
3. Copy **Site key**

### Web3Forms Access Key
1. Buka [Web3Forms](https://web3forms.com/)
2. Daftar gratis (pake email)
3. Copy **Access Key** dari dashboard

---

## 🌐 Deployment & Environment Variables

### 📦 Daftar Lengkap Environment Variables yang Dibutuhkan

| Variable | Platform Sumber | Wajib |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Supabase | ✅ |
| `VITE_SUPABASE_ANON_KEY` | Supabase | ✅ |
| `VITE_FIREBASE_API_KEY` | Firebase | ✅ |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase | ✅ |
| `VITE_FIREBASE_PROJECT_ID` | Firebase | ✅ |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase | ✅ |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase | ✅ |
| `VITE_FIREBASE_APP_ID` | Firebase | ✅ |
| `VITE_RECAPTCHA_SITE_KEY` | Google reCAPTCHA | ⚠️ Opsional |
| `VITE_WEB3FORMS_ACCESS_KEY` | Web3Forms | ⚠️ Opsional |

---

## 🟢 Vercel – Menambahkan Environment Variables

1. Masuk ke **Vercel Dashboard** → pilih project Anda
2. Klik tab **Settings** → pilih **Environment Variables** di menu kiri
3. Klik **"Add Environment Variable"**
4. Isi kolom:

| Name | Value (contoh) |
| :--- | :--- |
| `VITE_SUPABASE_URL` | `https://xxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIs...` |
| `VITE_FIREBASE_API_KEY` | `AIzaSyD_xxxxxxxxxx` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `xxxxx.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `xxxxx` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `xxxxx.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `123456789` |
| `VITE_FIREBASE_APP_ID` | `1:123456789:web:xxxxx` |
| `VITE_RECAPTCHA_SITE_KEY` | `6LeIxAcTAAAAAJcZVRqy...` |
| `VITE_WEB3FORMS_ACCESS_KEY` | `c3a5ac59-ced9-4f2d-bbd2-51f83ef0e818` |
| `VITE_DEEPSEEK_API_KEY` | `zkyahskasad` |


5. **Pilih Environments**: ✅ Production + ✅ Preview
6. Klik **Save**
7. **Redeploy** project (Vercel akan otomatis rebuild, tapi lebih aman klik Redeploy di tab Deployments)

---

## ⚡ Netlify – Menambahkan Environment Variables

1. Login ke **Netlify Dashboard** → pilih site project Anda
2. Klik **Site configuration** (atau **Site settings**) → pilih **Environment variables**
3. Klik **"Add a variable"** → **"Add a single variable"**
4. Isi kolom (sama seperti di Vercel)
5. Ulangi untuk semua variable
6. **Save**
7. **Trigger redeploy**: tab **Deploys** → **"Trigger deploy"** → **"Deploy site"**

> ⚠️ **Catatan Penting**: Semua variabel yang diawali `VITE_` akan otomatis tersedia di build time (karena Vite membaca `import.meta.env.VITE_...`). Setelah tambah variable, WAJIB redeploy agar kebaca.

---

## 🎨 Mengganti Tema Warna

Tema warna bisa diganti langsung dari **sidebar** di bagian bawah — klik tombol warna yang tersedia.

Pilihan tema yang tersedia:
- 🔴 **Merah** (`#ff3333`) — default
- 🟡 **Kuning** (`#f5c518`) — warm golden
- 🔵 **Biru** (`#3b82f6`) — cool blue
- 🩵 **Cyan** (`#06b6d4`) — neon cyan
- 🟣 **Violet** (`#8b5cf6`) — purple vibe
- 🟢 **Emerald** (`#10b981`) — fresh green
- 🟠 **Amber** (`#f59e0b`) — orange glow
- 🩷 **Rose** (`#f43f5e`) — pink accent

Tema tersimpan otomatis di `localStorage` sehingga tidak reset saat refresh.

---

## 🌐 Deploy ke Vercel

### Cara 1: Via GitHub (Recommended)
1. Push folder ini ke GitHub
2. Buka [vercel.com](https://vercel.com)
3. Klik "New Project" → Import dari GitHub
4. Framework: **Vite**
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Environment Variables: Tambahkan semua variable di atas
8. Klik **Deploy**

### Cara 2: Via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## 🚀 Deploy ke Netlify

1. Push folder ke GitHub
2. Buka [netlify.com](https://netlify.com)
3. Klik **"Add new site"** → **"Import an existing project"**
4. Pilih GitHub → pilih repo
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Klik **"Show advanced"** → **"New variable"** → tambahkan semua environment variables
7. Klik **"Deploy site"**

---

## ✏️ Kustomisasi Data

Semua data bisa diganti di masing-masing file halaman:

| File | Yang bisa diubah |
| :--- | :--- |
| `src/components/Sidebar.jsx` | Nama, role, bio, sosmed links, foto profil |
| `src/pages/Home.jsx` | Statistik, hero text, deskripsi |
| `src/pages/About.jsx` | Bio paragraf, tools, timeline pengalaman |
| `src/pages/Skills.jsx` | List skill + level + persentase |
| `src/pages/Certificates.jsx` | Data sertifikat (nama, penerbit, tahun, link) |
| `src/pages/Contact.jsx` | Email, sosmed links |
| `src/pages/LiveChat.jsx` | (Dinamis, tidak perlu diubah) |


---

## 📦 Tech Stack

- **React 18** + Vite
- **Tailwind CSS** v3
- **React Router DOM** v6
- **Lucide React** (icons)
- **Framer Motion** (animations)
- **Google Fonts**: Syne + JetBrains Mono
- **Supabase** (Database + Realtime)
- **Firebase** (Authentication + Storage)
- **Web3Forms** (Contact form backend)
- **Google reCAPTCHA** (Bot protection)

---

## 📝 License

MIT © 2026 Ahmad Zaidan Qotrunnada

---

Made with ❤️ by Ahmad Zaidan Qotrunnada
```


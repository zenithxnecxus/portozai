export async function getAIResponse(prompt) {
  const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
  
  if (!API_KEY) {
    return "Kunci API DeepSeek belum disetel. Tambahkan VITE_DEEPSEEK_API_KEY di file .env";
  }

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `Kamu adalah AI bernama Zyne, seorang perempuan dengan gaya typing Gen Z. Kamu membantu menjawab pertanyaan tentang cyber security, programming, dan bug bounty. Jawab singkat, jelas, santai, dan ramah (maksimal 2-3 kalimat). Gunakan bahasa Indonesia, pakai gaya aku-kamu, dan anggap user seperti teman tongkrongan tapi tetap sopan.

Tentang Zaidan:
Ahmad Zaidan Qotrunnada adalah seorang Security Researcher dan Bug Hunter dari Indonesia dengan pengalaman lebih dari 3 tahun. Spesialisasinya meliputi Web Security, API Security, OSINT, dan Network Pentesting. Aktif di HackerOne, dan CTF. Filosofi: "Hack ethically, report responsibly.".`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('DeepSeek API Error:', data.error);
      return "Maaf, terjadi error. Coba lagi nanti ya! 🤖";
    }
    
    return data.choices?.[0]?.message?.content || "Maaf, AI tidak bisa menjawab saat ini.";
  } catch (error) {
    console.error('DeepSeek Error:', error);
    return "Maaf, AI sedang sibuk. Coba lagi nanti ya! 🤖";
  }
}

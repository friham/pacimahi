import { useState, useEffect } from 'react';
import { FaComments, FaTimes, FaPaperPlane, FaWhatsapp, FaRobot, FaUser } from 'react-icons/fa';
import './VirtualAssistant.css';

const quickFaqs = [
  {
    q: 'Syarat Cerai Gugat (Istri)?',
    a: 'Syarat utama: 1) KTP Penggugat (asli & fotokopi bermeterai Rp 10.000 dilegalisir pos), 2) Buku Nikah Asli & Duplikat, 3) Surat Gugatan (bisa dibuat di Posbakum gratis), 4) Membayar panjar perkara.'
  },
  {
    q: 'Jam Buka Pelayanan PTSP?',
    a: 'Jam Pelayanan Terpadu Satu Pintu (PTSP) PA Cimahi:\nSenin - Kamis: 08.00 - 16.30 WIB\nJumat: 07.30 - 16.30 WIB\nIstirahat: 12.00 - 13.00 WIB (Jumat: 11.30 - 13.00 WIB).'
  },
  {
    q: 'Cara Pengambilan Akta Cerai?',
    a: 'Syarat pengambilan Akta Cerai:\n1) Perkara sudah BHT (Berkekuatan Hukum Tetap),\n2) Membawa KTP Asli pihak bersangkutan,\n3) Membayar PNBP Akta Cerai Rp 10.000,- di loket kasir.'
  },
  {
    q: 'Apakah bisa berperkara Gratis (Prodeo)?',
    a: 'Bisa! Bagi masyarakat tidak mampu, lampirkan SKTM dari Desa/Kelurahan atau kartu bansos (KIS/KIP/KKS) untuk dibebaskan dari seluruh biaya perkara.'
  }
];

function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Halo! Saya SAPA (Sahabat Pengadilan Agama Cimahi). Ada yang bisa saya bantu terkait informasi layanan, prosedur persidangan, atau syarat perkara hari ini?'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    // Add user message
    const newMsgs = [...messages, { sender: 'user', text: query }];
    setMessages(newMsgs);
    if (!textToSend) setInput('');

    // Generate smart bot response
    setTimeout(() => {
      let reply = 'Terima kasih atas pertanyaannya. Untuk informasi lebih spesifik mengenai nomor perkara atau verifikasi berkas, Anda juga dapat menghubungi layanan Helpdesk WhatsApp PTSP kami atau datang langsung ke kantor PA Cimahi.';

      const lower = query.toLowerCase();
      if (lower.includes('syarat') || lower.includes('cerai') || lower.includes('gugat') || lower.includes('talak')) {
        reply = 'Dokumen persyaratan umum:\n1. KTP Penggugat/Pemohon\n2. Buku Nikah Asli + Fotokopi bermeterai Rp 10.000\n3. Surat Gugatan/Permohonan (dapat dibantu Posbakum gratis)\n4. Membayar panjar perkara via e-Court atau Bank BRI/BSI.';
      } else if (lower.includes('jam') || lower.includes('buka') || lower.includes('operasional') || lower.includes('jadwal')) {
        reply = 'Pelayanan PTSP PA Cimahi buka hari Senin - Kamis pukul 08.00 - 16.30 WIB, dan Jumat pukul 07.30 - 16.30 WIB. Layanan pendaftaran mandiri via e-Court buka 24 jam nonstop.';
      } else if (lower.includes('biaya') || lower.includes('panjar') || lower.includes('bayar') || lower.includes('gratis') || lower.includes('prodeo')) {
        reply = 'Biaya panjar perkara bervariasi sesuai radius domisili para pihak (mulai dari ~Rp 350.000 via e-Court). Bagi yang memiliki SKTM/KIS, dapat mengajukan perkara PRODEO (Biaya Rp 0).';
      } else if (lower.includes('akta')) {
        reply = 'Akta cerai dapat diambil setelah putusan berkekuatan hukum tetap (BHT). Wajib membawa KTP asli dan membayar PNBP Rp 10.000 di loket kasir PA Cimahi.';
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 500);
  };

  // Hide accessibility button when chatbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('va-open');
    } else {
      document.body.classList.remove('va-open');
    }
    return () => document.body.classList.remove('va-open');
  }, [isOpen]);

  return (
    <div className="virtual-assistant">
      {!isOpen && (
        <button
          className="va-floating-btn animate-fade-in-up"
          onClick={() => setIsOpen(true)}
          title="Tanya Asisten SAPA PA Cimahi"
        >
          <FaComments className="va-btn-icon" />
          <span className="va-btn-text">Tanya SAPA</span>
          <span className="va-btn-pulse"></span>
        </button>
      )}

      {isOpen && (
        <div className="va-chatbox animate-fade-in-up">
          {/* Header */}
          <div className="va-chatbox__header">
            <div className="va-header-info">
              <div className="va-avatar">🤖</div>
              <div>
                <h4 className="va-title">SAPA - Asisten Virtual</h4>
                <p className="va-status"><span className="status-dot"></span> Online • Siap Melayani</p>
              </div>
            </div>
            <button className="va-close-btn" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* Messages Body */}
          <div className="va-chatbox__body">
            {messages.map((m, idx) => (
              <div key={idx} className={`va-msg va-msg--${m.sender}`}>
                <div className="va-msg__icon">
                  {m.sender === 'bot' ? <FaRobot /> : <FaUser />}
                </div>
                <div className="va-msg__bubble">
                  {m.text}
                </div>
              </div>
            ))}

            {/* Quick FAQ Prompts */}
            <div className="va-faqs">
              <span className="va-faqs__label">Pilihan Topik Cepat:</span>
              <div className="va-faqs__list">
                {quickFaqs.map((faq, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="va-faq-pill"
                    onClick={() => {
                      setMessages(prev => [
                        ...prev,
                        { sender: 'user', text: faq.q },
                        { sender: 'bot', text: faq.a }
                      ]);
                    }}
                  >
                    {faq.q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input Footer */}
          <div className="va-chatbox__footer">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="va-input-form"
            >
              <input
                type="text"
                className="va-input"
                placeholder="Ketik pertanyaan Anda di sini..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="va-send-btn" title="Kirim">
                <FaPaperPlane />
              </button>
            </form>

            <div className="va-whatsapp-link">
              <span>Butuh bantuan petugas langsung?</span>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Admin%20PTSP%20PA%20Cimahi,%20saya%20ingin%20bertanya%20informasi%20layanan"
                target="_blank"
                rel="noreferrer"
                className="va-wa-btn"
              >
                <FaWhatsapp /> Chat WhatsApp PTSP
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VirtualAssistant;
